import { useState, useEffect, useContext, useRef } from 'react';
import type { EditRecipeById, UpdateRecipeInput } from 'types/graphql';

import { Form, FormError, FieldError, Label, TextField, Submit, NumberField, TextAreaField } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';
import { useMutation, useQuery } from '@redwoodjs/web';

import { Editor } from 'src/components/Editor';
import { FileStackContext } from 'src/contexts/FileStackContext';
import { MDXEditorMethods } from '@mdxeditor/editor';

const SEARCH_INGREDIENTS_QUERY = gql`
  query SearchIngredients($query: String!) {
    searchIngredients(query: $query) {
      id
      name
      standardUnit
      category
    }
  }
`;

const CREATE_RECIPE_INGREDIENT_MUTATION = gql`
  mutation CreateRecipeIngredientMutation($input: CreateRecipeIngredientInput!) {
    createRecipeIngredient(input: $input) {
      id
      amount
      unit
      Ingredient {
        id
        name
        standardUnit
      }
    }
  }
`;

const DELETE_RECIPE_INGREDIENT_MUTATION = gql`
  mutation DeleteRecipeIngredientMutation($id: Int!) {
    deleteRecipeIngredient(id: $id) {
      id
    }
  }
`;

type FormRecipe = NonNullable<EditRecipeById['recipe']>;

interface RecipeFormProps {
  recipe?: EditRecipeById['recipe'];
  onSave: (data: UpdateRecipeInput, id?: FormRecipe['id'], ingredients?: RecipeIngredient[]) => void;
  error: RWGqlError;
  loading: boolean;
}

interface RecipeIngredient {
  id?: number;
  amount: number;
  unit: string;
  ingredient: {
    id: number;
    name: string;
    standardUnit: string;
  };
}

const RecipeForm = (props: RecipeFormProps) => {
  const [description, setDescription] = useState(props.recipe?.description || '');
  const [preparationSteps, setPreparationSteps] = useState(props.recipe?.preparationSteps || '');
  const [tags, setTags] = useState<string[]>(props.recipe?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [images, setImages] = useState<string[]>(props.recipe?.imageUrls || []);
  const [imageHandles, setImageHandles] = useState<string[]>(props.recipe?.imageHandles || []);
  const [thumbnailUrl, setThumbnailUrl] = useState(props.recipe?.thumbnailUrl || '');
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<any>(null);
  const [ingredientAmount, setIngredientAmount] = useState<number>(1);
  const [ingredientUnit, setIngredientUnit] = useState<string>('');
  const descriptionEditorRef = useRef<MDXEditorMethods>(null);
  const preparationStepsEditorRef = useRef<MDXEditorMethods>(null);

  const { fileStackClient } = useContext(FileStackContext);

  const { data: searchResults } = useQuery(SEARCH_INGREDIENTS_QUERY, {
    variables: { query: ingredientSearch },
    skip: ingredientSearch.length < 2,
  });

  const [createRecipeIngredient] = useMutation(CREATE_RECIPE_INGREDIENT_MUTATION);
  const [deleteRecipeIngredient] = useMutation(DELETE_RECIPE_INGREDIENT_MUTATION);

  useEffect(() => {
    if (props.recipe?.RecipeIngredient) {
      setIngredients(
        props.recipe.RecipeIngredient.map((ri) => ({
          id: ri.id,
          amount: ri.amount,
          unit: ri.unit,
          ingredient: {
            id: ri.Ingredient.id,
            name: ri.Ingredient.name,
            standardUnit: ri.Ingredient.standardUnit,
          },
        }))
      );
    }
  }, [props.recipe]);

  const handleImageUpload = () => {
    if (images.length >= 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    fileStackClient.open({
      accept: ['image/*'],
      maxFiles: 5 - images.length,
      onUploadDone: (result) => {
        const newImages = result.filesUploaded.map((file) => file.url);
        const newHandles = result.filesUploaded.map((file) => file.handle);

        setImages((prev) => [...prev, ...newImages]);
        setImageHandles((prev) => [...prev, ...newHandles]);

        if (!thumbnailUrl && newImages.length > 0) {
          setThumbnailUrl(newImages[0]);
        }
      },
    });
  };

  const removeImage = (index: number) => {
    const imageToRemove = images[index];
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageHandles((prev) => prev.filter((_, i) => i !== index));

    if (thumbnailUrl === imageToRemove) {
      setThumbnailUrl(images.length > 1 ? images[0] : '');
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const selectIngredient = (ingredient: any) => {
    setSelectedIngredient(ingredient);
    setIngredientUnit(ingredient.standardUnit);
    setIngredientSearch(ingredient.name);
  };

  const addIngredient = () => {
    if (selectedIngredient && ingredientAmount > 0) {
      const newIngredient: RecipeIngredient = {
        amount: ingredientAmount,
        unit: ingredientUnit,
        ingredient: {
          id: selectedIngredient.id,
          name: selectedIngredient.name,
          standardUnit: selectedIngredient.standardUnit,
        },
      };

      setIngredients((prev) => [...prev, newIngredient]);
      setSelectedIngredient(null);
      setIngredientSearch('');
      setIngredientAmount(1);
      setIngredientUnit('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormRecipe) => {
    const formData: UpdateRecipeInput = {
      name: data.name,
      tags: tags,
      thumbnailUrl: thumbnailUrl,
      imageUrls: images,
      imageHandles: imageHandles,
      description: descriptionEditorRef.current?.getMarkdown() || '',
      preparationSteps: preparationStepsEditorRef.current?.getMarkdown() || '',
    };

    props.onSave(formData, props?.recipe?.id, ingredients);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormRecipe> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        {/* Recipe Name */}
        <Label name="name" className="rw-label" errorClassName="rw-label rw-label-error">
          Recipe Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.recipe?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true, maxLength: 150 }}
        />
        <FieldError name="name" className="rw-field-error" />

        {/* Description */}
        <Label name="description" className="rw-label">
          Description
        </Label>
        <div className="mb-4">
          <Editor content={description} editorRef={descriptionEditorRef} />
        </div>

        {/* Tags */}
        <Label name="tags" className="rw-label">
          Tags
        </Label>
        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <TextField
              name="tagInput"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="rw-input flex-1"
              placeholder="Add a tag..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <button type="button" onClick={addTag} className="rw-button rw-button-small rw-button-blue">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-blue-600 hover:text-blue-800">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <Label name="images" className="rw-label">
          Images
        </Label>
        <div className="mb-4">
          <button
            type="button"
            onClick={handleImageUpload}
            className="rw-button rw-button-small rw-button-blue mb-2"
            disabled={images.length >= 5}
          >
            Upload Images ({images.length}/5)
          </button>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Recipe image ${index + 1}`} className="w-full h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  ×
                </button>
                <button
                  type="button"
                  onClick={() => setThumbnailUrl(image)}
                  className={`absolute bottom-1 left-1 text-xs px-2 py-1 rounded ${
                    thumbnailUrl === image ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {thumbnailUrl === image ? 'Thumbnail' : 'Set as thumbnail'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <Label name="ingredients" className="rw-label">
          Ingredients
        </Label>
        <div className="mb-4">
          <div className="grid grid-cols-12 gap-2 mb-2">
            <div className="col-span-5">
              <TextField
                name="ingredientSearch"
                value={ingredientSearch}
                onChange={(e) => setIngredientSearch(e.target.value)}
                className="rw-input"
                placeholder="Search ingredients..."
              />
              {searchResults?.searchIngredients.length > 0 && ingredientSearch.length > 1 && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
                  {searchResults.searchIngredients.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectIngredient(ingredient)}
                    >
                      {ingredient.name} ({ingredient.standardUnit})
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-span-2">
              <NumberField
                name="ingredientAmount"
                value={ingredientAmount}
                onChange={(e) => setIngredientAmount(parseFloat(e.target.value) || 0)}
                className="rw-input"
                placeholder="Amount"
                min="0"
                step="any"
              />
            </div>
            <div className="col-span-3">
              <TextField
                name="ingredientUnit"
                value={ingredientUnit}
                onChange={(e) => setIngredientUnit(e.target.value)}
                className="rw-input"
                placeholder="Unit"
              />
            </div>
            <div className="col-span-2">
              <button
                type="button"
                onClick={addIngredient}
                className="rw-button rw-button-small rw-button-blue w-full"
                disabled={!selectedIngredient || ingredientAmount <= 0}
              >
                Add
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span>
                  {ingredient.amount} {ingredient.unit} {ingredient.ingredient.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Steps */}
        <Label name="preparationSteps" className="rw-label">
          Preparation Steps
        </Label>
        <div className="mb-4">
          <Editor content={preparationSteps} editorRef={preparationStepsEditorRef} />
        </div>

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save Recipe
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default RecipeForm;

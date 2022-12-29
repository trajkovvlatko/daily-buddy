import { Form, FormError, FieldError, Label, TextField, Submit, SelectField } from '@redwoodjs/forms';
import type { EditItemById, UpdateItemInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';
import { useQuery } from '@redwoodjs/web';
import type { FindIdAndColor, FindIdAndItemType } from 'types/graphql';

type FormItem = NonNullable<EditItemById['item']>;

interface ItemFormProps {
  item?: EditItemById['item'];
  onSave: (data: UpdateItemInput, id?: FormItem['id']) => void;
  error: RWGqlError;
  loading: boolean;
  drawerId?: number;
}

const FindIdAndColorQuery = gql`
  query FindIdAndColor {
    colors {
      id
      color
    }
  }
`;

const FindIdAndItemTypeQuery = gql`
  query FindIdAndItemType {
    itemTypes {
      id
      itemType
    }
  }
`;

const ItemForm = (props: ItemFormProps) => {
  const {
    data: colorsData,
    loading: colorsLoading,
    error: colorsError,
  } = useQuery<FindIdAndColor>(FindIdAndColorQuery);

  const {
    data: itemTypesData,
    loading: itemTypesLoading,
    error: itemTypesError,
  } = useQuery<FindIdAndItemType>(FindIdAndItemTypeQuery);

  if (colorsError || colorsLoading) return null;
  if (itemTypesError || itemTypesLoading) return null;

  const onSubmit = (data: FormItem) => {
    const newRecord = {
      ...data,
      drawerId: props.drawerId,
      colorId: parseInt(data.colorId.toString()),
      itemTypeId: parseInt(data.itemTypeId.toString()),
    };
    props.onSave(newRecord, props?.item?.id);
  };

  return (
    <div>
      <Form<FormItem> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label name="name" className="rw-label" errorClassName="rw-label rw-label-error">
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.item?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label name="colorId" className="rw-label" errorClassName="rw-label rw-label-error">
          Color
        </Label>

        <SelectField name="colorId">
          {colorsData.colors.map((color) => {
            return (
              <option key={color.id} value={color.id}>
                {color.color}
              </option>
            );
          })}
        </SelectField>

        <Label name="itemTypeId" className="rw-label" errorClassName="rw-label rw-label-error">
          Item type
        </Label>

        <SelectField name="itemTypeId">
          {itemTypesData.itemTypes.map((itemType) => {
            return (
              <option key={itemType.id} value={itemType.id}>
                {itemType.itemType}
              </option>
            );
          })}
        </SelectField>

        <FieldError name="itemTypeId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="blue-button">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default ItemForm;

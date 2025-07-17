import { useState } from 'react';
import type { FindRecipes } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

export const QUERY = gql`
  query FindRecipes {
    recipes {
      id
      name
      description
      tags
      thumbnailUrl
      imageUrls
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      <h2 className="rw-heading rw-heading-secondary">No recipes yet</h2>
      <Link to={routes.newRecipe()} className="rw-button rw-button-blue">
        Create your first recipe
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ recipes }: CellSuccessProps<FindRecipes>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Get all unique tags
  const allTags = recipes.reduce((tags, recipe) => {
    recipe.tags?.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  }, [] as string[]);

  // Filter recipes based on search term and selected tag
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || recipe.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Recipes ({filteredRecipes.length})</h2>
        <Link to={routes.newRecipe()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Recipe
        </Link>
      </header>

      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rw-input w-full"
          />
        </div>
        <div className="sm:w-48">
          <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} className="rw-input w-full">
            <option value="">All tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Recipe Image */}
            <div className="h-48 bg-gray-200 relative">
              {recipe.thumbnailUrl ? (
                <img src={recipe.thumbnailUrl} alt={recipe.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Recipe Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                <Link
                  to={routes.recipe({ id: recipe.id })}
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {recipe.name}
                </Link>
              </h3>

              {recipe.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {recipe.description.replace(/<[^>]*>/g, '').substring(0, 100)}...
                </p>
              )}

              {/* Tags */}
              {recipe.tags && recipe.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {recipe.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                  {recipe.tags.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      +{recipe.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500">{new Date(recipe.createdAt).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  <Link to={routes.recipe({ id: recipe.id })} className="text-blue-600 hover:text-blue-800 text-sm">
                    View
                  </Link>
                  <Link
                    to={routes.editRecipe({ id: recipe.id })}
                    className="text-green-600 hover:text-green-800 text-sm"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecipes.length === 0 && (searchTerm || selectedTag) && (
        <div className="text-center py-12">
          <p className="text-gray-500">No recipes found matching your search criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedTag('');
            }}
            className="rw-button rw-button-blue mt-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

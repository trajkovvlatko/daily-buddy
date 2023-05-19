module.exports = {
  extends: ['@redwoodjs/eslint-config'],
  rules: {
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  root: true,
};

module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  root: true,
  extends: '@react-native',
  rules: {
    'no-shadow': 0,
    'object-curly-spacing': ['error', 'always'],
    semi: ['error', 'always'],
    quotes: [2, 'single', { avoidEscape: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'space-in-parens': ['error', 'never'],
    'no-tabs': 0,
    'react/react-in-jsx-scope': 'off',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          object: true,
        },
      },
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never', propElementValues: 'always' },
    ],
  },
};

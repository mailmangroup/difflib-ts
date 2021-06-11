// .eslintrc.js
module.exports = {
	'root': true,
	'parser': '@typescript-eslint/parser',
	'plugins': [
    '@typescript-eslint'
  ],
	'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
	'env': {
		'browser': true,
		'es6': true,
		'node': true
	},
	'rules': {
		// allow async-await
		'generator-star-spacing': 'off',
		'prefer-const': 'error',
		'no-var': 'error',
		'semi': 'error',
		'comma-dangle': [ 'error', 'never' ],
		// allow paren-less arrow functions
		'arrow-parens': 0,
		'one-var': 0,

		// 'space-in-parens': [ 'error', 'always' ],
		// 'array-bracket-spacing': [ 'error', 'always' ],
		'object-curly-spacing': [ 'error', 'always' ],
		'no-trailing-spaces': [ 'error', { "ignoreComments": true } ],

		'import/first': 0,
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'import/no-extraneous-dependencies': 0,

		'@typescript-eslint/explicit-module-boundary-types': 0
	}
};
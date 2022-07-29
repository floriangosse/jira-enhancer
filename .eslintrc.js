module.exports = {
	root: true,

	env: {
		node: true
	},

	extends: ['eslint-config-floriangosse', 'plugin:prettier/recommended', 'prettier'],

	overrides: [
		{
			files: ['src/**/*.js'],
			env: {
				browser: true,
				es6: true
			}
		}
	]
};

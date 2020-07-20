module.exports = {
  "parser": "babel-eslint",
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true,
    "browser": false
  },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": false
    },
    "sourceType": "module"
  },
  "ignorePatterns": [
    "/.cache/**",
    "/build/**",
    "/node_modules/**",
    "/.tmp/**",
  ],
  "globals": {
    "strapi": true
  },
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", "unix"],
    "no-console": 0,
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}

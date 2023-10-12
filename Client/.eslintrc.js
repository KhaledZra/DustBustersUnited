module.exports = {
  env: {
    browser: true,
    es2021: true,
    "react-native/react-native": true,
  },
  extends: ["universe/native", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    jsx: true,
  },
  plugins: ["@typescript-eslint", "react", "react-native"],
  rules: {
    "react/prop-types": "off",
    quotes: ["warn", "double"],
    "react/react-in-jsx-scope": "off",
    semi: ["warn", "always"],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};

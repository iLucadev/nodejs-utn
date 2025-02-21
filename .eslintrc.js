module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "prettier", // Si decides usar prettier
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Posibles errores
    "no-console": "warn",
    "no-debugger": "warn",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-extra-semi": "error",
    "no-func-assign": "error",
    "no-irregular-whitespace": "error",
    "no-unreachable": "error",

    // Mejores prácticas
    curly: ["error", "multi-line"],
    "default-case": "error",
    eqeqeq: ["error", "always"],
    "no-empty-function": "error",
    "no-eval": "error",
    "no-multi-spaces": "error",
    "no-return-await": "error",
    "no-useless-catch": "error",
    "no-useless-return": "error",

    // Variables
    "no-use-before-define": ["error", { functions: false }],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

    // Estilo
    "array-bracket-spacing": ["error", "never"],
    "block-spacing": "error",
    "brace-style": ["error", "1tbs"],
    camelcase: "error",
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", { before: false, after: true }],
    "comma-style": ["error", "last"],
    indent: ["error", 2],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "keyword-spacing": ["error", { before: true, after: true }],
    "max-len": ["error", { code: 100 }],
    "no-mixed-spaces-and-tabs": "error",
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "space-before-blocks": "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",

    // ES6+
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-var": "error",
    "prefer-const": "error",
    "prefer-template": "error",
  },
};

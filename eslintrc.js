module.exports = {
  "extends": ["next", "next/core-web-vitals"],
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
    "react-hooks/exhaustive-deps": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        alphabetize: {
          order: "asc",
        },
      },
    ],
  }
}
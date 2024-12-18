module.exports = {
    extends: ["taro/react"],
    rules: {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "import/no-commonjs": "off",
        "no-unused-vars": ["error", { "varsIgnorePattern": "Taro" }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }]
    },
    globals: {
        defineAppConfig: "readonly",
        process: "readonly"
    },
    parser: "@babel/eslint-parser",
    parserOptions: {
        requireConfigFile: false
    }
}; 
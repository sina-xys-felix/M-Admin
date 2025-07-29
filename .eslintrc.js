import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default {
  root: true, 
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
      tsx: true,
      ts: true,
    },
  },
  env: {
    browser: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  plugins: ["@typescript-eslint", "vue"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project: resolve(__dirname, "./tsconfig.json"),
      },
    },
  },
  rules: {
    "prettier/prettier": 0,
    "vue/require-default-prop": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/max-attributes-per-line": 0,
    "vue/custom-event-name-casing": [2, "camelCase"],
    "vue/no-v-text": 1,
    "vue/no-unused-vars": 0,
    "vue/no-template-shadow": 0,
    "vue/padding-line-between-blocks": 1,
    "vue/require-direct-export": 1,
    "vue/multi-word-component-names": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-empty-function": 1,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "vue/attribute-hyphenation": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "import/no-named-as-default-member": 0,
    "vue/attributes-order": 0,
    "import/no-named-as-default": 0,
    "import/extensions": [
      0,
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-debugger": process.env.NODE_ENV === "production" ? 1 : 0,
    "no-console": process.env.NODE_ENV === "production" ? 1 : 0,
    "no-param-reassign": 0,
    "prefer-regex-literals": 0,
    "import/no-extraneous-dependencies": 0,
    "vue/no-mutating-props": 0,
    "vue/no-setup-props-destructure": 0,
    endOfLine: 0,
    "arrow-body-style": 0,

    "comma-dangle": 0, //是否允许对象中出现结尾逗号
    semi: [0, "always"], //强制语句分号结尾
    "no-mixed-spaces-and-tabs": [2, "smart-tabs"], //不允许混用tab和空格
    "vue/first-attribute-linebreak": [
      "error",
      {
        singleline: "ignore",
        multiline: "ignore",
      },
    ],
  },
};

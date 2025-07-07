import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
// import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
    },
    plugins: { js },
    rules: {
      ...js.configs.recommended.rules,

      "no-console": "off",
      "eqeqeq": "error",
      "no-var": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },

  // Optional: JSON linting
  // {
  //   files: ["**/*.json"],
  //   language: "json",
  //   plugins: { json },
  //   rules: {
  //     ...json.configs.recommended.rules,
  //   },
  // },

  // Optional: TypeScript rules if you're using TypeScript
  tseslint.configs.recommended,
]);

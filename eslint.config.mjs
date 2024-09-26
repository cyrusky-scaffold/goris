import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";

export default tsEslint.config({
  extends: [pluginJs.configs.recommended, ...tsEslint.configs.recommended],
  files: ["**/*.{js,mjs,cjs,ts}"],
  ignores: ["dist", "./build"],
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "commonjs",
  },
  rules: {},
});

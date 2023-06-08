import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { devPlugin } from "./plugins/devPlugin";
import optimizer from "vite-plugin-optimizer";
let getReplacer = () => {
  let externalModels = ["os", "fs", "path", "events", "child_process", "crypto", "http", "buffer", "url", "better-sqlite3", "knex"];
  let result = {};
  for (let item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    });
  }
  result["electron"] = () => {
    let electronModules = ["clipboard", "ipcRenderer", "nativeImage", "shell", "webFrame"].join(",");
    return {
      find: new RegExp(`^electron$`),
      code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
    };
  };
  return result;
};
export default defineConfig({
  plugins: [optimizer(getReplacer()), devPlugin(), vue()],
  // build: {
  //   assetsInlineLimit: 0,
  //   minify: false,
  //   rollupOptions: {
  //     plugins: [buildPlugin()],
  //   },
  // },
});

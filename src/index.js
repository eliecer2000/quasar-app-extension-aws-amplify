/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendConf(conf, api) {
  // make sure my-ext boot file is registered
  if (!conf.build.env) {
    conf.build.env = {};
  }
  const textFile = `"${api.resolve.src("aws-exports.js")}"`
    .toString()
    .replace(/\\/g, "/");

  console.log("respuestas de la instalacion ", api.prompts);

  conf.build.env["AmplifySetup"] = api.prompts["full"];

  conf.build.env["x_File"] = textFile;

  // conf.build.env["category"] = api.prompts;

  api.prompts["category"].forEach((element) => {
    element.value;
    conf.build.env[element.value] = true;
  });

  conf.boot.push("~quasar-app-extension-aws-amplify/src/boot/amplify.js");
  conf.build.transpileDependencies.push(
    /quasar-app-extension-aws-amplify[\\/]src/
  );
}

module.exports = function (api) {
  // (Optional!)
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app" CLI
  api.compatibleWith("quasar", "^1.8.5");
  api.compatibleWith("@quasar/app", "^1.0.0");
  // Here we extend /quasar.conf.js, so we can add
  // a boot file which registers our new UI component;
  // "extendConf" will be defined below (keep reading the tutorial)
  api.extendQuasarConf(extendConf);
};

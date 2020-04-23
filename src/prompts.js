/**
 * Quasar App Extension prompts script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/prompts-api
 *
 * Inquirer prompts
 * (answers are available as "api.prompts" in the other scripts)
 * https://www.npmjs.com/package/inquirer#question
 *
 * Example:
 *
 *

return [
  {
    name: 'name',
    type: 'string',
    required: true,
    message: 'Quasar CLI Extension name (without prefix)',
  },
  {
    name: 'preset',
    type: 'checkbox',
    message: 'Check the features needed for your project:',
    choices: [
      {
        name: 'Install script',
        value: 'install'
      },
      {
        name: 'Prompts script',
        value: 'prompts'
      },
      {
        name: 'Uninstall script',
        value: 'uninstall'
      }
    ]
  }
]
*/

// | value      |
// | ------------- |
// | analytics     |
// | api           |
// | auth          |
// | function      |
// | hosting       |
// | interactions  |
// | notifications |
// | predictions   |
// | storage       |
// | xr

//? Authentication
//? DataStore
// User File Storage
// Serverless APIs
// Analytics
// AI/ML
// Push Notification
// PubSub
// AR/VR

module.exports = function () {
  return [
    {
      name: "full",
      type: "confirm",
      message: "Desea cargar todas las categorias?",
      default: true,
    },
    {
      name: "category",
      type: "checkbox",
      message: "Cuales de las siguientes categorias desea instalar:",
      when: (answers) => {
        return !answers.full;
      },
      choices: [
        {
          name: "AUTHENTICATION",
          value: {
            value: "auth",
          },
          checked: true,
        },
        {
          name: "API (Rest & GraphQL)",
          value: {
            value: "api",
          },
          checked: true,
        },
        {
          name: "STORAGE",
          value: {
            value: "storage",
          },
          checked: true,
        },
        {
          name: "ANALYTICS",
          value: {
            value: "analytics",
          },
        },
        {
          name: "PREDICTIONS",
          value: {
            value: "predictions",
          },
        },
        {
          name: "PUSH NOTIFICATIONS",
          value: {
            value: "notifications",
          },
        },
        {
          name: "XR",
          value: {
            value: "xr",
          },
        },
      ],
    },
    {
      name: "utility",
      type: "checkbox",
      message: "Que utilidades desea incluir:",
      when: (answers) => {
        return !answers.full;
      },
      choices: [
        {
          name: "Service Worker",
          value: {
            value: "ServiceWorker",
          },
        },
        {
          name: "Cache",
          value: {
            value: "cache",
          },
        },
        {
          name: "Hub",
          value: {
            value: "hub",
          },
        },
        {
          name: "Internationalization",
          value: {
            value: "internationalization",
          },
        },
        {
          name: "Logger",
          value: {
            value: "logger",
          },
        },
      ],
    },
  ];
};

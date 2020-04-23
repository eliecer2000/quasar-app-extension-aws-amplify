console.log("auth ", process.env.auth);
console.log("api ", process.env.api);
console.log("storage ", process.env.storage);
console.log("analytics ", process.env.analytics);
console.log("predictions ", process.env.predictions);
console.log("notifications ", process.env.notifications);
console.log("xr ", process.env.xr);

export default async ({ router, Vue }) => {
  const AwsExports = await import(process.env.x_File);
  if (process.env.auth) {
    const Auth = await import("@aws-amplify/auth");
    Auth.default.configure(AwsExports.default);
    Vue.prototype.$Auth = Auth.default;
  }
  if (process.env.api) {
    const API = await import("@aws-amplify/api");
    const PubSub = await import("@aws-amplify/pubsub");
    const { graphqlOperation } = API.default;
    API.default.configure(AwsExports.default);
    PubSub.default.configure(AwsExports.default);
    Vue.prototype.$API = API.default;
    Vue.prototype.$graphqlOperation = graphqlOperation;
  }
  if (process.env.storage) {
    const Storage = await import("@aws-amplify/storage");
    Storage.default.configure(AwsExports.default);
    Vue.prototype.$Storage = Storage.default;
  }

  router.beforeResolve(async (to, from, next) => {
    if (!Vue.prototype.$Auth) {
      return next();
    }
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      let user;
      await Vue.prototype.$q.loading.show();
      await Vue.prototype.$Auth
        .currentAuthenticatedUser({
          bypassCache: true,
        })
        .then(async (data) => {
          await Vue.prototype.$q.loading.hide();
          if (data && data.signInUserSession) {
            user = data;
          }
          next();
        })
        .catch(async (e) => {
          next({
            path: "/",
          });
          await Vue.prototype.$q.loading.hide();
        });
    }
    next();
  });
};

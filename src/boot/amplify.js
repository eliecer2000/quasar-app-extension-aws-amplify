const fs = require("fs");
const path = "../aws-exports.js";
try {
  if (fs.existsSync(path)) {
    //file exists
    import Auth from "@aws-amplify/auth";
    import API, { graphqlOperation } from "@aws-amplify/api";
    import PubSub from "@aws-amplify/pubsub";

    import AwsExports from "../aws-exports";
    Auth.configure(AwsExports);
    API.configure(AwsExports);
    PubSub.configure(AwsExports);

    export default ({ router, Vue }) => {
      Vue.prototype.$Auth = Auth;
      Vue.prototype.$API = API;
      Vue.prototype.$graphqlOperation = graphqlOperation;

      router.beforeResolve(async (to, from, next) => {
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
  }
} catch (err) {
  console.error(err);
}

// 路由鉴权
import router from "@/router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import useStore from "./store";
nprogress.configure({ showSpinner: false });
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  console.log(from);
  nprogress.start();
  const { user } = useStore();
  if (user.token) {
    if (to.path === "/login") {
      next({ path: "/home" });
    } else {
      // next();
      if (user.username) {
        next();
      } else {
        try {
          await user.userInfo();
          next();
        } catch (error) {
          await user.logout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

// 全局后置守卫
router.afterEach(() => {
  nprogress.done();
});

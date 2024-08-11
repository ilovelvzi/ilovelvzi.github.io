import { defineStore } from "pinia";
import { regLogin, reqUserInfo, reqLogout } from "@/api/user";
// 引入数据类型
import type {
  loginForm,
  loginResponseData,
  userResponseData,
} from "@/api/user/type";
import type { UserState } from "./type/type";

const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      token: localStorage.getItem("TOKEN") || "",
      username: "",
      avatar: "",
    };
  },
  actions: {
    // 登录
    async login(data: loginForm) {
      const res: loginResponseData = await regLogin(data);
      if (res.code === 200) {
        // 登录成功
        this.token = res.data as string;
        localStorage.setItem("TOKEN", res.data as string);
        return "ok";
      } else {
        // 登录失败
        return Promise.reject(new Error(res.data));
      }
    },
    // 获取用户信息
    async userInfo() {
      const res: userResponseData = await reqUserInfo();
      if (res.code === 200) {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    // 退出登录
    async logout() {
      const res: any = await reqLogout();
      if (res.code === 200) {
        this.username = "";
        this.avatar = "";
        this.token = "";
        localStorage.removeItem("TOKEN");
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;

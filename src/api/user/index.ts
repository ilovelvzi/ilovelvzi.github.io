// 用户相关的接口
import request from "@/utils/request";
import { loginForm, loginResponseData, userResponseData } from "./type";
// 统一管理接口
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}

// 登录接口
export const regLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
// 获取用户信息
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL);
// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);

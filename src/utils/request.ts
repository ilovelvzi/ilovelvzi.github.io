// 进行axios二次封装: 使用请求与响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
import useStore from "@/store";
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径
  timeout: 5000, // 超时时间
});

// 请求拦截器
request.interceptors.request.use((config) => {
  const { user } = useStore();
  if (user.token) {
    config.headers.token = user.token;
  }
  // 返回请求头
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  // 成功的回调
  (response) => {
    return response.data;
  },
  // 失败的回调
  (error) => {
    let status = error.response.status;
    let message = "";
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器出现问题";
        break;
      default:
        message = "网络出现问题";
        break;
    }

    // 提示错误信息
    ElMessage({
      type: "error",
      message,
    });

    return Promise.reject(error);
  }
);

export default request;

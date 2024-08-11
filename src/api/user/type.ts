// 登录接口需要携带参数ts类型
export interface loginForm {
  username: string;
  password: string;
}

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string;
}

// 用户信息
export interface userResponseData extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}

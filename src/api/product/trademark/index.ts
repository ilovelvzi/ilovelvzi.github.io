import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark } from "./type";

enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  ADTRADEMARK_URL = "/admin/product/baseTrademark/save",
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
}

// 获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`
  );

// 添加/修改品牌
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
  } else {
    return request.post<any, any>(API.ADTRADEMARK_URL, data);
  }
};

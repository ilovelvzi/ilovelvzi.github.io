import SvgIcon from "./SvgIcon/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 全局对象
const allGloablComponent: any = { SvgIcon };
// 对外暴露插件对象
export default {
  install(app: any) {
    // 注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      app.component(key, allGloablComponent[key]);
    });

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};

import { createApp } from "vue";
import App from "@/App.vue";
// 引入element-plus插件与样式
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// 引入全局样式
import "@/styles/index.scss";
// svg插件需要配置代码
import "virtual:svg-icons-register";
// 引入自定义插件对象：注册整个项目全局组件
import gloalComponent from "@/components";
// 引入路由
import router from "./router";
// 引入pinia
import { createPinia } from "pinia";
// 引入路由鉴权
import "./permisstion.ts";
const pinia = createPinia();

const app = createApp(App);

// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
});
// 安装自定义插件
app.use(gloalComponent);
// 注册路由
app.use(router);
// 注册pinia
app.use(pinia);
app.mount("#app");

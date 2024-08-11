import useUserStore from "./modules/user";
import useSettingStore from "./modules/setting";

export default function useStore() {
  return {
    user: useUserStore(),
    setting: useSettingStore(),
  };
}

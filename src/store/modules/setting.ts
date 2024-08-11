import { defineStore } from "pinia";

const useSettingStore = defineStore("setting", {
  state: () => {
    return {
      fold: false,
      refresh: true,
    };
  },
  actions: {
    changeFold() {
      this.fold = !this.fold;
    },
    toggleRefresh() {
      this.refresh = !this.refresh;
    },
  },
  getters: {},
});

export default useSettingStore;

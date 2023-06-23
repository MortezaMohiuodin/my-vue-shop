export const localSettingPlugin = {
  install(Vue: any) {
    Vue.prototype.$localSetting = localSetting;
  },
};
const localSetting = {
  key: `__${process.env.VUE_APP_NAME.toUpperCase()}__SETTING__`,
  get: function (key?: string) {
    let data: any = "{}";

    data = window.localStorage.getItem(this.key) || data;

    try {
      data = JSON.parse(data);
    } catch (er) {
      console.warn("Cannot parse settings: ", data);
      data = {};
    }

    if (key) data = data[key];

    return data;
  },
  set: function (key: string, value: any) {
    const data = this.get();

    data[key] = value;

    window.localStorage.setItem(this.key, JSON.stringify(data));
  },
  clear(key: string) {
    let data = this.get();

    if (key) {
      if (data[key] === undefined) return;
      data[key] = undefined;
    } else {
      data = {};
    }

    window.localStorage.setItem(this.key, JSON.stringify(data));
  },
};
export default localSetting;

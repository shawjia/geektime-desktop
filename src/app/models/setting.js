import { getStore } from '../utils/index';

const store = getStore();
const initCountry = store.get('country', 86);
const initPhone = store.get('phone', '');
const initPass = store.get('password', '');

const VIEW_FULL = 1; // 三栏模式
const VIEW_CATALOG = 2; // 两栏模式
const VIEW_CONTENT = 4; // 单文章模式

const setting = {
  state: {
    show: initPhone === '' || initPass === '',
    country: initCountry,
    phone: initPhone,
    password: initPass,
    viewMode: VIEW_FULL,
  },

  reducers: {
    toggleShow(state) {
      return {
        ...state,
        show: !state.show,
      }
    },

    toggleMode(state, payload) {
      const { viewMode: prevMode } = state;
      let viewMode = payload;

      if (prevMode === viewMode) {
        switch (payload) {
          case VIEW_FULL:
            viewMode = VIEW_CATALOG;
            break;

          case VIEW_CATALOG:
            viewMode = VIEW_CONTENT;
            break;

          case VIEW_CONTENT:
            viewMode = VIEW_FULL;
            break;

          default:
            break;
        }
      }

      return {
        ...state,
        viewMode,
      }
    },

    saveSetting(state, payload) {
      const { country, phone, password } = payload;

      store.set('country', country);
      store.set('phone', phone);
      store.set('password', password);

      return {
        ...state,
        show: false,
        country,
        phone,
        password,
      }
    },
  },

  effects: {
  }
}

export default setting;

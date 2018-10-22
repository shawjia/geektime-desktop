import { getStore } from '../utils/index';

const store = getStore();
const initCountry = store.get('country', 86);
const initPhone = store.get('phone', '');
const initPass = store.get('password', '');

const setting = {
  state: {
    show: initPhone === '' || initPass === '',
    country: initCountry,
    phone: initPhone,
    password: initPass,
  },

  reducers: {
    toggleShow(state) {
      return {
        ...state,
        show: !state.show,
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

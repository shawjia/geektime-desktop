
import Store from 'electron-store';

const store = new Store();

const initPhone = store.get('phone', '');
const initPass = store.get('password', '');

const setting = {
  state: {
    show: initPhone === '' || initPass === '',
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
      const { phone, password } = payload;

      store.set('phone', phone);
      store.set('password', password);

      return {
        ...state,
        show: false,
        phone,
        password,
      }
    },
  },

  effects: {
  }
}

export default setting;

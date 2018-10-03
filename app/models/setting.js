import Geektime from 'geektime';
import Store from 'electron-store';

const store = new Store();

const initPhone = store.get('phone', '');
const initPass = store.get('password', '');

function getClient() {
  return new Geektime(store.get('phone'), store.get('password'));
}

const game = {
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
    async fetchProducts() {
      const res = await getClient().products();
      console.log(res);
    },
  }
}

export default game;

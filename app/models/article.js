import Geektime from 'geektime';
import Store from 'electron-store';

const store = new Store();

function getClient() {
  return new Geektime(store.get('phone'), store.get('password'));
}

const article = {
  state: {
    article: '123',
  },

  reducers: {
    setArticle(state, payload) {
      return {
        ...state,
        article: payload,
      }
    },
  },

  effects: {
    async fetchArticle(id) {
      const res = await getClient().article(id);

      this.setArticle(res);
    },
  }
}

export default article;

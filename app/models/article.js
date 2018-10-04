import { getGeektimeClient } from '../utils/index';

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
      const res = await getGeektimeClient().article(id);

      this.setArticle(res);
    },
  }
}

export default article;

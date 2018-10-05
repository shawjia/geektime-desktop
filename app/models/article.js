import { getGeektimeClient } from '../utils/index';

const article = {
  state: {
    aid: 0,
    article: null,
  },

  reducers: {
    setAid(state, payload) {
      return {
        ...state,
        aid: payload,
      }
    },

    setArticle(state, payload) {
      return {
        ...state,
        article: payload,
      }
    },
  },

  effects: {
    async fetchArticle(id) {
      this.setAid(id);

      const res = await getGeektimeClient().article(id);

      this.setArticle(res);
    },
  }
}

export default article;

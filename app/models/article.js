import { getGeektimeClient } from '../utils/index';

const article = {
  state: {
    aid: 0,
    article: null,
    mp3: '',
    playing: false,
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

    playMp3(state, { mp3 }) {
      return {
        ...state,
        playing: true,
        mp3,
      }
    },

    pauseMp3(state) {
      return {
        ...state,
        playing: false,
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

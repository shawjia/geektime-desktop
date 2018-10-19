import { getGeektimeClient } from '../utils/index';

const article = {
  state: {
    aid: 0,
    article: null,
    mp3: '',
    comments: [],
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

    setComments(state, comments) {
      return { ...state, comments };
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

      const client = getGeektimeClient();

      this.setArticle(await client.article(id));

      const { list: comments } = await client.comments(id, 1000);

      this.setComments(comments);
    },
  }
}

export default article;

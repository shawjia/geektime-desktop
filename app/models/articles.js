import { getGeektimeClient, getStore } from '../utils/index';

const store = getStore();
const articles = {
  state: {
    articles: [],
    asc: store.get('asc', true),
  },

  reducers: {
    toggleAsc(state) {
      const asc = !state.asc;

      store.set('asc', asc);

      return {
        ...state,
        asc,
        articles: state.articles.reverse(),
      }
    },

    setArticles(state, payload) {
      return {
        ...state,
        articles: state.asc ? payload.reverse() : payload,
      }
    },
  },

  effects: {
    async fetchArticles(cid) {

      const client = getGeektimeClient();

      const [{ list: newArticles }, { list: audios }] = await Promise.all([
        client.articles(cid), client.audios(cid)
      ]);

      if (newArticles.length) {
        this.setArticles(
          newArticles.map(v => {
            const audio = audios.find(({ id }) => id === v.id);
            const article = v;

            if (audio && audio.audio_download_url) {
              article.mp3 = audio.audio_download_url;
            }

            return article;
          })
        );
      }
    },
  }
}

export default articles;

import { message } from 'antd';
import { getGeektimeClient, getStore } from '../utils/index';

const cache = {};
const store = getStore();
const articles = {
  state: {
    articles: [],
    filterArticles: [],
    asc: store.get('asc', true),
    search: '',
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

    setSearch(state, payload) {
      const search = payload.trim();
      const { articles: all } = state;

      let filterArticles = search === ''
        ? all
        : all.filter(v => v.article_title.includes(search));

      if (all.length && (filterArticles.length === 0)) {
        message.info(`找不到匹配${search}的文章`, 1.5);
        filterArticles = all;
      }

      return {
        ...state,
        filterArticles,
        search
      };
    },

    setArticles(state, payload) {
      const all = state.asc ? payload.reverse() : payload;
      return {
        ...state,
        articles: all,
        filterArticles: all,
      }
    },
  },

  effects: {
    async fetchArticles(cid) {

      if (cache[cid]) {
        this.setArticles(cache[cid].slice(0));
        return;
      }

      const client = getGeektimeClient();

      const [{ list: newArticles }, { list: audios }] = await Promise.all([
        client.articles(cid), client.audios(cid)
      ]);

      if (newArticles.length) {

        const tmp = newArticles.map(v => {
          const audio = audios.find(({ id }) => id === v.id);
          const article = v;

          if (audio && audio.audio_download_url) {
            article.mp3 = audio.audio_download_url;
          }

          return article;
        });

        cache[cid] = tmp;

        this.setArticles(tmp.slice(0));
      }
    },
  }
}

export default articles;

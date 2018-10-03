import Geektime from 'geektime';
import Store from 'electron-store';

const defaultProducts = [
  {cid: 120, title: '极客新闻'},
];
const store = new Store();

function getClient() {
  return new Geektime(store.get('phone'), store.get('password'));
}

const products = {
  state: {
    products: defaultProducts,
  },

  reducers: {
    setProducts(state, payload) {
      return {
        ...state,
        products: payload,
      }
    },
  },

  effects: {
    async fetchProducts() {

      const res = await getClient().products();

      // 暂时只处理 专栏1/微课3，忽略 视频课2/其他99
      const tmp = [
        ...res.find(v => v.id === 1).list.map(column => {
          const c = column;

          c.cid = column.extra.column_id;

          return c;
        }),
        ...res.find(v => v.id === 3).list.map(column => {
          const c = column;

          c.cid = column.extra.column_id;

          return c;
        })
      ];

      if (tmp.length) {
        this.setProducts(tmp);
      }
    },
  }
}

export default products;

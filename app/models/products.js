import { getGeektimeClient } from '../utils/index';

const products = {
  state: {
    products: [],
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

      // 暂时只处理 专栏1/视频课2/微课3，忽略 其他99
      const icons = {
        1: 'book',
        2: 'video-camera',
        3: 'bulb',
      }
      const isDev = process.env.NODE_ENV !== 'production';
      const tmp = (await getGeektimeClient().products())
        .filter(({ id }) => [1,2,3].includes(id))
        .reduce(
          (acc, {list}, index) => {
            acc.push(...list.map(column => ({
              ...column,
              cid: column.extra.column_id,
              icon: icons[index + 1],
            })));

            return acc;
          },
          []
        );

      if (tmp.length) {
        this.setProducts(tmp.filter(
          v => isDev ? [42, 116, 48, 130, 73].includes(v.cid) : true
        ));
      }
    },
  }
}

export default products;

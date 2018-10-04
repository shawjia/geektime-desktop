import Store from 'electron-store';
import Geektime from 'geektime';

const encryptionKey = 'MISSWANG';

function getStore() {
  return new Store({ encryptionKey });
}

function getGeektimeClient() {
  const store = getStore();

  return new Geektime(store.get('phone'), store.get('password'));
}

export {
  getStore,
  getGeektimeClient,
}

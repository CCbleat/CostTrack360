import * as SecureStore from 'expo-secure-store';

export async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  return await SecureStore.getItemAsync(key);
}

type newProduct = {
    productName: string; // 产品名
    unitConsumableTime: number; // 单位耗材可使用时间
    unitConsumablePrice: number; // 单位耗材价格
    estimatedProductTime: number; // 预计产品使用时间
    broughtInConsumableNum: number; // 自带耗材数量
}

// add a new product to an array, and then store to secure store
// kye: products, value: [JSON.stringify(newProduct), ...oldProducts]
export async function addNewProduct(newProduct: newProduct) {
  const products = JSON.parse(await SecureStore.getItemAsync('products'));
  products.unshift(newProduct); // add new product to the array in the head
  await SecureStore.setItemAsync('products', JSON.stringify(products));
}

// get all stored products (in array form) from secure store
// also use JSON.parse to parse the each item in the array
export async function getAllProducts() {
  return JSON.parse(await SecureStore.getItemAsync('products'));
}

// delete a product from the array, and then store to secure store
// key: products, value: (oldProducts - deletedProduct)
export async function deleteProduct(deletedProduct: newProduct) {
  const products = JSON.parse(await SecureStore.getItemAsync('products'));
  const newProducts = products.filter((product: newProduct) => product !== deletedProduct);
  await SecureStore.setItemAsync('products', JSON.stringify(newProducts));
}

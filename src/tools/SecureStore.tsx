import * as SecureStore from 'expo-secure-store';
import type { newProduct } from '../types/NewProductT';

export async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  return await SecureStore.getItemAsync(key);
}

// add a new product to an array, and then store to secure store
// kye: products, value: [JSON.stringify(newProduct), ...oldProducts]
export async function addNewProduct(newProduct: newProduct) {
  const products = JSON.parse(await SecureStore.getItemAsync('products')) || [];
  products.unshift(newProduct); // add new product to the array in the head
  await SecureStore.setItemAsync('products', JSON.stringify(products));
}

// get all stored products (in array form) from secure store
// also use JSON.parse to parse the each item in the array
export async function getAllProducts() {
  return JSON.parse(await SecureStore.getItemAsync('products')) || [];
}

// delete a product from the array, and then store to secure store
// key: products, value: (oldProducts - deletedProduct)
export async function deleteProduct(deletedProduct: newProduct) {
  const products = JSON.parse(await SecureStore.getItemAsync('products')) || [];
  const newProducts = products.filter((product: newProduct) => product !== deletedProduct);
  await SecureStore.setItemAsync('products', JSON.stringify(newProducts));
}

// delete all products from the array, and then store [] to secure store
export async function deleteAllProducts() {
  await SecureStore.setItemAsync('products', JSON.stringify([]));
}

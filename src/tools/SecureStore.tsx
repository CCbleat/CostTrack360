import * as SecureStore from 'expo-secure-store';
import type { newProduct } from '../types/NewProductT';

export function save(key: string, value: string) {
  SecureStore.setItem(key, value);
}

export function getValueFor(key: string) {
  return SecureStore.getItem(key);
}

// add a new product to an array, and then store to secure store
// kye: products, value: [JSON.stringify(newProduct), ...oldProducts]
export function addNewProduct(newProduct: newProduct) {
  const products = JSON.parse( SecureStore.getItem('products')) || [];
  products.unshift(newProduct); // add new product to the array in the head
  SecureStore.setItem('products', JSON.stringify(products));
}

// get all stored products (in array form) from secure store
// also use JSON.parse to parse the each item in the array
export function getAllProducts() : newProduct[] {
  return JSON.parse( SecureStore.getItem('products')) || [];
}

// delete a product from the array, and then store to secure store
// key: products, value: (oldProducts - deletedProduct)
export function deleteProduct(deletedProductName: string) {
  const products = JSON.parse( SecureStore.getItem('products')) || [];
  const newProducts = products.filter(
    (product: newProduct) => product.productName !== deletedProductName
  );
  console.log(newProducts);
  SecureStore.setItem('products', JSON.stringify(newProducts));
}

// delete all products from the array, and then store [] to secure store
export function deleteAllProducts() {
  SecureStore.setItem('products', JSON.stringify([]));
}

// get the selected product name list from secure store
export function getSelectedProductName() : string {
  return JSON.parse( SecureStore.getItem('selectedProductName')) || "";
}

// store the selected product name list to secure store for later use
export function storeSelectedProductName(selectedProductsName: string) {
  SecureStore.setItem('selectedProductName', JSON.stringify(selectedProductsName));
}

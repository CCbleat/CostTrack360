import React, { useState, useEffect } from 'react';
import { 
  StyleSheet,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { View, ScrollView } from 'tamagui';
import ProductElement from '../src/components/PagesComponents/HomePage/ProductElement';
import PlusRoundedButton from '../src/components/buttons/roundedButtons/PlusRoundedButton';
import CompareAndDelete from '../src/components/PagesComponents/ComparePage/CompareAndDelete';
import TopHeadingText from '../src/components/texts/TopHeadingText';
import { getAllProducts, deleteAllProducts } from '../src/tools/SecureStore';

type ProductElementProps = {
  // Checked: boolean,
  ProductTitle: string;
  CurrencySign: string;
  Cost: number[];
}

// Mock data
const products: ProductElementProps[] = [
  {
    // Checked: false,
    ProductTitle: '莱芬电动牙刷',
    CurrencySign: '¥',
    Cost: [100, 200, 300],
  },
  {
    // Checked: false,
    ProductTitle: '小米电动牙刷T302',
    CurrencySign: '$',
    Cost: [100_000, 200_000, 300_000],
  }
]

const onPressPlusBtnAction = () => {
  // Jump to addPage
  router.push('/addPage');
}

export default function App() {
  // numSelectedProduct record the number of selected products (defined by useState)
  const [numSelectedProduct, setNumSelectedProduct] = useState(0);

  // get all products
  const getAllProductsFromStore = async () => {
    const products = await getAllProducts();
    console.log(products);
  }

  const modifyNumSelectedProduct = {
    increment: () => {setNumSelectedProduct(numSelectedProduct + 1)},
    decrement: () => {setNumSelectedProduct(numSelectedProduct - 1)},
  }

  return (
    <View style={styles.container}>
      <TopHeadingText>产品开销列表</TopHeadingText>
      <ScrollView>
        {/* pass products to  ProductElements */}
        {products.map((product, index) => (
          <ProductElement key={product.ProductTitle+index} {...product} modifyNumSelectedProduct={modifyNumSelectedProduct} />
        ))}
      </ScrollView>
      { numSelectedProduct === 0 ? 
        <PlusRoundedButton onPressAction={onPressPlusBtnAction}/> :
        <CompareAndDelete />
      }
    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      marginTop: StatusBar.currentHeight || 0, // Avoid content being hidden by status bar
      paddingHorizontal: 10,
      flex: 1,
    },
  }
);

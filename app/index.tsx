import React, { useState, useEffect } from 'react';
import { 
  StyleSheet,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { View, ScrollView } from 'tamagui';
import ProductElement from '../src/components/PagesComponents/HomePage/ProductElement';
import { PlusRoundedButton } from '../src/components/buttons/roundedButtons/index';
import { CompareEditDelete} from '../src/components/PagesComponents/ComparePage/index';
import TopHeadingText from '../src/components/texts/TopHeadingText';
import { getAllProducts } from '../src/tools/SecureStore';
import type { ProductElementProps, newProduct } from '../src/types/index';

// Mock data
// const products: ProductElementProps[] = [
//   {
//     // Checked: false,
//     ProductTitle: '莱芬电动牙刷',
//     CurrencySign: '¥',
//     Cost: [100, 200, 300],
//   },
//   {
//     // Checked: false,
//     ProductTitle: '小米电动牙刷T302',
//     CurrencySign: '$',
//     Cost: [100_000, 200_000, 300_000],
//   }
// ]

const onPressPlusBtnAction = () => {
  // Jump to addPage
  router.push('/addPage');
}

export default function App() {
  // numSelectedProduct record the number of selected products (defined by useState)
  const [selectedProductsNameList, setSelectedProductsNameList] = useState<string[]>([]); // may be can replace numSelectedProduct by checking the length of selectedProductsName
  const [products, setProducts] = useState<ProductElementProps[]>([]);

  useEffect(() => {
    const elements = getAllProducts();
    const calculatedProducts = elements.map((element: newProduct) => {
      const { productName: ProductTitle, currencySign: CurrencySign, 
              productPrice, unitConsumableTime, unitConsumablePrice, broughtInConsumableNum } = element;
      
      const calculateCostOnYear = (year: number) => {
        let cost = 0;
        if (Number(broughtInConsumableNum) * Number(unitConsumableTime) >= 365 * year) {
          cost = Number(productPrice);
        } else {
          const neededUnitConsumablePrice = 
          (Math.floor((365 * year - Number(broughtInConsumableNum) * Number(unitConsumableTime)) / Number(unitConsumableTime)) + 1) * Number(unitConsumablePrice);
          cost = Number(productPrice) + Number(neededUnitConsumablePrice);
        }
        return cost;
      }

      // Declare costFirstYear, costSecondYear, costThirdYear and initialize them 0
      let costFirstYear = 0, costSecondYear = 0, costThirdYear = 0;
      // Calculate costFirstYear
      costFirstYear = calculateCostOnYear(1);
      // Calculate costSecondYear
      costSecondYear = calculateCostOnYear(2);   
      // Calculate costThirdYear
      costThirdYear = calculateCostOnYear(3);

      const Cost = [costFirstYear, costSecondYear, costThirdYear];

      return {
        ProductTitle,
        CurrencySign,
        Cost,
      }
    });
    setProducts(calculatedProducts);
  }, []);

  // Define modifySelectedProductsNameList
  const modifySelectedProductsNameList = {
    // add a product name to selectedProductsNameList (selected)
    add: (productName: string) => {
      setSelectedProductsNameList([...selectedProductsNameList, productName]);
    },
    // remove a product name from selectedProductsNameList (unselected)
    remove: (productName: string) => {
      const newSelectedProductsNameList = selectedProductsNameList.filter((name) => name !== productName);
      setSelectedProductsNameList(newSelectedProductsNameList);
    },
  }

  return (
    <View style={styles.container}>
      <TopHeadingText>产品开销列表</TopHeadingText>
      <ScrollView>
        {/* pass products to  ProductElements */}
        {products.map((product, index) => (
          <ProductElement 
            key={product.ProductTitle+index} 
            {...product} 
            modifySelectedProductsNameList={modifySelectedProductsNameList}
          />
        ))}
      </ScrollView>
      { 
        selectedProductsNameList.length === 0 ? 
        <PlusRoundedButton onPressAction={onPressPlusBtnAction} /> :
        <CompareEditDelete selectedProductsNameList={selectedProductsNameList} />
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

import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'tamagui';
import TitleProductElement from './texts/TitleProductElement';
import ProductElementChecker from './form/ProductElementChecker';

type ProductElementProps = {
  Checked: boolean;
  ProductTitle: string;
  CurrencySign: string;
  Cost: number[];
}

export default function ProductElement({Checked, ProductTitle, CurrencySign, Cost}: ProductElementProps) {
  return (
    <View style={styles.container}>
      <ProductElementChecker Checked={Checked} />
      <View style={styles.productContainer}>
        <TitleProductElement>{ProductTitle}</TitleProductElement>
        <View style={styles.costsContainer}>
          <Text style={styles.currencySign}>{CurrencySign}</Text>
          {/* three text elements, like 100元/1年, 100元/2年, 100元/3年 (Cost[i]元/i+1年}), each elements separated by space */}
          {Cost.map((cost, index) => (
            <Text key={cost + index} style={styles.costContentElement}>{cost}{CurrencySign}/{index + 1}年</Text>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productContainer: {
    width: 300,
    // height: 56,
    padding: 8,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#707070',
    marginTop: 16,
  },
  costsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencySign: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  costContentElement: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  }
})
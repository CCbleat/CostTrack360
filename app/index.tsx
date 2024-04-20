import { 
  StyleSheet,
  StatusBar,
} from 'react-native';
import { View, ScrollView } from 'tamagui';
import ProductElement from '../src/components/ProductElement';
import PlusRoundedButton from '../src/components/buttons/PlusRoundedButton';
import TopHeadingText from '../src/components/texts/TopHeadingText';

type ProductElementProps = {
  Checked: boolean,
  ProductTitle: string
  CurrencySign: string
  Cost: number[]
}

// Mock data
const products: ProductElementProps[] = [
  {
    Checked: false,
    ProductTitle: '莱芬电动牙刷',
    CurrencySign: '¥',
    Cost: [100, 200, 300],
  },
  {
    Checked: false,
    ProductTitle: '小米电动牙刷T302',
    CurrencySign: '$',
    Cost: [10, 20, 30],
  }
]

export default function App() {
  return (
    <View style={styles.container}>
      <TopHeadingText>产品开销列表</TopHeadingText>
      <ScrollView>
        {/* pass products to  ProductElements */}
        {products.map((product, index) => (
          <ProductElement key={product.ProductTitle+index} {...product} />
        ))}
      </ScrollView>
      <PlusRoundedButton />
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

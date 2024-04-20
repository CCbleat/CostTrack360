import React from 'react';
import { 
    StatusBar, 
    StyleSheet 
} from 'react-native';
import { router } from 'expo-router';
import { View, ScrollView } from 'tamagui';
import PlusRoundedButton from '../src/components/buttons/roundedButtons/PlusRoundedButton';
import BackRoundedButton from '../src/components/buttons/roundedButtons/BackRoundedButton';
import TopHeadingText from '../src/components/texts/TopHeadingText';
import AddNewProductLine from '../src/components/PagesComponents/AddPage/AddNewProductLine';

const onPressPlusBtnAction = () => {
}

const onPressBackBtnAction = () => {
    // Jump to homePage
    router.push('/');
}

export default function addPage() {
  return (
    <View style={styles.container}>
    <TopHeadingText>添加新产品</TopHeadingText>
    <ScrollView>
        <AddNewProductLine lineKey="产品名"/>
        <AddNewProductLine lineKey="单位耗材可使用天数"/>
        <AddNewProductLine lineKey="单位耗材价格"/>
        <AddNewProductLine lineKey="预计使用时间"/>
        <AddNewProductLine lineKey="自带耗材数量"/>
    </ScrollView>
    <BackRoundedButton onPressAction={onPressBackBtnAction}/>
    <PlusRoundedButton  onPressAction={onPressPlusBtnAction}/>
  </View>
  )
}

const styles = StyleSheet.create(
    {
        container: {
            marginTop: StatusBar.currentHeight || 0, // Avoid content being hidden by status bar
            paddingHorizontal: 10,
            flex: 1,
        },
    }
)
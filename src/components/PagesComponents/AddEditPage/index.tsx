import React, { useState } from 'react';
import { 
    StatusBar, 
    StyleSheet 
} from 'react-native';
import { router } from 'expo-router';
import { View, ScrollView } from 'tamagui';
import { PlusRoundedButton, BackRoundedButton, EditRoundedButton } from '../../buttons/roundedButtons';
import TopHeadingText from '../../texts/TopHeadingText';
import AddNewProductInputLine from '../../PagesComponents/AddEditPage/AddNewProductInputLine';
import { addNewProduct } from '../../../tools/SecureStore';
import type { newProduct } from '../../../types/NewProductT';

export default function AddEditPage({ isEditPage }: { isEditPage: boolean }) {
    const [productName, setProductName] = useState<string>(''); // 产品名
    const [currencySign, setCurrencySign] = useState<string>(''); // 货币符号
    const [productPrice, setProductPrice] = useState<number>(); // 产品价格
    const [unitConsumableTime, setUnitConsumableTime] = useState<number>(); // 单位耗材可使用时间
    const [unitConsumablePrice, setUnitConsumablePrice] = useState<number>(); // 单位耗材价格
    const [estimatedProductTime, setEstimatedProductTime] = useState<number>(); // 预计产品使用时间
    const [broughtInConsumableNum, setBroughtInConsumableNum] = useState<number>(); // 自带耗材数量
    
    const onPressBackBtnAction = () => {
        // Jump to homePage
        router.push('/');
    }
    
    const onPressPlusBtnAction = () => {
        const newProduct: newProduct = {
            productName: productName,
            currencySign: currencySign,
            productPrice: productPrice,
            unitConsumableTime: unitConsumableTime,
            unitConsumablePrice: unitConsumablePrice,
            estimatedProductTime: estimatedProductTime,
            broughtInConsumableNum: broughtInConsumableNum,
        }
        addNewProduct(newProduct);
        router.push('/');
    }

    return (
        <View style={styles.container}>
            <TopHeadingText>添加新产品</TopHeadingText>
            <ScrollView>
                <AddNewProductInputLine lineKey="产品名" lineState={productName} setLineState={setProductName}/>
                <AddNewProductInputLine lineKey="产品价格" lineState={productPrice} setLineState={setProductPrice}/>
                <AddNewProductInputLine lineKey="单位耗材可使用天数" lineState={unitConsumableTime} setLineState={setUnitConsumableTime}/>
                <AddNewProductInputLine lineKey="单位耗材价格" lineState={unitConsumablePrice} setLineState={setUnitConsumablePrice}/>
                <AddNewProductInputLine lineKey="预计使用时间" lineState={estimatedProductTime} setLineState={setEstimatedProductTime}/>
                <AddNewProductInputLine lineKey="自带耗材数量" lineState={broughtInConsumableNum} setLineState={setBroughtInConsumableNum}/>
                <AddNewProductInputLine lineKey="货币符号" lineState={currencySign} setLineState={setCurrencySign}/>
            </ScrollView>
            <BackRoundedButton onPressAction={onPressBackBtnAction}/>
            { isEditPage 
                ? <EditRoundedButton onPressAction={() => {}} />
                : <PlusRoundedButton  onPressAction={onPressPlusBtnAction}/>
            }
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
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, StatusBar } from 'react-native';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent } from 'echarts/components';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { BackRoundedButton, CWRotateRoundedButton, CCWRotateRoundedButton } from '../src/components/buttons/roundedButtons';
import TopHeadingText from '../src/components/texts/TopHeadingText';
import * as ScreenOrientation from 'expo-screen-orientation';
import { router } from 'expo-router';
import { getAllProducts, getSelectedProductsNameList, storeSelectedProductsNameList } from '../src/tools/SecureStore';
import { newProduct } from '../src/types/NewProductT';



echarts.use([ SVGRenderer, LineChart, GridComponent, LegendComponent ]);

export default function lineChartPage() {
    const [isScreenLandscape, setIsScreenLandscape] = useState(false); // Check if the screen is in landscape mode, Orientation.LANDSCAPE_RIGHT ＝ 4
    const [E_Height, setE_Height] = useState(Dimensions.get('window').height); // Get the height of the screen
    const [E_Width, setE_Width] = useState(Dimensions.get('window').width); // Get the width of the screen
    const svgChartRef = useRef<any>(null);

    // Jump back to the home page
    const onBackButtonPress = async () => {
        // Change the screen orientation to portrait mode
        const currentOrientation = await ScreenOrientation.getOrientationAsync();
        if (currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
        // Jump to the home page
        router.push('/');
    }

    // Change the width and height of the screen, when portrait / landscape mode is switched
    const onDimensionsChange = () => {
        setE_Height(E_Width);
        setE_Width(E_Height);
    }
    
    // Change the screen orientation
    const changeScreenOrientation = async () => {
        const currentOrientation = await ScreenOrientation.getOrientationAsync();
        onDimensionsChange(); // Change the width and height of the screen
        if (currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            setIsScreenLandscape(false);
            return;
        }
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        setIsScreenLandscape(true);
    }

    // Initialize the chart data
    const InitializeChartData = () => {
        const calculatedData = {
            legend: {},
            series: [],
        }
        // get all products
        const products = getAllProducts();
        // getTheNameList of selected products
        const NameList = getSelectedProductsNameList();
        // get selected products by filter products[] according to the NameList
        const selectedProducts = products.filter(
            (product: newProduct) => NameList.includes(product.productName)
        );
        // get option.legend.data from NameList's elements' productName
        calculatedData.legend["data"] = selectedProducts.map(
            (product: newProduct) => product.productName
        );
        // get option.series from NameList's elements' 
        calculatedData.series = selectedProducts.map(
            (product: newProduct) => {
                const { productName, productPrice, unitConsumableTime, unitConsumablePrice, broughtInConsumableNum } = product;
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
                // first - seventh year
                let costFirstYear = 0, costSecondYear = 0, costThirdYear = 0, costFourthYear = 0, costFifthYear = 0, costSixthYear = 0, costSeventhYear = 0;
                costFirstYear = calculateCostOnYear(1);
                costSecondYear = calculateCostOnYear(2);   
                costThirdYear = calculateCostOnYear(3);
                costFourthYear = calculateCostOnYear(4);
                costFifthYear = calculateCostOnYear(5);
                costSixthYear = calculateCostOnYear(6);
                costSeventhYear = calculateCostOnYear(7);
                const Cost = [costFirstYear, costSecondYear, costThirdYear, costFourthYear, costFifthYear, costSixthYear, costSeventhYear];
                return {
                    name: productName,
                    data: Cost,
                    type: 'line',
                }
            }
        );
        return calculatedData; 
    }

    useEffect(() => {
        const calculatedData = InitializeChartData();

        const option = {
            xAxis: {
                name: '年',
                type: 'category',   
                data: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'],
            },
            yAxis: {
                name: '价格',
                type: 'value',
            },
            legend: calculatedData.legend || { // Add this section for the legend
                data: ['First Line', 'Second Line'], // Names for the legend
            },
            series: calculatedData.series || [
                {
                    name: 'First Line', // Name for the first line
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line',
                },
                {
                    name: 'Second Line', // Name for the second line
                    data: [180, 210, 200, 190, 170, 160, 220],
                    type: 'line',
                },
            ],
        };
        let chart: any;
        if (svgChartRef.current) {
            chart = echarts.init(svgChartRef.current, 'light', {
                renderer: 'svg',
                width: E_Width,
                height: E_Height-100,
            });
            chart.setOption(option);
        }
        return () => chart?.dispose();
    }, [E_Width, E_Height]);

    return (
        <View style={styles.container}>
            <TopHeadingText>数据对比</TopHeadingText>
            <View style={styles.chartContainer}>
                <SvgChart ref={svgChartRef} />
            </View>
            { isScreenLandscape ?
                <CCWRotateRoundedButton onPressAction={() => { changeScreenOrientation() }} /> :
                <CWRotateRoundedButton onPressAction={() => { changeScreenOrientation() }} />
            }
            <BackRoundedButton onPressAction={() => { onBackButtonPress() }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0, // Avoid content being hidden by status bar
        paddingHorizontal: 10,
        flex: 1,
    },
    chartContainer: {
        // paddingVertical: 20,
    },
})
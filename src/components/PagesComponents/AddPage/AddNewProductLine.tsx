import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Input } from 'tamagui';

type AddNewProductLineProps = {
    lineKey: string,
}

export default function AddNewProductLine({lineKey} : AddNewProductLineProps) {
    const [lineValue, setLineValue] = useState('');
    const onLineValueChange = (value: string) => {
        setLineValue(value);
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.lineKeyText}>{lineKey}:</Text>
            </View>
            <View style={styles.rightContainer}>
                <Input 
                    style={styles.inputValueText}
                    placeholder={lineKey}
                    value={lineValue}
                    onChangeText={onLineValueChange}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 16,
    },
    leftContainer: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 5,
    },
    lineKeyText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    rightContainer: {
        width: '60%',
        paddingLeft: 10,
    },
    inputValueText: {
        height: 40,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
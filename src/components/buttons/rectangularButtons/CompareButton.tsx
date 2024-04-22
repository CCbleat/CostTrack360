import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'tamagui';

export function CompareButton({onPressAction} : {onPressAction: () => void}) {
  return (
    <Button
        style={[styles.buttonBasic, styles.buttonPosition]}
        size="$3"
        onPress={() => {onPressAction()}}
        fontSize={16}
        fontStyle='italic'
        fontWeight='bold'
    >
        对比数据
    </Button>
  )
}

const styles = StyleSheet.create({
    buttonBasic: {
      paddingHorizontal: 12,
    },
    buttonPosition: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 40,
    },
})
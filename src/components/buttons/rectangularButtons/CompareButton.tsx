import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'tamagui';

export default function CompareButton({onPressAction} : {onPressAction: () => void}) {
  return (
    <Button
        size="$3"
        onPress={() => {onPressAction()}}
    >
        对比数据
    </Button>
  )
}

const styles = StyleSheet.create({})
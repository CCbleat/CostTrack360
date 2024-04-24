import React from 'react';
import { StyleSheet } from 'react-native';
import { RotateCcw } from '@tamagui/lucide-icons'
import { RoundedButton } from './RoundedButton';

export function CCWRotateRoundedButton({ onPressAction } : { onPressAction: () => void }) {
  return (
    <RoundedButton
        position={styles.buttonPosition}
        icon={<RotateCcw size={24} />}
        onPress={() => { onPressAction() }}
    />
  )
}

const styles = StyleSheet.create({
    buttonPosition: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    }
})
import React from 'react';
import { StyleSheet } from 'react-native';
import { RotateCw } from '@tamagui/lucide-icons'
import { RoundedButton } from './RoundedButton';

export function CWRotateRoundedButton({ onPressAction } : { onPressAction: () => void }) {
  return (
    <RoundedButton
        position={styles.buttonPosition}
        icon={<RotateCw size={24} />}
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
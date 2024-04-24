import React from 'react';
import { StyleSheet } from 'react-native';
import { Trash2 } from '@tamagui/lucide-icons'
import { RoundedButton } from './RoundedButton';

export function DeleteRoundedButton({ onPressAction } : { onPressAction: () => void }) {
  return (
    <RoundedButton
        position={styles.buttonPosition}
        icon={<Trash2 size={24} />}
        onPress={() => {onPressAction()}}
    />
  )
}

const styles = StyleSheet.create({
    buttonPosition: {
        position: 'absolute',
        bottom: 68,
        right: 20,
    }
})
import React from 'react';
import { StyleSheet } from 'react-native';
import { Edit3 } from '@tamagui/lucide-icons'
import { RoundedButton } from './RoundedButton';

export function EditRoundedButton (
  { onPressAction } : 
  { onPressAction: () => void }
) {
  return (
    <RoundedButton
        position={styles.buttonPosition}
        icon={<Edit3 size={24} />}
        onPress={() => {onPressAction()}}
    />
  )
}

const styles = StyleSheet.create({
    buttonPosition: {
        position: 'absolute',
        bottom: 118,
        right: 20,
    }
})
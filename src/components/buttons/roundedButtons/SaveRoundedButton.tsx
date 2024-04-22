import React from 'react';
import { StyleSheet } from 'react-native';
import { Save } from '@tamagui/lucide-icons'
import { RoundedButton } from './RoundedButton';

export function SaveRoundedButton({onPressAction} : {onPressAction: () => void}) {
  return (
    <RoundedButton
        position={styles.buttonPosition}
        icon={<Save size={24} />}
        onPress={() => {onPressAction()}}
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
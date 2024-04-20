import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'tamagui'; 

type RoundedButtonProps = {
  icon?: any;
  position?: any;
  text?: string;
  onPress: () => void;
}

export default function RoundedButton({ icon, position, text, onPress} : RoundedButtonProps) {
  return (
    <Button
      circular
      icon={icon}
      onPress={onPress}
      style={[styles.buttonBasic, position]}
    >
      {text}
    </Button>
  )
}

const styles = StyleSheet.create({
  buttonBasic: {
    width: 40,
    height: 40,
  },
})
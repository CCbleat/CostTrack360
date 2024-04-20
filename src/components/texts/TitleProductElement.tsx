import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'tamagui';

export default function TitleProductElement({children: title}: {children: string}) {
  return (
    <Text style={styles.titleProductElement}>{title}</Text>
  )
}

const styles = StyleSheet.create({
    titleProductElement: {
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic',
    }
})
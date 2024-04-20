import React from 'react';
import { StyleSheet} from 'react-native';
import { Text } from 'tamagui';

export default function TopHeading({children: title}: {children: string}) {
  return (
      <Text style={styles.topHeading}>{title}</Text>
  )
}

const styles = StyleSheet.create({
    topHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
    }
})
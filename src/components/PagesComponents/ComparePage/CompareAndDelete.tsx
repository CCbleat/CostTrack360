import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CompareButton from '../../buttons/rectangularButtons/CompareButton';
import DeleteRoundedButton from '../../buttons/roundedButtons/DeleteRoundedButton';

export default function CompareAndDelete() {
  return (
    <View>
        <CompareButton onPressAction={() => {}} />
        <DeleteRoundedButton onPressAction={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({})
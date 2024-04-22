import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CompareButton } from '../../buttons/rectangularButtons/CompareButton';
import { DeleteRoundedButton, EditRoundedButton } from '../../buttons/roundedButtons/index';

export function CompareEditDelete() {
  return (
    <View>
        <EditRoundedButton onPressAction={() => {}} />
        <DeleteRoundedButton onPressAction={() => {}} />
        <CompareButton onPressAction={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({})
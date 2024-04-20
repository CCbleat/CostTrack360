import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Check } from '@tamagui/lucide-icons';
import { Checkbox } from 'tamagui';

export default function ProductElementChecker({Checked: checked}: {Checked: boolean}) {
  return (
    <Checkbox size="$4" checked={checked}>
        <Checkbox.Indicator>
            <Check />
        </Checkbox.Indicator>
    </Checkbox>
  )
}

const styles = StyleSheet.create({})
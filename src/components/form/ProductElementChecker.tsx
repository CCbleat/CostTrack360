import React from 'react';
import { StyleSheet } from 'react-native';
import { Check } from '@tamagui/lucide-icons';
import { Checkbox } from 'tamagui';

export default function ProductElementChecker(
  // {Checked: checked}: {Checked: boolean}
  { modifyNumSelectedProduct } :
  { modifyNumSelectedProduct : {
    increment: () => void;
    decrement: () => void;
  }}
) {

  const onCheckedChange = (checked: boolean) => {
    if (checked) {
      modifyNumSelectedProduct.increment();
    } else {
      modifyNumSelectedProduct.decrement();
    }
  }

  return (
    <Checkbox size="$4" 
      // checked={checked}
      onCheckedChange={onCheckedChange}
    >
        <Checkbox.Indicator>
            <Check />
        </Checkbox.Indicator>
    </Checkbox>
  )
}

const styles = StyleSheet.create({})
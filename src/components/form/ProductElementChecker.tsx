import React from 'react';
import { StyleSheet } from 'react-native';
import { Check } from '@tamagui/lucide-icons';
import { Checkbox } from 'tamagui';

export default function ProductElementChecker(
  // {Checked: checked}: {Checked: boolean}
  { ProductTitle, modifySelectedProductsNameList } :
  
  { ProductTitle: string } & { modifySelectedProductsNameList: {
    add: (productName: string) => void;
    remove: (productName: string) => void;
  }}
) {

  const onCheckedChange = (checked: boolean) => {
    // modify selected products name list according to the checked status
    if (checked) {
      modifySelectedProductsNameList.add(ProductTitle);
    } else {
      modifySelectedProductsNameList.remove(ProductTitle);
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
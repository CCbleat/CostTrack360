import React from 'react';
import { View } from 'react-native';
import { CompareButton } from '../../buttons/rectangularButtons/CompareButton';
import { DeleteRoundedButton, EditRoundedButton } from '../../buttons/roundedButtons/index';
import { deleteProduct, storeSelectedProductName } from '../../../tools/SecureStore';
import { router } from 'expo-router';

const deleteSelectedProducts = (selectedProductsNameList: string[]) => {
  // delete selected products
  selectedProductsNameList.forEach((productName) => {
    deleteProduct(productName);
  })
}

export function CompareEditDelete(
  { selectedProductsNameList }: {selectedProductsNameList: string[]}
) {
  const onPressEditBtnAction = () => {
    // store the selected product name to secure store
    if (selectedProductsNameList.length === 1) {
      const selectedProductName = selectedProductsNameList[0];
      storeSelectedProductName(selectedProductName);
      // Jump to editPage
      router.push('/editPage');
    }
  }

  return (
    <View>
        { 
          selectedProductsNameList.length === 1 && 
          <EditRoundedButton
            onPressAction={() => {
              onPressEditBtnAction();
            }}
          /> 
        }
        <DeleteRoundedButton onPressAction={() => {
          deleteSelectedProducts(selectedProductsNameList);
        }} />
        <CompareButton onPressAction={() => {}} />
    </View>
  )
}
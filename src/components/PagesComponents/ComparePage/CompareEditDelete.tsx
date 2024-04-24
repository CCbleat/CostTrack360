import React from 'react';
import { View } from 'react-native';
import { CompareButton } from '../../buttons/rectangularButtons/CompareButton';
import { DeleteRoundedButton, EditRoundedButton } from '../../buttons/roundedButtons/index';
import { deleteProduct, storeSelectedProductName, storeSelectedProductsNameList } from '../../../tools/SecureStore';
import { router } from 'expo-router';
import { showToast } from '../../toasts/OperationStatusIndicator';

// delete selected products
const onPressDeleteBtnAction = (selectedProductsNameList: string[]) => {
  // delete selected products
  selectedProductsNameList.forEach((productName) => {
    deleteProduct(productName);
  })
  // refresh the page
  router.push('/');
  showToast('产品删除成功');
}

export function CompareEditDelete(
  { selectedProductsNameList }: {selectedProductsNameList: string[]}
) {
  // edit selected product
  const onPressEditBtnAction = () => {
    // store the selected product name to secure store (one product only)
    if (selectedProductsNameList.length === 1) {
      const selectedProductName = selectedProductsNameList[0];
      storeSelectedProductName(selectedProductName);
      // Jump to editPage
      router.push('/editPage');
    }
  }

  // Illustrate selected products' data on comparePage
  const onPressCompareBtnAction = (selectedProductsNameList: string[]) => {
    // store the selected products name to secure store (one or more products)
    storeSelectedProductsNameList(selectedProductsNameList);
    // Jump to comparePage
    router.push('/comparePage');
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
          onPressDeleteBtnAction(selectedProductsNameList);
        }} />
        <CompareButton onPressAction={() => {
          onPressCompareBtnAction(selectedProductsNameList);
        }} />
    </View>
  )
}
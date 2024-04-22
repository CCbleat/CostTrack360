export type newProduct = {
    productName: string; // 产品名
    currencySign: string; // 货币符号
    unitConsumableTime: number; // 单位耗材可使用时间
    unitConsumablePrice: number; // 单位耗材价格
    estimatedProductTime: number; // 预计产品使用时间
    broughtInConsumableNum: number; // 自带耗材数量
}

export type AddNewProductLineProps = {
    lineKey: string;
    lineState: any; // useState()[0]
    setLineState: any; // useState()[1]
}
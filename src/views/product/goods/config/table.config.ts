export const tableConfig = {
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '120' },
    { prop: 'oldPrice', label: '原价', minWidth: '70', slotName: 'oldPrice' },
    {
      prop: 'newPrice',
      label: '最新价格',
      minWidth: '90',
      slotName: 'newPrice'
    },
    { prop: 'desc', label: '商品描述', minWidth: '150' },
    { prop: 'status', label: '状态', minWidth: '70', slotName: 'status' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'imgUrl' },
    {
      prop: 'inventoryCount',
      label: '商品库存',
      minWidth: '90'
    },
    {
      prop: 'saleCount',
      label: '已售数量',
      minWidth: '90'
    },
    { prop: 'address', label: '发货地', minWidth: '80' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  showSelectionColumn: true
};

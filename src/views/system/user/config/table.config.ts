export const tableConfig = {
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '姓名', minWidth: '100' },
    { prop: 'cellphone', label: '联系方式', minWidth: '150' },
    { prop: 'enable', label: '状态', minWidth: '80', slotName: 'status' },
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
  showSelectionColumn: true,
  addBtnText: '新增用户'
};

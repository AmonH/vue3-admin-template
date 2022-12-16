export const tableConfig = {
  propList: [
    { prop: 'name', label: '角色名称', minWidth: '100' },
    { prop: 'intro', label: '角色描述', minWidth: '150' },
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
  addBtnText: '新增角色'
};

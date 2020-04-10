const normalPost = [
  {
    value: 0,
    label: '业务员'
  }, {
    value: 1,
    label: '部门经理'
  }
]

export default {
  postDepartmentOption: [
    {
      value: 0,
      label: '生产',
      children: normalPost
    }, {
      value: 1,
      label: '营销',
      children: normalPost
    }, {
      value:2,
      label: '管理',
      children: [
        {
          value: 0,
          label: '系统管理员'
        }
      ]
    }
  ]
}
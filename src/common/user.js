const normalPost = [
  {
    value: '业务员',
    label: '业务员'
  }, {
    value: '部门经理',
    label: '部门经理'
  }
]

export default {
  postDepartmentOption: [
    {
      value: '生产',
      label: '生产',
      children: normalPost
    }, {
      value: '营销',
      label: '营销',
      children: normalPost
    }, {
      value: '财务',
      label: '财务',
      children: [
        {
          value: '会计',
          label: '会计'
        }
      ]
    }, {
      value: '管理',
      label: '管理',
      children: [
        {
          value: '系统管理员',
          label: '系统管理员'
        }
      ]
    }
  ]
}
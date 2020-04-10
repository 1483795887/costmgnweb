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
  ], getDepartment(no) {
    return this.postDepartmentOption[no].label;
  }, getPost(no) {
    switch (no) {
      case 0:
        return '业务员';
      case 1:
        return "部门经理";
      case 2:
        return "系统管理员";
    }
  }
}
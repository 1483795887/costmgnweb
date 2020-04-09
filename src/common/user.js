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
      value: '管理',
      label: '管理',
      children: [
        {
          value: '系统管理员',
          label: '系统管理员'
        }
      ]
    }
  ], getDepartment(no) {
    return this.postDepartmentOption[no].value;
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
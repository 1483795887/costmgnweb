const user1 = {
  id: 1,
  userid: "2020030001",
  name: '张三',
  department: '生产',
  post: '业务员'
}

const user2 = {
  id: 2,
  userid: "2020030002",
  name: '李四',
  department: '生产',
  post: '部门经理'
}

const user3 = {
  id: 3,
  userid: "2020030003",
  name: '王五',
  department: '管理',
  post: '系统管理员'
}

const user4 = {
  id: 4,
  userid: "2020030004",
  name: '赵六',
  department: '财务',
  post: '会计'
}

const users = [
  user1, user2, user3, user4
]


export default {
  getUsers() {
    return users;
  }, addUser(user) {
    console.log(user);
  }
}
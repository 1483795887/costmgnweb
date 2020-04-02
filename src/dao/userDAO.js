const user1 = {
  id: 1,
  userid: "20200300001",
  name: '张三',
  department: '生产',
  post: '业务员'
}

const user2 = {
  id: 2,
  userid: "20200300002",
  name: '李四',
  department: '生产',
  post: '部门经理'
}

const user3 = {
  id: 3,
  userid: "20200300003",
  name: '王五',
  department: '管理',
  post: '系统管理员'
}

const user4 = {
  id: 4,
  userid: "20200300004",
  name: '赵六',
  department: '财务',
  post: '会计'
}

const users = [
  user1, user2, user3, user4
]

import post from '../common/post'

export default {
  getUsers() {
    return users;
  }, addUser(user, callback) {
    post('/api/user/addUser', user, callback);
  }, login(userid, password,callback) {
    post('/api/user/login',{userid:userid,password:password},callback);
  }
}
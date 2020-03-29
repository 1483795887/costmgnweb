import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../layout/MainLayout.vue'
import UpdatePassword from '../pages/user/UpdatePassword'
import Login from '../pages/login/Login'
import WorkCur from '../pages/main/WorkCur'
import WorkToDo from '../pages/main/WorkToDo'
import PlanManage from '../pages/plan/PlanManage'
import PlanView from '../pages/plan/PlanView'
import PlanAudit from '../pages/plan/PlanAudit'
import PlanForm from '../pages/plan/PlanForm'
import PlanInfo from '../pages/plan/PlanInfo'
import ContractManage from '../pages/contract/ContractManage'
import ContractView from '../pages/contract/ContractView'
import ContractAudit from '../pages/contract/ContractAudit'
import ContractForm from '../pages/contract/ContractForm'
import ContractInfo from '../pages/contract/ContractInfo'
import PageView from '../layout/PageView'
import WelcomeView from '../layout/WelcomeView'

import UserList from '../pages/user/UserList'
import UserAdd from '../pages/user/UserAdd'

import Result404 from '../pages/results/404'

Vue.use(VueRouter);

const router =  new VueRouter({
  mode: 'history',
  base: __dirname,
  linkActiveClass: "active",
  routes: [
    {
      name: '登录页',
      path: '/login',
      component: Login
    }, {
      name: 'Main',
      path: '/',
      redirect: '/login',
      component: Main,
      children: [
        {
          path: '/work',
          name: '主页',
          redirect: '/work/workCur',
          component: WelcomeView,
          children: [
            {
              path: '/work/workCur',
              name: '当前事务',
              component: WorkCur
            }, {
              path: '/work/workToDo',
              name: '待办事务',
              component: WorkToDo
            }
          ]
        }, {
          path: '/user',
          name: 'user',
          component: PageView,
          children: [
            {
              path: '/user/changePassword',
              name: '修改密码',
              component: UpdatePassword
            }, {
              path: '/user/userList',
              name: '员工列表',
              component: UserList
            }, {
              path: '/user/userAdd',
              name: '增加员工',
              component: UserAdd
            }
          ]
        }, {
          path: '/plan',
          name: '方案',
          component: PageView,
          children: [
            {
              path: '/plan/planManage',
              name: '方案维护',
              component: PlanManage
            }, {
              path: '/plan/planAudit',
              name: '方案审计',
              component: PlanAudit
            }, {
              path: '/plan/planView',
              name: '查看方案',
              component: PlanView
            }, {
              path: '/plan/planForm/:id',
              name: '方案表格',
              component: PlanForm
            }, {
              path: '/plan/planAdd',
              name: '新增方案',
              component: PlanForm
            }, {
              path: '/plan/planInfo/:id',
              name: '方案详情',
              component: PlanInfo
            }, {
              path: '/plan/planAdd',
              name: '新增合同',
              component: PlanForm
            }
          ]
        }, {
          path: '/contract',
          name: '合同',
          component: PageView,
          children: [
            {
              path: '/contract/contractManage',
              name: '合同维护',
              component: ContractManage
            }, {
              path: '/contract/contractAudit',
              name: '合同审计',
              component: ContractAudit
            }, {
              path: '/contract/contractView',
              name: '查看合同',
              component: ContractView
            }, {
              path: '/contract/contractForm/:id',
              name: '合同表格',
              component: ContractForm
            }, {
              path: '/contract/contractInfo/:id',
              name: '合同详情',
              component: ContractInfo
            }
          ]
        }
      ]
    }, {
      path: "/error/404",
      name: "404",
      component: Result404
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.matched.length!=0){
    next();
  }else{
    next({name:'404'})
  }
})

export default router;
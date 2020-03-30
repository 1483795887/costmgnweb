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

import BudgetManage from '../pages/budget/BudgetManage'
import BudgetView from '../pages/budget/BudgetView'
import BudgetAudit from '../pages/budget/BudgetAudit'
import BudgetForm from '../pages/budget/BudgetForm'
import BudgetCost from '../pages/budget/BudgetCost'
import BudgetOccupy from '../pages/budget/BudgetOccupy'

import CostView from '../pages/cost/CostView'
import CostForm from '../pages/cost/CostForm'
import CostAudit from '../pages/cost/CostAudit'
import CostPay from '../pages/cost/CostPay'

import UserList from '../pages/user/UserList'
import UserAdd from '../pages/user/UserAdd'

import Result404 from '../pages/results/404'

Vue.use(VueRouter);

const router = new VueRouter({
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
              path: '/plan/planInfo/:id',
              name: '方案详情',
              component: PlanInfo
            }, {
              path: '/plan/planAdd',
              name: '新增方案',
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
            }, {
              path: '/contract/contractAdd',
              name: '新增合同',
              component: ContractForm
            }
          ]
        }, {
          path: '/budget',
          name: '预算',
          component: PageView,
          children: [
            {
              path: '/budget/budgetManage',
              name: '预算维护',
              component: BudgetManage
            }, {
              path: '/budget/budgetAudit',
              name: '预算审计',
              component: BudgetAudit
            }, {
              path: '/budget/budgetView',
              name: '查看预算',
              component: BudgetView
            }, {
              path: '/budget/budgetForm/:id',
              name: '预算表格',
              component: BudgetForm
            }, {
              path: '/budget/budgetAdd',
              name: '新增预算',
              component: BudgetForm
            }, {
              path: '/budget/budgetCost/:id',
              name: '预算费用',
              component: BudgetCost
            }, {
              path: '/budget/budgetOccupy',
              name: '预算占用',
              component: BudgetOccupy
            }
          ]
        }, {
          path: '/cost',
          name: '费用',
          component: PageView,
          children: [
            {
              path: '/cost/costView',
              name: '费用列表',
              component: CostView
            }, {
              path: '/cost/costAdd',
              name: '报销',
              component: CostForm
            }, {
              path: '/cost/costAudit',
              name: '费用审计',
              component: CostAudit
            }, {
              path: '/cost/costPay',
              name: '费用支付',
              component: CostPay
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

router.beforeEach((to, from, next) => {
  if (to.matched.length != 0) {
    next();
  } else {
    next({ name: '404' })
  }
})

export default router;
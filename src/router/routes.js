import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../layout/MainLayout.vue'
import UpdatePassword from '../pages/user/UpdatePassword'
import Login from '../pages/login/Login'
import WorkCur from '../pages/main/WorkCur'
import WorkToDo from '../pages/main/WorkToDo'
import PlanManage from '../pages/plan/PlanManage'
import PlanView from '../pages/plan/PlanView'
import PlanInfo from '../pages/plan/PlanInfo'
import PlanAudit from '../pages/plan/PlanAudit'
import PlanAdd from '../pages/plan/PlanAdd'
import PlanUpdate from '../pages/plan/PlanUpdate'
import ContractManage from '../pages/contract/ContractManage'
import ContractView from '../pages/contract/ContractView'
import ContractAudit from '../pages/contract/ContractAudit'
import ContractAdd from '../pages/contract/ContractAdd'
import ContractUpdate from '../pages/contract/ContractUpdate'
import ContractInfo from '../pages/contract/ContractInfo'
import PageView from '../layout/PageView'
import WelcomeView from '../layout/WelcomeView'

import BudgetManage from '../pages/budget/BudgetManage'
import BudgetView from '../pages/budget/BudgetView'
import BudgetAudit from '../pages/budget/BudgetAudit'
import BudgetAdd from '../pages/budget/BudgetAdd'
import BudgetUpdate from '../pages/budget/BudgetUpdate'
import BudgetCost from '../pages/budget/BudgetCost'
import BudgetOccupy from '../pages/budget/BudgetOccupy'

import CostView from '../pages/cost/CostView'
import CostAdd from '../pages/cost/CostAdd'
import CostUpdate from '../pages/cost/CostUpdate'
import CostAudit from '../pages/cost/CostAudit'
import CostManage from '../pages/cost/CostManage'

import UserList from '../pages/user/UserList'
import UserAdd from '../pages/user/UserAdd'

import Result404 from '../pages/results/404'
import NoPower from '../pages/results/noPower'
import Result500 from '../pages/results/500'

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
              meta: { post: [2] },
              path: '/user/userList',
              name: '员工列表',
              component: UserList
            }, {
              meta: { post: [2] },
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
              meta: { post: [0] },
              path: '/plan/planManage',
              name: '方案维护',
              component: PlanManage
            }, {
              meta: { post: [1] },
              path: '/plan/planAudit',
              name: '方案审计',
              component: PlanAudit
            }, {
              path: '/plan/planView',
              name: '查看方案',
              component: PlanView
            }, {
              meta: { post: [0] },
              path: '/plan/planUpdate/:id',
              name: '方案更新',
              component: PlanUpdate
            }, {
              path: '/plan/planInfo/:id',
              name: '方案详情',
              component: PlanInfo
            }, {
              meta: { post: [0] },
              path: '/plan/planAdd',
              name: '方案新增',
              component: PlanAdd
            }
          ]
        }, {
          path: '/contract',
          name: '合同',
          component: PageView,
          children: [
            {
              meta: { post: [0] },
              path: '/contract/contractManage',
              name: '合同维护',
              component: ContractManage
            }, {
              meta: { post: [1] },
              path: '/contract/contractAudit',
              name: '合同审计',
              component: ContractAudit
            }, {
              path: '/contract/contractView',
              name: '查看合同',
              component: ContractView
            }, {
              meta: { post: [0] },
              path: '/contract/contractUpdate:id',
              name: '合同更新',
              component: ContractUpdate
            }, {
              path: '/contract/contractInfo/:id',
              name: '合同详情',
              component: ContractInfo
            }, {
              meta: { post: [0] },
              path: '/contract/contractAdd',
              name: '新增合同',
              component: ContractAdd
            }
          ]
        }, {
          path: '/budget',
          name: '预算',
          component: PageView,
          children: [
            {
              meta: { post: [1] },
              path: '/budget/budgetManage',
              name: '预算维护',
              component: BudgetManage
            }, {
              meta: { post: [2] },
              path: '/budget/budgetAudit',
              name: '预算审计',
              component: BudgetAudit
            }, {
              meta: { post: [1, 2] },
              path: '/budget/budgetView',
              name: '查看预算',
              component: BudgetView
            }, {
              meta: { post: [1] },
              path: '/budget/budgetUpdate/:id',
              name: '预算更新',
              component: BudgetUpdate
            }, {
              meta: { post: [1] },
              path: '/budget/budgetAdd',
              name: '新增预算',
              component: BudgetAdd
            }, {
              meta: { post: [1, 2] },
              path: '/budget/budgetCost/:id',
              name: '预算费用',
              component: BudgetCost
            }, {
              meta: { post: [1] },
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
              name: '查看费用',
              component: CostView
            }, {
              meta: { post: [1] },
              path: '/cost/costAudit',
              name: '费用审计',
              component: CostAudit
            }, {
              meta: { post: [0] },
              path: '/cost/costManage',
              name: '费用维护',
              component: CostManage
            }, {
              pmeta: { post: [0] },
              path: '/cost/costCostAdd/:id',
              name: '费用更新',
              component: CostUpdate
            }, {
              meta: { post: [0] },
              path: '/cost/costAdd',
              name: '新增费用',
              component: CostAdd
            }
          ]
        }
      ]
    }, {
      path: "/error/404",
      name: "404",
      component: Result404
    }, {
      path: "/error/noPower",
      name: "noPower",
      component: NoPower
    }, {
      path: "/error/500",
      name: "500",
      component: Result500
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = JSON.parse(sessionStorage.getItem("user"));
  if (to.path == '/login') {
    if (user) {
      next({ name: '主页' })
    } else {
      next();
    }
  } else {
    if (!user) {
      next({ name: '登录页' })
    } else {
      if (to.matched.length != 0) {
        //next();
        if (to.meta.post != null && to.meta.post.indexOf(user.post) == -1) {
          next({ name: 'noPower' });
        } else {
          next();
        }
      } else {
        next({ name: '404' })
      }
    }

  }

})

export default router;
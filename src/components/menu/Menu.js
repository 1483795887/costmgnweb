const commonMenuItem = {
    name: 'work',
    icon: 'home',
    title: '工作',
    children: [
        {
            name: 'workCur',
            to: '当前事务',
            title: "事务状态"
        }, {
            name: 'workToDo',
            to: '待办事务',
            title: "待办事务"
        }
    ]
}


export default {
    SalesmanMenu: [
        commonMenuItem, {
            name: 'plan',
            icon: 'bulb',
            title: '方案',
            children: [
                {
                    name: 'planManage',
                    to: '方案维护',
                    title: '方案维护'
                }, {
                    name: 'planView',
                    to: '查看方案',
                    title: '查看方案'
                }
            ]
        }, {
            name: 'contract',
            icon: 'solution',
            title: '合同',
            children: [
                {
                    name: 'contractManage',
                    to: '合同维护',
                    title: '合同维护'
                }, {
                    name: 'contractView',
                    to: '查看合同',
                    title: '查看合同'
                }
            ]
        }, {
            name: 'cost',
            icon: 'transaction',
            title: '费用',
            children: [
                {
                    name: 'costManage',
                    to: '费用维护',
                    title: '费用维护'
                }, {
                    name: 'costView',
                    to: '查看费用',
                    title: '查看费用'
                }
            ]
        }
    ], DepartmentManagerMenu: [
        commonMenuItem, {
            name: 'plan',
            icon: 'bulb',
            title: '方案',
            children: [
                {
                    name: 'planAudit',
                    to: '方案审计',
                    title: '方案审计'
                }, {
                    name: 'planView',
                    to: '查看方案',
                    title: '查看方案'
                }
            ]
        }, {
            name: 'contract',
            icon: 'solution',
            title: '合同',
            children: [
                {
                    name: 'contractAudit',
                    to: '合同审计',
                    title: '合同审计'
                }, {
                    name: 'contractView',
                    to: '查看合同',
                    title: '查看合同'
                }
            ]
        }, {
            name: 'budget',
            icon: 'account-book',
            title: '预算',
            children: [
                {
                    name: 'budgetManage',
                    to: '预算维护',
                    title: '预算维护'
                }, {
                    name: 'budgetView',
                    to: '查看预算',
                    title: '查看预算'
                }
            ]
        }, {
            name: 'cost',
            icon: 'transaction',
            title: '费用',
            children: [
                {
                    name: 'costAudit',
                    to: '费用审计',
                    title: '费用审计'
                }, {
                    name: 'contractView',
                    to: '查看费用',
                    title: '查看费用'
                }
            ]
        }
    ], SystemManagerMenu: [
        commonMenuItem, {
            name: 'plan',
            icon: 'bulb',
            title: '方案',
            children: [
                {
                    name: 'planView',
                    to: '查看方案',
                    title: '查看方案'
                }
            ]
        }, {
            name: 'contract',
            icon: 'solution',
            title: '合同',
            children: [
                {
                    name: 'contractView',
                    to: '查看合同',
                    title: '查看合同'
                }
            ]
        }, {
            name: 'budget',
            icon: 'account-book',
            title: '预算',
            children: [
                {
                    name: 'budgetAudit',
                    to: '预算审计',
                    title: '预算审计'
                }, {
                    name: 'budgetView',
                    to: '查看预算',
                    title: '查看预算'
                }
            ]
        }, {
            name: 'cost',
            icon: 'transaction',
            title: '费用',
            children: [
                {
                    name: 'costAudit',
                    to: '费用审计',
                    title: '费用审计'
                }, {
                    name: 'contractView',
                    to: '查看费用',
                    title: '查看费用'
                }
            ]
        }, {
            name: 'user',
            icon: 'idcard',
            title: '员工管理',
            children: [
                {
                    name: 'userList',
                    to: '员工列表',
                    title: '员工列表'
                }
            ]
        }
    ], getMenu(user) {
        switch (user.post) {
            case 0:
                return this.SalesmanMenu;
            case 1:
                return this.DepartmentManagerMenu;
            case 2:
                return this.SystemManagerMenu;
        }
    }
}
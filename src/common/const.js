import UserData from "./user"

export default {
    getDepartment(no) {
        return UserData.postDepartmentOption[no].label;
    }, getPost(no) {
        switch (no) {
            case 0:
                return '业务员';
            case 1:
                return "部门经理";
            case 2:
                return "系统管理员";
        }
    }, getStatus(no) {
        switch (no) {
            case 0:
                return "未提交";
            case 1:
                return "未审核";
            case 2:
                return "未通过";
            case 3:
                return "被退回";
            case 4:
                return "已通过";
        }
    }, getType(no) {
        switch (no) {
            case 0:
                return "方案";
            case 1:
                return "合同";
            case 2:
                return "预算";
            case 3:
                return "费用";
        }
    }
}
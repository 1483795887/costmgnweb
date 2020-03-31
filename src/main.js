import {
  AutoComplete, Breadcrumb, Card,
  Checkbox, Form, Icon, Input, Menu, Select, Layout, Dropdown,
  Avatar, Button, Badge, Tooltip, PageHeader, Descriptions, List,
  Table, Alert, DatePicker, Result, Cascader, message
} from 'ant-design-vue';
import Vue from 'vue';
import App from './App.vue';
import router from './router/routes';
import store from './store/index';
import './components/table/table.css';
import './layout/page.css';

Vue.use(Form);
Vue.use(Input);
Vue.use(Card);
Vue.use(Icon);
Vue.use(Select);
Vue.use(AutoComplete);
Vue.use(Checkbox);
Vue.use(Menu);
Vue.use(Layout);
Vue.use(Breadcrumb);
Vue.use(Dropdown);
Vue.use(Avatar);
Vue.use(Button);
Vue.use(Badge);
Vue.use(Tooltip);
Vue.use(PageHeader);
Vue.use(Descriptions);
Vue.use(List);
Vue.use(Table);
Vue.use(Alert);
Vue.use(DatePicker);
Vue.use(Result);
Vue.use(Cascader);

Vue.prototype.$message = message;

message.config({
  duration: 2
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

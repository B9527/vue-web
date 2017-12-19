import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Home from '@/views/Home'
import Main from '@/views/Main'
import Upload from '@/views/upload'
import ImportTaskList from '@/views/ImportTaskList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: '数据导入',
      iconCls: 'el-icon-menu',//图标样式class
      children: [
          { path: '/upload', component: Upload, name: '上传文件' },
          { path: '/task_list', component: ImportTaskList, name: '任务列表' },
          {path: '/task_detail', component: ImportTaskList, name: '任务详细', hidden: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '数据清洗',
      iconCls: 'el-icon-setting',
      children: [
          { path: '/page4', component: Main, name: '上传文件' },
          { path: '/page5', component: Main, name: '清洗列表' }
      ]
    },
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
    }
  ]
})

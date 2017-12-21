import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Home from '@/views/Home'
import Main from '@/views/Main'
import Upload from '@/views/upload'
import ImportTaskList from '@/views/ImportTaskList'
import TaskDetail from '@/views/TaskDetail'
import cleanUpload from '@/views/cleanUpload'
import cleanTaskList from '@/views/cleanTaskList'
import cleanTaskDetail from '@/views/cleanTaskDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: '数据导入模块',
      iconCls: 'el-icon-menu',//图标样式class
      children: [
          { path: '/upload', component: Upload, name: '导入数据来源' },
          { path: '/task_list', component: ImportTaskList, name: '导入任务列表' },
          {path: '/task_detail', component: TaskDetail, name: '导入任务详细', hidden: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '数据清洗模块',
      iconCls: 'el-icon-setting',
      children: [
          { path: '/cleanUpload', component: cleanUpload, name: '上传清洗结构' },
          { path: '/cleanTaskList', component: cleanTaskList, name: '清洗任务列表' },
          { path: '/cleanTaskDetail', component: cleanTaskDetail, name: '清洗任务详情', hidden: true }
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

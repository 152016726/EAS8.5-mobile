import Vue from 'vue'
import Router from 'vue-router'
//注册路由
//导入login.vue组件对象
import home from '@/components/Home.vue';
//导入后台管理系统的整体布局组件
import question from '@/components/question.vue';

import goodsinfo from '@/components/goodsinfo.vue';

import car from '@/components/car.vue';

import shopping from '@/components/shopping.vue';

import goodschangeinput from '@/components/goodschangeinput.vue';

import order from '@/components/order.vue';

import login from '@/components/login.vue';

import pay from '@/components/pay.vue';

import paysuccess from '@/components/paysuccess.vue';

import vipcenter from '@/components/vipcenter.vue';

import viporderlist from '@/components/viporderlist.vue';

Vue.use(Router)

export default new Router({
    //routes构建路由
    routes: [
        { name: 'default', path: '/', redirect: '/home' },
        { name: 'home', path: '/home', component: home },
        { name: 'question', path: '/question', component: question },
        { name: 'goodsinfo', path: '/goodsinfo/:id', component: goodsinfo },
        { name: 'car', path: '/car', component: car },
        { name: 'login', path: '/login', component: login },
        { name: 'goodschangeinput', path: '/goodschangeinput', component: goodschangeinput },
        { name: 'shopping', path: '/shopping/:id', component: shopping, meta: { islogin: true } },
        { name: 'order', path: '/order/:id', component: order, meta: { islogin: true } },
        { name: 'pay', path: '/pay/:id', component: pay, meta: { islogin: true } },
        { name: 'paysuccess', path: '/paysuccess/:id', component: paysuccess, meta: { islogin: true } },
        { name: 'vipcenter', path: '/vipcenter', component: vipcenter, meta: { islogin: true } },
        { name: 'viporderlist', path: '/viporderlist', component: viporderlist, meta: { islogin: true } },

    ]
})
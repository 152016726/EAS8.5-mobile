// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
    vm
} from './kits/vm.js'
import vuex from 'vuex';

Vue.use(vuex);


var state = {
    //购物车中的数量
    goodsCount: 0
}

var actions = {
    changeBuyCount({ commit }, paramsCount) {
        commit('changeBuyCount', paramsCount);
    }
}

var mutations = {
    changeBuyCount(state, paramsCount) {
        state.goodsCount += paramsCount;
    }
}

import { getItem } from './kits/localStotagekits.js';

var getters = {
    getcount(state) {
        //然后显示添加了多少
        if (state.goodsCount > 0) {
            return state.goodsCount;
        }
        //系统刷新时，获取到购物车中有几种商品
        var item = getItem();
        var count = 0;
        for (var key in item) {
            count += item[key]
        }
        state.goodsCount = count;
        return state.goodsCount;
    }
}


var store = new vuex.Store({
    state,
    actions,
    mutations,
    getters
});

//引入axios 
import axios from 'axios';

// axios.defaults.baseURL = 'http://157.122.54.189:9095';
axios.defaults.baseURL = 'http://111.230.28.19:8899';

Vue.prototype.$http = axios;

//设定AXIOS的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;

Vue.use(axios);

// 利用router的全局守卫的钩子函数来进行登录判断
router.beforeEach((to, from, next) => {
    if (to.name != 'login') {
        var obj = { name: to.name, params: to.params.id }
        localStorage.setItem("routerName", JSON.stringify(obj));
        //合度是否登录控制layout头部
        axios.get('/site/account/islogin').then(res => {
            if (res.data.code == "logined") {
                vm.$emit('changeshow');
            }
        })
    }
    if (to.meta.islogin) {
        axios.get('/site/account/islogin').then(res => {
            if (res.data.code == "logined") {
                next();
            } else {
                router.push({ name: 'login' });
            }
        })
    } else {
        next();
    }
})

//引用elementUI 和elementUI的css样式
import elementUI from 'element-ui';
import '../static/site/css/style.css';
Vue.use(elementUI);

import mintui from 'mint-ui';

import 'mint-ui/lib/style.css';

Vue.use(mintui);

import '../static/mui/css/mui.css';
import '../static/mui/css/icons-extra.css';

Vue.filter("datefmt1", function(input, splitchar) {
    var input = new Date(input);
    var y = input.getFullYear();
    var m = input.getMonth() + 1;
    var d = input.getDate();
    var h = input.getHours();
    var mi = input.getMinutes();
    var s = input.getSeconds();
    if (splitchar == "YY-MM-DD hh:mm:ss") {
        return y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
    }
    if (splitchar == "YY-MM-DD") {
        return y + "-" + m + "-" + d;
    }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    //ES5的写法render:function(create){create(App)}
    render: create => create(App)
})

// template: '<App/>',
// components: { App }
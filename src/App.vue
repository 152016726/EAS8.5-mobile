<template>
  <div id="app">
      <!-- 1.0 利用mintui中的header组件实现一定顶部导航区 -->
        <mt-header id="mainheader" fixed title="EAS8.5金蝶云移动app">
                <mt-button class="login" slot="left">
                    <router-link to="/home">
                        <span class="mui-icon mui-icon-home"></span>
                        <span>主页</span>
                    </router-link>
                </mt-button>
                
                <mt-button v-if="statu" class="login" slot="right">
                    <router-link to="/login">
                    <span>登录</span>
                    </router-link>
                </mt-button>
            
            
                <mt-button v-if="statu" slot="right">
                    <router-link to="/logister">
                       <span>注册</span> 
                    </router-link>
                </mt-button>
            
             <mt-button v-if="!statu" class="login" slot="right">
                <router-link to="/vipcenter">
                    <span>会员中心</span>
                </router-link>
            </mt-button>
            <mt-button v-if="!statu" slot="right" @click="logout">退出</mt-button>
            <mt-button class="login1" slot="right">
                <router-link to="/car">
                    <a href="javascript:;"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount">{{this.$store.getters.getcount}}</span>)</a>
                </router-link>   
            </mt-button> 
        </mt-header>

        <!-- 2.0 占位 -->
        <router-view></router-view>

        <!-- 3.0 底部导航(mui中的导航) -->
        <nav class="mui-bar mui-bar-tab">
          <router-link to="/vipcenter" class="mui-tab-item">       
                <span class="mui-icon mui-icon-home"></span>
                
                <span class="mui-tab-label">个人中心</span>
            </router-link>
            <router-link to="/viporderlist" class="mui-tab-item">       
                <span class="mui-icon mui-icon-email">
                    <span class="mui-badge">19</span>
                </span>
                <span class="mui-tab-label">订单信息</span>
            </router-link>
            <router-link to="/phone" class="mui-tab-item">     
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">朋友圈</span>
            </router-link>
            <router-link to="/set" class="mui-tab-item">     
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </router-link>
        </nav>
  </div>
</template>

<script>
    import {
        vm,
        key
    } from './kits/vm.js';
    export default {
        data() {
            return {
                statu: true
            }
        },
        mounted() {
            // 监听 changeshow 这个事件
            vm.$on('changeshow', () => {
                    this.checklogin();
                })
                // 当页面重新刷新以后要去获取到localStorage中的这个登录状态，赋值给isvipshow
                // this.checklogin();
        },
        methods: {
            checklogin() {
                this.statu = false;
            },
            logout() {
                this.$http.get("/site/account/logout").then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    // this.$message.success(res.data.message);
                    this.statu = true;
                    this.$router.push({
                        name: 'login'
                    });
                })
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    
    .tmpl {
        margin-top: 45px;
        margin-bottom: 51px;
    }
    
    .router-link-active {
        color: #0094ff !important;
    }
    
    .login {
        margin-right: 2em;
    }
    
    .login1 {
        margin-left: 2em;
    }
    
    .login1 a {
        color: #fff;
    }
    
    #mainheader {
        background-color: #000;
        color: #fff;
    }
    
    #mainheader span {
        color: #fff;
    }
</style>
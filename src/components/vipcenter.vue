<template>
<div class="tmpl">
    <el-row class="center">
        <el-col :span="24" class="el-row">
            <div class="el-col el-col-24">
                <div class="comp">
                    <div class="tmpl routeanimate">
                        <mt-header id="mtheader">
                          <mt-button slot="left"> 当前位置：</mt-button>
                          <mt-button class="fenge" slot="left"><router-link to="/home"> <a href="#">>首页</a></router-link></mt-button>
                          <mt-button class="fenge" slot="left"> <a href="#">>会员中心</a></mt-button>
                        </mt-header>
                        <div class="section clearfix">
                            <div class="left-260">
                                <div class="bg-wrap">
                                    <div class="avatar-box">
                                        <a href="/user/center/avatar.html" class="img-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </a>
                                        <h3>ivanyb</h3>
                                        <router-link to="/admin/logister">
                                            <p>
                                                <b>注册会员</b>
                                            </p>
                                        </router-link>
                                    </div>
                                    <div class="center-nav">
                                        <ul>
                                            <li>
                                                <h2>
                                                    <i class="iconfont icon-order"></i>
                                                    <span>订单管理</span>
                                                </h2>
                                                <div class="list">
                                                  <router-link to="/viporderlist">
                                                    <p>
                                                        <a href="javascript:;" class="">
                                                            <i class="iconfont icon-arrow-right"></i>交易订单</a>
                                                    </p>
                                                  </router-link>
                                                </div>
                                            </li>
                                            <li>
                                                <h2>
                                                    <i class="iconfont icon-user"></i>
                                                    <span>账户管理</span>
                                                </h2>
                                                <div class="list">
                                                    <p>
                                                        <a href="#/site/member/center" class="router-link-exact-active ">
                                                            <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                    </p>
                                                    <p>
                                                        <a href="#/site/member/center" class="router-link-exact-active ">
                                                            <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                    </p>
                                                    <p>
                                                        <a href="#/site/member/center" class="router-link-exact-active ">
                                                            <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                    </p>
                                                    <p>
                                                        <a href="javascript:void(0)">
                                                            <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="right-auto">
                                <div class="bg-wrap" style="min-height: 765px;">
                                    <div class="sub-tit">
                                        <ul>
                                            <li class="selected">
                                                <a href="javascript:;">个人中心</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="center-head clearfix">
                                        <div class="img-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="list-box">
                                            <h3>欢迎您~ ivanyb</h3>
                                            <ul>
                                                <li>组别：注册会员</li>
                                                <li>手机：13987654321</li>
                                                <li>Email:ivanyb1@qq.com</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="center-info clearfix"></div>
                                    <div class="center-tit">
                                        <span>
                                            <a  href="/user/order-list.html">更多..</a>
                                        </span>
                                        <h3>
                                            <i class="iconfont icon-order"></i>我的订单</h3>
                                    </div>
                                    <div class="center-info clearfix">
                                        <ul>
                                            <li>已完成订单：0个</li>
                                            <li>待完成订单：2个</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {}
    }
</script>
<style scoped>
    #mtheader {
        background-color: #fff;
        color: #000;
    }
    
    #mtheader a {
        color: #2d8cf0;
    }
    
    .fenge {
        margin-left: 2em;
    }
</style>
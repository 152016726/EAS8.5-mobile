<template>
<div class="tmpl">
<el-row class="center">
    <el-col class="el-row">
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
                                    <p>
                                        <b>注册会员</b>
                                    </p>
                                </div>
                                <div class="center-nav">
                                    <ul>
                                        <li>
                                            <h2>
                                                <i class="iconfont icon-order"></i>
                                                <span>订单管理</span>
                                            </h2>
                                            <div class="list">
                                                <router-link to="/admin/viporderlist">
                                                    <p>
                                                        <a href="#/site/member/orderlist" class="router-link-exact-active ">
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
                                                    <a href="#/site/member/center" class="">
                                                        <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                </p>
                                                <p>
                                                    <a href="#/site/member/center" class="">
                                                        <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                </p>
                                                <p>
                                                    <a href="#/site/member/center" class="">
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
                                            <a href="/user/order-list.html">交易订单</a>
                                        </li>
                                    </ul> 
                                </div>
                                <div class="table-wrap">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                                        <tbody>
                                            <tr>
                                                <th width="16%" align="left">订单号</th>
                                                <th width="10%">姓名</th>
                                                <th width="12%">订单金额</th>
                                                <th width="11%">下单时间</th>
                                                <th width="10%">状态</th>
                                                <th width="12%">操作</th>
                                            </tr>
                                            <tr v-for="item in orderlist" :key="item.id">
                                                <td>{{item.order_no}}</td>
                                                <td align="left">{{item.accept_name}}</td>
                                                <td align="left">
                                                    <strong style="color: red;">￥{{item.order_amount}}</strong>
                                                    <br> {{item.paymentTitle}}
                                                </td>
                                                <td align="left">{{item.add_time|datefmt1("YY-MM-DD hh:mm:ss")}}</td>
                                                <td align="left">
                                                    {{item.statusName}}
                                                </td>
                                                <td align="left">
                                                    <router-link v-bind="{to:'/admin/orderdetail/'+item.id}">
                                                        <a href="#/site/member/orderinfo/12">查看订单</a>
                                                    </router-link>
                                                    <br>
                                                    <router-link v-bind="{to:'/admin/orderdetail/'+item.id}">
                                                        <a href="javascript:;" class="">|{{item.statusName}}</a>
                                                    </router-link>
                                                    <br>
                                                    <a href="javascript:void(0)" @click="delorder(item.id)">|取消</a>
                                                    <br>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                <!--放置页码-->
                                 <Page :current="pageIndex" @on-change="ChangePage" @on-page-size-change="ChangeSize" placement="top" :total="totalCount" :page-size="pageSize" size="small" show-elevator show-sizer></Page>
            <!--/放置页码-->
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
    import Page from '../../node_modules/iview/src/components/page';
    export default {
        components: {
            Page: Page
        },
        data() {
            return {
                list: [],
                orderlist: [],
                pageIndex: 1,
                pageSize: 10,
                totalCount: 0
            }
        },
        created() {
            this.getuserorderlist();
        },
        methods: {
            delorder(val) {
                this.$http.get("/site/validate/order/cancelorder/" + val).then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    this.$message.success(res.data.message);
                    this.getuserorderlist();
                })
            },
            ChangeSize(val) {
                this.pageSize = val;
                this.getuserorderlist();
            },
            ChangePage(val) {
                this.pageIndex = val;
                this.getuserorderlist();
            },
            getuserorderlist() {
                this.$http.get("/site/validate/order/userorderlist?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize + "").then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    this.list = res.data;
                    this.orderlist = res.data.message;
                    this.totalCount = res.data.totalcount;
                })
            }
        }
    }
</script>
<style scoped>
    div.el-input.el-pagination__editor.is-in-pagination {
        width: 50px;
        height: 22px;
        line-height: 22px;
    }
    
    .el-pagination__editor {
        padding: 0;
    }
    
    .el-pagination__jump div input {
        height: 100%;
    }
    
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
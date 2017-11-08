<template>
<div class="tmpl">
<mt-header id="mtheader">
       <mt-button slot="left"> 当前位置：</mt-button>
       <mt-button class="fenge" slot="left"><router-link to="/home"> <a href="#">>首页</a></router-link></mt-button>
       <mt-button class="fenge" slot="left"> <a href="#">>支付中心</a></mt-button>
</mt-header>

<el-row class="section">
    <el-col :span="24" class="wrapper">
        <div class="bg-wrap">
            <div class="nav-tit pay">
                <a href="javascript:;" class="selected">支付中心</a>
            </div>
            <div class="form-box payment">
                <div class="el-row" v-for="item in orderlist" :key="item.id">
                    <div class="el-col el-col-16">
                        <div class="el-row">
                            <div class="el-col el-col-12">
                                <dl class="form-group">
                                    <dt>订 单 号：</dt>
                                    <dd>{{item.order_no}}</dd>
                                </dl>
                            </div>
                            <div class="el-col el-col-12">
                                <dl class="form-group">
                                    <dt>收货人姓名：</dt>
                                    <dd>{{item.accept_name}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="el-row">
                            <div class="el-col el-col-12">
                                <dl class="form-group">
                                    <dt>送货地址：</dt>
                                    <dd>{{item.area}}
                                    </dd>
                                </dl>
                            </div>
                            <div class="el-col el-col-12">
                                <dl class="form-group">
                                    <dt>手机号码：</dt>
                                    <dd>{{item.mobile}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="el-row">
                            <div class="el-col el-col-12">
                                <dl class="form-group">
                                    <dt>支付金额：</dt>
                                    <dd>{{item.order_amount}} 元</dd>
                                </dl>
                            </div>
                            <div class="el-col el-col-12">
                                <dl class="form-group">
                                    <dt>支付方式：</dt>
                                    <dd>在线支付</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="message">
                            <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                            <span>{{item.message}}</span>
                        </div>
                    </div>
                    <div class="el-col el-col-8">
                            二维码图片
                          <div id="container">
                                 <canvas width="400" height="400"></canvas> 
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
    import '../../static/site/js/jqplugins/qr/jqueryqr.js';
    export default {
        data() {
            return {
                orderlist: [],
                timer: ""
            }
        },
        created() {
            this.getorderlist();
        },
        mounted() {
            this.geterweima();
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods: {
            getorderlist() {
                console.log(this.$route);
                this.$http.get("/site/validate/order/getorder/" + this.$route.params.id).then(res => {
                    if (res.data.status == 1) {
                        return this.$message.error(res.data.message);
                    }
                    this.orderlist = res.data.message;
                })
                this.timer = setInterval(() => {
                    this.$http.get("/site/validate/order/getorder/" + this.$route.params.id).then(res => {
                        if (res.data.message[0].status == 2) {
                            this.$router.push({
                                name: "paysuccess"
                            })
                        } else {
                            return;
                        }
                    })
                }, 5000)
            },
            geterweima() {
                var url = "/pay" + this.$route.params.id;
                $("#container").erweima({
                    label: 'jQuery'
                });
            }
        }
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
</style>
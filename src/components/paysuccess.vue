<template>
<div class="tmpl">
<el-row class="center">
    <el-col class="el-row">
        <div class="el-col el-col-24">
            <div class="comp">
                <div class="goodsinfo routeanimate">
                    <mt-header id="mtheader">
                      <mt-button slot="left"> 当前位置：</mt-button>
                      <mt-button class="fenge" slot="left"><router-link to="/home"> <a href="#">>首页</a></router-link></mt-button>
                      <mt-button class="fenge" slot="left"> <a href="#">>支付中心</a></mt-button>
                    </mt-header>
                    <div class="section">
                        <div class="wrapper">
                            <div class="bg-wrap">
                                <div class="nav-tit pay">
                                    <a href="javascript:;" class="selected">支付中心</a>
                                </div>
                                <div class="msg-tips">
                                    <div class="icon">
                                        <i class="iconfont icon-check"></i>
                                    </div>
                                    <div class="info">
                                        <strong>订单已支付成功！</strong>
                                        <p>您可以点击这里进入
                                            <a href="/user/center/index.html">会员中心</a>查看订单状态！</p>
                                        <p>如有其它问题，请立即与我们客服人员联系。</p>
                                    </div>
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
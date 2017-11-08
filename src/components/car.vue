<template>
<div class="tmpl">
    <mt-header id="mtheader">
       <mt-button slot="left"> 当前位置：</mt-button>
       
        <mt-button class="fenge" slot="left"> 
          <router-link to="/home">
            <a href="#">
            >首页</a>
          </router-link>
        </mt-button>
        <mt-button class="fenge" slot="left"> <a href="#">>购物车</a></mt-button>
       
    </mt-header>

    <el-row class="section">
        <el-col :span="24" class="wrapper">
            <div class="bg-wrap">
                <!--购物车头部-->
                <div class="cart-head clearfix">
                    <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                    <div class="cart-setp">
                        <ul>
                            <li class="first active">
                                <div class="progress">
                                    <span>1</span> 放进购物车
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span>2</span> 填写订单信息
                                </div>
                            </li>
                            <li class="last">
                                <div class="progress">
                                    <span>3</span> 支付/确认订单
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--购物车头部-->
                <!--商品列表-->
                <div class="cart-box">
                    <input id="jsondata" name="jsondata" type="hidden">
                    <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                        <tbody>
                            <tr>
                                <th width="48" align="center">
                                    <mt-button type="primary" @click="Alltoggle">{{toggletxt}}</mt-button>
                                </th>
                                <th align="center">商品信息</th>
                                <th width="84" align="center">单价</th>
                                <th width="104" align="center">数量</th>
                                <th width="104" align="center">金额(元)</th>
                                <th width="54" align="center">操作</th>
                            </tr>
                            <tr v-if="list.length<=0">
                                <td colspan="10">
                                    <div class="msg-tips">
                                        <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                        <div class="info">
                                            <strong>购物车没有商品！</strong>
                                            <p>您的购物车为空，<a href="/index.html">马上去购物</a>吧！</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="(item,index) in list" :key="index">
                                <td :width="48">
                                    <mt-switch v-model="istoggle[index]" @change="togglechange"></mt-switch>
                                </td>
                                <td align="left">
                                    <img :src="item.img_url" alt="" :width="40">
                                    <span v-text="item.title"></span>
                                </td align="center">
                                <td align="center">
                                    <span v-text="item.sell_price"></span>
                                </td>
                                <td align="center">
                                    <myinput :options="{gid:item.id,count:item.buycount}" @update="update"></myinput>
                                </td>
                                <td align="center">{{item.buycount*item.sell_price}}</td>
                                <td align="center">
                                    <mt-button type="danger" size="large" @click="delgoods(item.id)">删除</mt-button>
                                </td>
                            </tr>
                            <tr>
                                <th align="right" colspan="8">
                                    已选择商品 <b class="red" id="totalQuantity">{{totalcate}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                    <span class="red">￥</span><b class="red" id="totalAmount">{{totalfigure}}</b>元
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--/商品列表-->
                <!--购物车底部-->
                <div class="cart-foot clearfix">
                    <div class="right-box">
                        <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                        <button class="submit" @click="formsubmit">立即结算</button>
                    </div>
                </div>
                <!--购物车底部-->
            </div>
        </el-col>
    </el-row>
</div>

</template>

<script>
    import {
        getItem,
        delItem,
        updateItem
    }
    from '../kits/localStotagekits.js';

    import myinput from './goodschangeinput.vue';

    export default {
        components: {
            myinput,
        },
        data() {
            return {
                list: [],
                istoggle: [],
                toggle: false,
                toggletxt: "全选",
                totalcate: 0,
                totalAmount: 0
            }
        },
        created() {
            this.getgoodsinfo();
        },
        computed: {
            //计算当前用户选择的总数量和总价格的小九九
            totalfigure() {
                var trueArr = this.istoggle.filter(function(item) {
                        return item;
                    })
                    // this.istoggle.push(false);
                    // this.istoggle.pop();
                this.totalcate = trueArr.length;

                var totalAmount = 0;
                this.istoggle.forEach((item, index) => {
                    if (item) {
                        var goodsinfo = this.list[index];
                        totalAmount += goodsinfo.buycount * goodsinfo.sell_price;
                    }

                })

                return totalAmount;
            }
        },
        methods: {
            //页面提交至后台的订单提交页面的小九九
            formsubmit() {
                //过滤出状态为确认状态的商品的Id,以逗号隔开
                //带在shopping的url参数中传递ids,在shopping通过this.$route.params.ids获取ids
                var newArr = [];
                var obj = {};
                console.log(this.list);
                this.istoggle.forEach((item, index) => {
                    if (item) {
                        newArr.push(this.list[index].id);
                        obj[this.list[index].id] = this.list[index].buycount;
                    }
                })
                var idArr = newArr.join(",");

                localStorage.setItem("goodslist", JSON.stringify(obj));

                this.$router.push({
                        name: 'shopping',
                        params: {
                            id: idArr
                        }
                    })
                    //删掉原来购物车中的商品同时也减少右上角$store里的数量
                this.delgoods(newArr);
            },

            //商品数量加减的小九九
            update(obj) {
                console.log(obj);
                this.list.forEach(item => {
                    if (item.id == obj.gid) {
                        item.buycount = obj.count;
                    }
                })
                updateItem(obj);
                //触发购物车跟着动
                this.$store.dispatch('changeBuyCount', obj.amount);
                this.list.push('');
                this.list.pop();
            },

            //属于点击togglechange的小九九
            togglechange(item) {
                if (!item) {
                    this.toggletxt = "全选";
                    this.toggle = false;
                    return;
                }
                for (var i = 0; i < this.istoggle.length; i++) {
                    if (!this.istoggle[i]) {
                        return;
                    }
                }
                this.toggletxt = "反选";
                this.toggle = true;

            },
            //属于让商品全选的小九九
            Alltoggle() {
                this.toggle = !this.toggle;
                if (!this.toggle) {
                    this.toggletxt = "全选";
                } else {
                    this.toggletxt = "反选";
                }
                for (var i = 0; i < this.istoggle.length; i++) {
                    this.istoggle[i] = this.toggle;
                }
                this.istoggle.push(false);
                this.istoggle.pop();
            },
            //属于获取商品信息的小九九
            getgoodsinfo() {
                var obj = getItem();
                var arrids = [];
                for (var key in obj) {
                    arrids.push(key);
                }
                var ids = arrids.join(",");
                this.$http.get("/site/comment/getshopcargoods/" + ids).then(res => {
                    this.list = res.data.message;
                    this.list.forEach((item, index) => {
                        this.istoggle.push(false);
                        item.buycount = obj[item.id];
                    })
                    console.log(this.list);
                })

            },
            //属于删除商品信息的小九九
            delgoods(id) {
                if (id.length) {
                    for (var i = 0; i < id.length; i++) {
                        this.list.forEach((item, index) => {
                            if (item.id == id[i]) {
                                //list中删除该条信息
                                this.list.splice(index, 1);
                                // //istoggle中删除此id对应的状态信息
                                this.istoggle.splice(index, 1);
                                //localstorage中删除此条id对应的信息
                                delItem(id[i]);
                                var n = item.buycount;
                                this.$store.dispatch('changeBuyCount', -n);
                            }
                        })
                    }
                } else {

                    //获取被删除数据的id
                    var num = this.list.findIndex((item, index) => {
                            if (item.id == id) {
                                return index
                            }
                        })
                        //list中删除该条信息
                    var n = this.list[num].buycount;
                    this.list.splice(num, 1);
                    // //istoggle中删除此id对应的状态信息
                    this.istoggle.splice(num, 1);
                    //localstorage中删除此条id对应的信息
                    delItem(id);
                    this.$store.dispatch('changeBuyCount', -n);
                }

            }
        }
    }
</script>
<style scoped>
    .fenge {
        margin-left: 2em;
    }
    
    #mtheader {
        background-color: #fff;
        color: #000;
    }
    
    #mtheader a {
        color: #2d8cf0;
    }
</style>
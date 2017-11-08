<template>
<div class="tmpl">
    <mt-header id="mtheader">
       <mt-button slot="left"> 当前位置：</mt-button>
       <mt-button class="fenge" slot="left"><router-link to="/home"> <a href="#">>首页</a></router-link></mt-button>
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
                          <li class="active">
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
              <div class="cart-box">
                  <h2 class="slide-tit">
                      <span>1、收货地址</span>
                  </h2>
                  <el-form :model="form" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                      <div class="form-box address-info">
                          <el-form-item class="form-group" label="收货人姓名：" prop="accept_name">
                                  <el-input :span="2" v-model="form.accept_name"></el-input>
                                  <span class="Validform_checktip">*收货人姓名</span>
                          </el-form-item>
                          
                          <el-form-item class="form-group" label="所属地区：">
                              <v-distpicker @selected="getarea"></v-distpicker>

                          </el-form-item>
                          <el-form-item class="form-group" label="详细地址：" prop="address">
                                  <el-input v-model="form.address"></el-input>
                                  <span class="Validform_checktip">*除上面所属地区外的详细地址</span>
                          </el-form-item>
                          <el-form-item class="form-group" label="手机号码：" prop="mobile">
                              <el-input v-model="form.mobile"></el-input>
                              <span class="Validform_checktip">*收货人的手机号码</span>
                          </el-form-item>
                          <el-form-item class="form-group" label="电子邮箱：" prop="email">
                              <el-input v-model="form.email"></el-input>
                              <span class="Validform_checktip">方便通知订单状态，非必填</span>
                          </el-form-item>
                          <el-form-item class="form-group" label="邮政编码：" prop="post_code">
                              <el-input v-model="form.post_code" class="input code"></el-input>
                              <span class="Validform_checktip">所在地区的邮政编码，非必填</span>
                          </el-form-item>
                      </div>
                      <h2 class="slide-tit">
                          <span>2、支付方式</span>
                      </h2>
                      <ul class="item-box clearfix">
                          <!--取得一个DataTable-->
                          <li>
                              <el-radio class="radio" v-model="form.payment_id" label="6">在线支付</el-radio>
                          </li>
                      </ul>
                      <h2 class="slide-tit">
                          <span>3、配送方式</span>
                      </h2>
                      <ul class="item-box clearfix">
                          <!--取得一个DataTable-->
                          <el-form-item class="form-group" label="快递方式：" prop="mobile">
                          <el-radio-group v-for="item in expresslist" :key="item.id" v-model="form.express_id" @change="getexpressid">
                              <el-radio :label="item.id">{{item.title}}(运费：￥{{item.express_fee}})</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      </ul>
                      
                      <h2 class="slide-tit">
                          <span>4、商品清单</span>
                      </h2>
                      <div class="line15"></div>
                      <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                          <tbody>
                              <tr>
                                  <th colspan="2" align="left">商品信息</th>
                                  <th width="84" align="left">单价</th>
                                  <th width="84" align="center">购买数量</th>
                                  <th width="104" align="left">金额(元)</th>
                              </tr>
                              <tr v-for="item in goodslist" :key="item.id">
                                  
                                  <td width="68">
                                      <router-link v-bind="{to:'/admin/goodsinfo/'+item.id}">
                                      <a target="_blank" href="javascript:;">
                                          <img :src="item.img_url" class="img">
                                      </a>
                                      </router-link>
                                  </td>
                                  <td>
                                      <router-link v-bind="{to:'/admin/goodsinfo/'+item.id}">
                                          <a target="_blank" href="javascript:;">{{item.title}}}</a>
                                      </router-link>
                                  </td>
                                
                                  <td>
                                      <span class="red">￥{{item.sell_price}}</span>
                                  </td>
                                  <td align="center">{{item.buycount}}</td>
                                  <td>
                                      <span class="red">￥{{item.sell_price*item.buycount}}</span>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <div class="line15"></div>
                      <h2 class="slide-tit">
                          <span>5、结算信息</span>
                      </h2>
                      <div class="buy-foot clearfix">
                          <div class="left-box">
                              <dl>
                                  <dt>订单备注(100字符以内)</dt>
                                  <dd>
                                      <textarea class="input" v-model="form.message" style="height:35px;"></textarea>
                                  </dd>
                              </dl>
                          </div>
                          <div class="right-box">
                              <p>
                                  商品 <label class="price">{{goodslist.length}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                  <label class="price">{{form.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                              </p>
                              <p>
                                  运费：￥<label class="price">{{form.expressMoment}}</label> 元
                              </p>
                              <p class="txt-box">
                                  应付总金额：￥<label class="price">{{form.goodsAmount+form.expressMoment}}</label>
                              </p>
                              <p class="btn-box">
                                  <router-link to="/admin/carinfo">
                                      <a class="btn button" href="javascript:;">返回购物车</a>
                                  </router-link>
                                  <input type="button" value="确认提交" class="btn submit" @click="submitform">
                              </p>
                          </div>
                      </div>
                  </el-form>
              </div>
          </div>
      </el-col>
  </el-row>
</div>

</template>

<script>
    import VDistpicker from 'v-distpicker';
    export default {
        components: {
            VDistpicker: VDistpicker
        },
        data() {
            var checkMobile = (rule, value, callback) => {
                var reg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
                if (!reg.test(value)) {
                    return callback(new Error('手机号码格式错误'));
                }
                callback();
            }

            var checkEmail = (rule, value, callback) => {
                // 定义一个正则表达式
                var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
                // 匹配用户输入的值
                if (!reg.test(value)) {
                    return callback(new Error('email格式错误'));
                }
                callback();
            };

            var checkZipCode = (rule, value, callback) => {
                // 定义一个正则表达式
                var reg = /^\d{6}$/;
                // 匹配用户输入的值
                if (!reg.test(value)) {
                    return callback(new Error('邮编格式错误'));
                }
                callback();
            };
            return {
                goodslist: [],
                expresslist: [],
                form: {
                    "goodsAmount": 0,
                    "expressMoment": 20,
                    "accept_name": "",
                    "area": {
                        "province": {},
                        "city": {},
                        "area": {}
                    },
                    "address": "",
                    "mobile": "",
                    "email": "",
                    "post_code": "",
                    "payment_id": "",
                    "express_id": "",
                    "message": "",
                    "goodsids": "",
                    "cargoodsobj": {}
                },
                rules: {
                    accept_name: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }],
                    address: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }],
                    mobile: [
                        // 手机号码一定是格式要正确
                        {
                            validator: checkMobile,
                            trigger: 'blur'
                        }
                    ],
                    email: [
                        // 
                        {
                            validator: checkEmail,
                            trigger: 'blur'
                        }
                    ],
                    post_code: [
                        // 
                        {
                            validator: checkZipCode,
                            trigger: 'blur'
                        }
                    ]

                }
            }
        },
        created() {
            this.getgoodslist();
            this.getexpresslist();
        },
        methods: {
            getexpressid(expressid) {
                this.expresslist.forEach((item) => {
                    if (item.id == expressid) {
                        this.form.expressMoment = item.express_fee;
                    }
                })
            },
            getgoodslist() {
                console.log(this.$route);
                this.$http.get("/site/validate/order/getgoodslist/" + this.$route.params.id).then(res => {

                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    this.goodslist = res.data.message;
                    //获取到localStorage的值之后需要JSON.parse转换为对象之后才可以继续操作
                    var obj = JSON.parse(localStorage.getItem("goodslist"));
                    var idsarr = [];
                    this.form.cargoodsobj = obj;
                    this.goodslist.forEach((item => {
                        item.buycount = obj[item.id];
                        idsarr.push(item.id);
                        this.form.goodsAmount += item.buycount * item.sell_price;
                    }))
                    this.form.goodsids = idsarr.join(",");
                })
            },
            getarea(data) {
                this.form.area.province = data.province;
                this.form.area.city = data.city;
                this.form.area.area = data.area;
            },
            getexpresslist() {
                this.$http.get('/site/validate/order/getexpresslist').then(res => {
                    this.expresslist = res.data.message;
                })
            },
            submitform() {
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        this.$http.post("/site/validate/order/setorder", this.form).then(res => {
                            if (res.data.status == 1) {
                                return this.$message.error(res.data.message);
                            }
                            this.$message({
                                message: "下单成功",
                                type: 'success',
                                duration: 1000
                            });
                            this.$router.push({
                                name: "order",
                                params: {
                                    id: res.data.message.orderid
                                }
                            })
                        })
                    } else {
                        this.$message.error('验证不通过!!');
                        return false;
                    }
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
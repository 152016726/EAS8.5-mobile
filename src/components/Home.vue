<template>
  <div class="tmpl">
        <!-- 1.0 轮播图使用的是 mint-ui中的 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in sliderlist" :key="index">
                <img :src="item.img_url" alt="">
            </mt-swipe-item>

        </mt-swipe>

        <!-- 2.0 9宫格导航 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/Home">
                    <span class="mui-icon mui-icon-home"></span>
                    <div class="mui-media-body">首页</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/question">
                    <span class="mui-icon mui-icon-email">
                        <span class="mui-badge">5</span>
                    </span>
                    <div class="mui-media-body">财务软件</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">进销存软件</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">管理软件</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">配套用品</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">原厂服务</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">购物商城</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-home"></span>
                    <div class="mui-media-body">更多</div>
                </a>
            </li>
        </ul>
        
        <!-- 3.0商品分类展示 -->
        <div class="mui-content" style="background-color:#fff" v-for="(item,index) in goodsgroup " :key="index">
          <mt-header id="category">
            <mt-button slot="left">{{item.catetitle}}</mt-button>
            <mt-button class="fenge" slot="right" v-for="(subitem,index) in item.level2catelist" :key="index">
              {{subitem.subcatetitle}}
            </mt-button>
            <mt-button>更多<i>+</i></mt-button>
          </mt-header>
           
          <ul class="mui-table-view mui-grid-view" width="100%">
              <li class="mui-table-view-cell mui-media mui-col-xs-3" v-for="(dataitem,index) in item.datas" :key="index">
                   <router-link v-bind="{to:'/goodsinfo/'+dataitem.artID}">
                      <a href="#">
                          <div class="img-box">
                            <img class="mui-media-object" :src="dataitem.img_url" :title="dataitem.artTitle">
                          </div>
                          <div class="mui-media-body info" id="details">
                            <p>{{dataitem.artTitle}}</p>
                            <p class="price">
                              <b>¥{{dataitem.sell_price}}</b>元</p>
                            <p>
                              <span>库存 {{dataitem.stock_quantity}}</span>
                              <span>市场价：
                                <s>{{dataitem.market_price}}</s>
                              </span>
                            </p>
                          </div>
                      </a>
                   </router-link>
              </li>
          </ul>  
        </div> 
  </div>
</template>

<script>
    export default {
        data() {
            return {
                sliderlist: [],
                goodsgroup: [],

            }
        },
        created() {
            this.getlunbo();
            this.getgoodsgroup();
        },
        methods: {
            getlunbo() {
                this.$http.get('/site/goods/gettopdata/goods').then(res => {
                    this.sliderlist = res.data.message.sliderlist;
                })
            },
            getgoodsgroup() {
                console.log(11);
                this.$http.get('/site/goods/getgoodsgroup').then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }

                    this.goodsgroup = res.data.message;
                    console.log(this.goodsgroup);
                })
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mint-swipe {
        height: 300px;
    }
    
    .mint-swipe-item img {
        width: 100%;
        height: 300px;
    }
    /* 修改9宫格的图片样式 */
    
    .mui-icon-home:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-email:before,
    .mui-icon-search:before,
    .mui-icon-phone:before {
        content: ''
    }
    
    .mui-icon-home {
        width: 50px;
        height: 50px;
        background-image: url('../../static/imgs/1.png');
        background-repeat: round;
    }
    
    .mui-icon-chatbubble {
        width: 50px;
        height: 50px;
        background-image: url('../../static/imgs/2.png');
        background-repeat: round;
    }
    
    .mui-icon-location {
        width: 50px;
        height: 50px;
        background-image: url('../../static/imgs/3.png');
        background-repeat: round;
    }
    
    .mui-icon-email {
        width: 50px;
        height: 50px;
        background-image: url('../../static/imgs/4.png');
        background-repeat: round;
    }
    
    .mui-icon-search {
        width: 50px;
        height: 50px;
        background-image: url('../../static/imgs/5.png');
        background-repeat: round;
    }
    
    .mui-icon-phone {
        width: 50px;
        height: 50px;
        background-image: url('../../static/imgs/6.png');
        background-repeat: round;
    }
    
    .itemstyle {
        text-align: left;
        float: left;
    }
    
    .itemstyle1 {
        float: right;
    }
    
    .fenge {
        margin-left: 2em;
    }
    
    #details {
        height: 50px;
    }
    
    #details p {
        color: #f10215;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    
    #category {
        background: url('../../static/imgs/s_menu_bg.gif');
    }
</style>
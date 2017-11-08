<template>
<div class="tmpl">
    <!-- 选择mui中的图文列表显示 -->
        <ul v-for="data in datas" class="mui-table-view mui-table-view-chevron">
            <li v-for="subdata in data.datas"  class="mui-table-view-cell mui-media">
                <a class="mui-navigate-right">
                    <img class="mui-media-object mui-pull-left" :src="subdata.img_url">
                    <div class="mui-media-body">
                        {{subdata.artTitle}}
                        <p class="mui-ellipsis" v-text="subdata.zhaiyao"></p>
                    </div>
                </a>
            </li>
           
        </ul>
</div>
</template>

<script>
    export default {
        data() {
            return {
                datas: []
            }
        },
        created() {
            this.getdatas();
        },
        methods: {
            getdatas() {
                this.$http.get('site/article/getarticles/question')
                    .then(res => {
                        this.datas = res.data.message;
                    });
            }

        }
    }
</script>
<style scoped>

</style>
<template>
<el-row :span="24" class="tmpl">
    <p>订单支付总金额为：{{count}}</p>
    <el-button type="success" size="medium" @click="getpay">支付</el-button>
</el-row>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        },
        created() {
            this.getcount();
        },
        methods: {
            getcount() {
                console.log(this.$route);
                this.$http.get("/site/validate/order/getorder/" + this.$route.params.id).then(res => {
                    this.count = res.data.message[0].order_amount;
                })
            },
            getpay() {
                this.$http.get("/site/validate/order/pay/" + this.$route.params.id).then(res => {
                    if (res.data.status == 1) {
                        return this.$message.error(res.data.message);
                    }
                    this.$router.push({
                        name: "paysuccess"
                    })
                })
            }
        }
    }
</script>
<style scoped>

</style>
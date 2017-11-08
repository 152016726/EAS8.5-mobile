<template>
<div class="temp">
		<el-row :span="9" class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' v-model="form.user_name" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' v-model="form.password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
			<div class="mui-content-padded">
				<button @click="submitForm" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
				<div class="link-area"><a id='reg'>注册账号</a> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
				</div>
			</div>
			<div class="mui-content-padded oauth-area">

			</div>
		</el-row>
</div>
</template>
<script>
    import {
        vm
    } from '../kits/vm.js';
    export default {
        data() {
            return {
                form: {
                    user_name: '',
                    password: ''
                }
            }
        },
        //元素生成了
        mounted() {
            document.getElementsByTagName('body')[0].style.backgroundColor = "skyblue";
            var a = localStorage.getItem("routerName");
            var obj = JSON.parse(a);
            console.log(obj);
        },
        beforeDestroy() {
            document.getElementsByTagName('body')[0].style.backgroundColor = "#fff";
        },
        methods: {
            submitForm() {
                this.$http.post('/site/account/login', this.form).then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    vm.$emit('changeshow');
                    var a = localStorage.getItem("routerName");
                    var obj = JSON.parse(a);
                    console.log(obj);
                    this.$router.push({
                        name: obj.name,
                        params: {
                            id: obj.params
                        }
                    });
                })
            }
        }


    }
</script>

<style scoped>

</style>
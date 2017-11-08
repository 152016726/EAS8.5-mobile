<template>
<div class="mycom">
    <ul>
      <li @click="sub">-</li>
      <li>{{count}}</li>
      <li @click="add">+</li>
    </ul>
</div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0,
            }
        },
        props: ['options'],
        created() {
            this.getcount();
        },
        methods: {
            sub() {
                this.count--;
                this.toparent(-1);
            },
            add() {
                this.count++;
                this.toparent(1);
            },
            toparent(n) {
                this.$emit('update', {
                    gid: this.options.gid,
                    count: this.count,
                    amount: n
                });
            },
            getcount() {
                this.count = this.options.count;
            }
        }
    }
</script>
<style scoped>
    .mycom ul {
        width: 120px;
    }
    
    .mycom li {
        cursor: pointer;
        list-style: none;
        display: inline-block;
        width: 30px;
        padding: 2px;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
</style>
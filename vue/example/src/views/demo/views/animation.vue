<template lang="jade">
    .wrap-demo-animation
        .demo-animation
            button(@click="dynamicAnimate(1)") 01
            button(@click="dynamicAnimate(2)") 02
            button(@click="dynamicAnimate(3)") 03
            button(@click="moveIn") show
            dynamic(:animation="dynamicType",:show="show")
                .box
</template>

<script>
    export default {
        components: {
            dynamic: require('components/animation/dynamic.vue')
        },
        data(){
            return {
                show: false,
                dynamicType: 1,
            }
        },
        methods: {
            moveIn(){
                this.show = !this.show;
            },
            dynamicAnimate(type){
                this.dynamicType = type;
            }
        }
    }
</script>

<style lang="sass" scoped>
	.wrap-demo-animation{
		position: absolute;
		top: 48px;
		bottom: 0;
		left: 0;
		right: 0;
		.demo-animation{
            padding: 30px;
            height: 200px;
        }
        .box{
            width: 100px;
            height: 100px;
            background-color: #000;
        }
        button{
            padding: 10px;
            margin: 10px;
            background-color: #56aaff;
        }
	}
</style>
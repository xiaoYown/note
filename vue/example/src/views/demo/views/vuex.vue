<style lang="sass">
	.vue-vuex-wrap{
		.vuex-info-wrap{
			display: inline-block;
			vertical-align: top;
			width: 50%;
		}
		.vuex-option-wrap{
			line-height: 30px;
			.title{
				display: inline-block;
				vertical-align: middle;
				color: #999;
				width: 60px;
			}
			input{
				display: inline-block;
				vertical-align: middle;
			}
			button{
				color: #fff;
				padding: 4px 5px;
				border-radius: 4px;
				background-color: #56aaff;
			}
			input[type='button']{
				background-color: #56aaff;
				padding: 2px 6px;
				border: none;
				color: #fff;
				margin-right: 10px;
			}
		}
	}
</style>

<template lang="jade">
	div.inner-wrap.vue-vuex-wrap
		.vuex-info-wrap
			.vuex-option-wrap
				h4.title 计数器 : 
				input(type="button",value="-",@click="cal('-')")
				input(type="button",value="+",@click="cal('+')")
			.vuex-option-wrap
				h4.title name : 
				input(v-model="stateData.name")
			.vuex-option-wrap
				h4.title age : 
				input(v-model="stateData.age")
			.vuex-option-wrap
				h4.title email : 
				input(v-model="stateData.email")
			.vuex-option-wrap
				h4.title addr : 
				input(v-model="stateData.addr")
			.vuex-option-wrap
				button(@click="saveState") submit
		.vuex-info-wrap
			.vuex-option-wrap
				{{ calData }}
			.vuex-option-wrap( v-for="value,key in stateShow" )
				h4.title {{ key }} :
				span {{value}}


</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import { getAttribute } from 'tools/utils';

	export default {
		data(){
			return {
				stateData: {
					name: '',
					age: '',
					email: '',
					addr: '',
				}
			}
		},
		computed: mapState({
			stateShow: state => state.demo.stateShow,
			calData: state => state.demo.calData
		}),
		methods: {
			...mapActions(['saveStateShow', 'saveUserInfo', 'saveCalData']),
			saveState(){
				this.saveStateShow({
					method: 'put',
					data: getAttribute(this.stateData),
				});
				this.saveUserInfo({
					method: 'put',
					data: {
						name: this.stateData.name,
					}
				})
			},
			cal(symbol){
				let data = this.calData;
				switch (symbol){
					case '+':
						data += 1;
						break;
					case '-':
						data -= 1;
						break;
				}
				this.saveCalData({
					method: 'put',
					data,
				})
			}
		}
	}
</script>

<style lang="sass">
	input{
		border: 1px solid #000;
	}
</style>
<template lang="jade">
	.wrap-components
		.ui-components-wrap
			xy-switch(
				:open="switchOpen",
				@open-change="openChange"
			)
				p.inline {{ switchOpen }}
		.ui-components-wrap
			xy-range(
				:percent="rangeNum",
				@range-change="rangeChange"
			)
			p {{ rangeNum }}
		.ui-components-wrap
			xy-select(
				:list="selectList",
				@select-change="selectChange"
			)
</template>

<script>
	export default {
		components :{
			'xy-switch': require('components/ui/switch.vue'),
			'xy-range':  require('components/ui/range.vue'),
			'xy-select':  require('components/ui/select.vue'),
		},
		data(){
			return {
				switchOpen: true,
				rangeNum: 0.5,
				selectList: [
					{
						id: '1',
						ct: '1111',
						checked: false,
					},{
						id: '2',
						ct: '2222',
						checked: false,
					},{
						id: '3',
						ct: '333',
						checked: false,
					},{
						id: '4',
						ct: '4444',
						checked: false,
					}
				]
			}
		},
		methods: {
			openChange(bool){
				this.switchOpen = bool;
			},
			rangeChange(range){
				this.rangeNum = range;
			},
			selectChange(id){
				console.log(id)
			}
		}

	}
</script>

<style lang="sass">
	.wrap-components{
		position: absolute;
		top: 48px;
		bottom: 0;
		left: 0;
		right: 0;
		
		.inline{
			vertical-align: middle;
			margin-left: 10px;
		}
	}
	.ui-components-wrap{
		padding: 20px;

		.xy-range-wrap{
			width: 200px;
		}
	}
</style>
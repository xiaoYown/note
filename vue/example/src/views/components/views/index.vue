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
</template>

<script>
	export default {
		components :{
			'xy-switch': require('components/ui/switch.vue'),
			'xy-range':  require('components/ui/range.vue'),
		},
		data(){
			return {
				switchOpen: true,
				rangeNum: 0.5,
			}
		},
		methods: {
			openChange(bool){
				this.switchOpen = bool;
			},
			rangeChange(range){
				this.rangeNum = range;
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

		.its-range-wrap{
			width: 200px;
		}
	}
</style>
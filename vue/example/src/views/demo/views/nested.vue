<template lang="jade">
    .wrap-demo-nested
        div {{ $route.params.id }}
        router-link(to="/nested/foo/profile") childrent-1
        router-link(to="/nested/foo/posts") childrent-2
        router-view
</template>

<script>

    export default {
        data() {
            return {
                params: {
                    name: this.$route.name,
                    age:  this.$route.age,
                }
            }
        },
    }
</script>

<style lang="sass">
	.wrap-demo-nested{
		position: absolute;
		top: 48px;
		bottom: 0;
		left: 0;
		right: 0;

		background-color: pink;
	}
</style>
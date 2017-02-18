<style lang="sass">
    .fade-enter-active, .fade-leave-active{
        transition: all .4s linear;
    }
    .fade-enter, .fade-leave-active{
        opacity: 0
    }

    .fade-r-l-enter-active, .fade-r-l-leave-active{
        transition: all .4s linear;
        transform: translateX(100px); 
    }
    .fade-r-l-enter-to{ 
        transform: translateX(0); 
    }
    .fade-r-l-enter, .fade-r-l-leave-active{
        opacity: 0;
    }
</style>
<template lang="jade">
    .content
        transition(name="fade" mode="out-in")
            router-view
</template>

<script>
	require('sass/base.scss');
    export default {
      
    }
</script>

<template lang="jade">
    .ui-compoents-drag
        xy-drag
</template>

<script>
    export default {
        components: {
            'xy-drag': require('components/ui/drag.vue')
        }
    }
</script>

<style lang="sass">
    .ui-compoents-drag{
        position: relative;
        height: 100vh;
        background-color: #fefefe;
    }
</style>
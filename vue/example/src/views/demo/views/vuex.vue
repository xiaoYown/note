<template lang="jade">
    div
        div
            | name : 
            input(v-model="stateData.name")
        div
            | age : 
            input(v-model="stateData.age")
        div
            button(@click="saveState") submit
        div( v-for="value,key in stateShow" )
            | {{ key }} :
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
                    age: ''
                }
            }
        },
        computed: mapState({
            stateShow: state => state.demo.stateShow
        }),
        methods: {
            ...mapActions(['saveStateShow']),
            saveState(){
                console.log(this.stateData)
                this.saveStateShow({
                    method: 'put',
                    data: getAttribute(this.stateData),
                })
            },
        }
    }
</script>

<style lang="sass">
    input{
        border: 1px solid #000;
    }
</style>
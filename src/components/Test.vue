<template>
  <div>
    <transform-text-area
      :value="test"
      :transform="transform"

    ></transform-text-area>
  </div>

</template>

<script>
  import TransformTextArea from './TransformTextArea'

  export default {
    name: 'Test',

    components: {
      TransformTextArea,
    },

    data() {
      return {
        test: '123',
      }
    },

    created() {
      let that = this
      setTimeout( function () {
        that.test = 'abc'
      }, 500 )
    },

    watch: {
      test( x ) {
        console.log( `from test: ${x}` )
      },
    },

    methods: {
      transform: x => x.toUpperCase(),
    },
  }
</script>

<style scoped>

</style>
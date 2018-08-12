<template>
    <textarea
      :value="internalValue"
      :title="title"
      :readonly="readonly"
      :disabled="disabled"
      @input="internalValue = $event.target.value"
    > </textarea>
</template>

<script>
  export default {
    name: 'transform-text-area',

    props: {
      value: { required: false },
      title: String,
      readonly: Boolean,
      height: [Number, String],
      disabled: Boolean,
      transform: {
        type: Function,
        default: x => x,
      },
    },

    data: vm => ({
      lazyValue: vm.value,
    }),

    computed: {
      internalValue: {
        get() {
          return this.lazyValue
        },
        set( val ) {
          this.lazyValue = this.transform( val )
          this.$emit( this.$_modelEvent, this.lazyValue )
        },
      },
    },

    beforeCreate() {
      this.$_modelEvent = (this.$options.model && this.$options.model.event) || 'input'
    },

    watch: {
      value( x ) {
        this.lazyValue = this.transform( x )
      },
    },

  }
</script>


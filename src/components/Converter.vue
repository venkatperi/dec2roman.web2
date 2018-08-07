<template>
  <div class="form-group">
    <label class="label">{{caption}}</label>
    <textarea :id="id"
              :class="['form-control','input', error? 'error-border':'']"
              v-model="entry"
              @input="update">{{ value }}</textarea>
    <small class="message" v-html="errorMessage"></small>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: 'converter',

    props: {
      id: String,
      value: [Number, String],
      caption: {
        type: String,
        required: true,
      },
      converter: {
        type: Function,
        default: x => x,
      },
      preprocessor: {
        type: Function,
        default: x => x,
      },
    },

    data: function () {
      return {
        entry: '',
        error: undefined,
      }
    },

    watch: {
      value() {
        this.entry = this.value
      },
    },

    computed: {
      errorMessage: function () {
        return this.error ? this.error.message : '&nbsp;'
      },
    },

    methods: {
      convert: function () {
        let val = ''
        this.error = undefined
        if ( this.entry.length > 0 ) {
          try {
            val = this.converter( this.entry )
          } catch ( e ) {
            console.log( e )
            this.error = e
          }
        }
        return val
      },

      update: _.debounce( function ( e ) {
        let value = e.target.value
        if ( value.length > 0 ) {
          try {
            this.entry = this.preprocessor( value )
          } catch ( e ) {
            console.log( e )
          }
        }

        this.$emit( 'result', this.convert() );

      }, 100 ),
    },
  }
</script>


<style lang="scss" scoped>

  textarea.input {
    height: 200px;
    color: #555;
    width: 100%;
    padding: 10px 20px;
    max-height: 300px;

    font-family: 'News Cycle', sans-serif;
    font-size: 3rem;
    text-overflow: clip;
    overflow-wrap: break-word;
    position: relative;
    text-align: left;
    background-color: #eee;
  }

  #decimal {
    font-family: 'Share Tech Mono', monospace;
    height: 1.5em;
    color: #333;
    &::placeholder {
      color: #808080;
    }
  }

  .error-border {
    background: rgba(200, 100, 100, 0.25) !important;
  }
</style>

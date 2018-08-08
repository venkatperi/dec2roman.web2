<template>
  <div class="form-group">
    <label class="label">{{caption}}</label>
    <textarea v-model="entry"
              :class="['form-control','input', error? 'error-border':'']"
              @input="update"></textarea>
    <small class="message" v-html="errorMessage"></small>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: 'converter',

    props: {
      value: [Number, String],
      options: Object,
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
      error() {
        console.log( this.error )
      },
      options: {
        handler() {
          this.update( { target: { value: this.entry } } )
        },
        deep: true,
      },
    },

    computed: {
      errorMessage: function () {
        return this.error ? this.error.message : '&nbsp;'
      },
    },

    methods: {
      convert: function () {
        this.error = undefined
        try {
          return this.converter( this.entry, this.options )
        } catch ( e ) {
          this.error = e
        }
      },

      update: _.debounce( function ( e ) {
        try {
          this.entry = this.preprocessor( e.target.value )
        } catch ( e ) {
          console.log( e )
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

  .decimal textarea {
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

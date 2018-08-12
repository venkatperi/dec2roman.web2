<template>
  <div class="container-fluid converter form-group p-0">
    <div class="row">
      <div class="col-auto pr-0">
        <label>{{caption}}</label>
      </div>
      <div class="col-auto float-right p-0">
        <span class="message" v-html="errorMessage"></span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <transform-text-area
          v-model="entry"
          :transform="preprocessor"
          :class="['form-control','input', error? 'error-border':'']">
        </transform-text-area>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span class="hint">{{ hint }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import TransformTextArea from './TransformTextArea'

  // noinspection JSUnusedGlobalSymbols
  export default {
    name: 'converter',
    components: { TransformTextArea },
    props: {
      value: [Number, String],

      process: [Number, String],

      hint: String,

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

    data() {
      return {
        entry: '',
        result: '',
        error: undefined,
      }
    },

    watch: {
      value( x ) {
        this.entry = x
      },

      process( x ) {
        this.entry = x
      },

      error() {
        this.error && console.log( this.error )
      },

      options: {
        handler() {
          this.updateResult()
        },
        deep: true,
      },

      result( r ) {
        this.$emit( 'result', r );
      },

      entry( ) {
        this.error = undefined
        this.updateResult()
      },

    },

    methods: {
      updateResult( ) {
        try {
          this.result = this.converter( this.entry, this.options )
        } catch ( e ) {
          this.error = e
        }
      },
    },

    computed: {
      errorMessage() {
        return this.error ? this.error.message : '&nbsp;'
      },
    },
  }
</script>


<style lang="scss" scoped>

  label, .message, .hint {
    margin-bottom: 0;
    color: #666;
    font-size: 0.9rem;
    font-family: 'Share Tech Mono', sans-serif;
  }

  .hint {
    color: #999;
  }

  label {
    font-weight: 600;
  }

  .message {
    margin-left: 10px;
    color: red;
  }

  textarea.input {
    height: 1.5em;
    color: #555;
    width: 100%;
    padding: 0 20px;
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
    color: #333;
    &::placeholder {
      color: #808080;
    }
  }

  .error-border {
    background: rgba(200, 100, 100, 0.25) !important;
  }

</style>

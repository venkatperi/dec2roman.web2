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
    <textarea v-model="entry"
              :class="['form-control','input', error? 'error-border':'']">
    </textarea>
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

  // noinspection JSUnusedGlobalSymbols
  export default {
    name: 'converter',

    props: {
      value: [Number, String],
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
      value() {
        this.entry = this.value
      },

      error() {
        console.log( this.error )
      },

      options: {
        handler() {
          this.update( this.entry )
        },
        deep: true,
      },

      entry( input ) {
        this.update( input )
      },

      result( r ) {
        this.$emit( 'result', r );
      },

    },

    methods: {
      update( input ) {
        this.error = undefined
        try {
          this.entry = this.preprocessor( input )
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

  .converter {
    /*margin-bottom: 20px;*/
  }
</style>

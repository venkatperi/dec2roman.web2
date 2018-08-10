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
              :title="caption"
              :class="['form-control','input', error? 'error-border':'']"
              @input="update"></textarea>
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
  import _ from 'lodash';

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

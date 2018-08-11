<template>
  <div class="container-fluid p-0 ">
    <div class="row">
      <div class="col text-right">
        <a :href="'/roman/#/d2r/'+decimal" title="Right click to copy link">
          <LinkLogo/>
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <converter caption="ROMANUS"
                   :preprocessor="romanPreprocessor"
                   :converter="convertRoman"
                   :value="roman"
                   :options="options.r2d"
                   hint="HINT: Use single quotes (') for vinculum over-bars."
                   @result="decimal = $event"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <converter caption="DECIMALES"
                   class="decimal"
                   :converter="convertDecimal"
                   :value="decimal"
                   :options="options.d2r"
                   @result="roman = $event"/>
      </div>
    </div>
    <div class="options">
      <div class="row">
        <div class="col">
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" value="" id="strict"
                   v-model="options.r2d.strict">
            <label class="form-check-label" for="strict">
              <a href="https://www.math.nmsu.edu/~pmorandi/math111f01/RomanNumerals.html" target="_blank">Strict</a>
              mode
              for roman numbers
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="modeRadio"
                   id="mode-noext" value="no_ext"
                   v-model="options.d2r.mode">
            <label class="form-check-label" for="mode-noext">
              No over-lines or extensions, please.
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="modeRadio" id="mode-ibar" value="ibar"
                   v-model="options.d2r.mode"
                   checked>
            <label class="form-check-label" for="mode-ibar">
              Use <a href="https://en.wikipedia.org/wiki/Roman_numerals#Vinculum" target="_blank">vinculum</a> notation
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="modeRadio" id="mode-no-ibar" value="no_ibar"
                   v-model="options.d2r.mode">
            <label class="form-check-label" for="mode-no-ibar">
              Use vinculum, but use M instead of I̅ (I with over-line).
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Converter from 'components/Converter';
  import {dec2Roman, roman2Dec} from 'dec2roman'
  import LinkLogo from 'images/Link.svg';
  import _ from 'lodash'

  export default {
    name: 'app',

    components: {
      LinkLogo,
      Converter,
    },

    data: function () {
      return {
        options: {
          r2d: { strict: true },
          d2r: { mode: 'ibar' },
        },
        decimal: '',
        roman: '',
        routeArgs: {},
      }
    },

    created() {
      this.updateRouteArgs()
    },

    watch: {
      '$route'() {
        this.updateRouteArgs()
      },

      routeArgs() {
        let args = this.routeArgs
        console.log( args )
        switch ( args.op ) {
          case 'd2r':
            this.decimal = args.input
            break
          case 'r2d':
            this.roman = args.input
            break
        }
      },
    },

    methods: {
      updateRouteArgs() {
        this.routeArgs = this.$route.params.args ?
          _.zipObject( ['op', 'input'], this.$route.params.args.split( '/' ) )
          : {}
      },

      romanPreprocessor: function ( x ) {
        if ( !x || x.length === 0 ) return ''
        return x.toUpperCase().replace( '\'', '̅' )
      },

      convertRoman: function ( x, opts ) {
        if ( !x || x.length === 0 ) return ''
        let val = roman2Dec( x, opts )
        if ( val.length === 0 ) val = ''
        return val
      },

      convertDecimal: function ( x, opts ) {
        if ( !x || x.length === 0 ) return ''
        let val = dec2Roman( x, opts )
        if ( val.length === 0 ) val = ''
        return val
      },

    },
  }
</script>

<style lang="scss" scoped>

  .options {
    font-family: 'Share Tech Mono', sans-serif;
    font-size: 0.75rem;
    color: #777;
    text-transform: uppercase;
  }

</style>
<template>
  <div>

    <converter caption="ROMANUS"
               :preprocessor="romanPreprocessor"
               :converter="convertRoman"
               :value="roman"
               :options="options.r2d"
               @result="decimal = $event"/>
    <converter caption="DECIMALES"
               class="decimal"
               :converter="convertDecimal"
               :value="decimal"
               :options="options.d2r"
               @result="roman = $event"/>
    <div class="options">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="strict"
               v-model="options.r2d.strict">
        <label class="form-check-label" for="strict">
          <a href="https://www.math.nmsu.edu/~pmorandi/math111f01/RomanNumerals.html" target="_blank">Strict</a> mode
          for roman numbers
        </label>
      </div>
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
</template>

<script>
  import Converter from 'components/Converter';
  import {dec2Roman, roman2Dec} from 'dec2roman'

  export default {
    name: 'app',

    components: { Converter },

    data: function () {
      return {
        options: {
          r2d: {
            strict: true,
          },
          d2r: {
            mode: 'ibar',
          }
        },
        decimal: '',
        roman: '',
      }
    },

    methods: {
      romanPreprocessor: function ( x ) {
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
<template>
  <main role="main" class="inner cover">
    <div id="content">
      <converter caption="ROMANUS"
                 id="roman"
                 :preprocessor="romanPreprocessor"
                 :converter="convertRoman"
                 :value="roman"
                 @result="romanChanged"/>
      <converter caption="DECIMALES"
                 id="decimal"
                 :converter="convertDecimal"
                 :value="decimal"
                 @result="decimalChanged"/>
    </div>
  </main>
</template>

<script>
  import Converter from 'components/Converter';
  import {dec2Roman, roman2Dec} from 'dec2roman'

  export default {
    name: 'dec2roman',

    components: { Converter },

    data: function () {
      return {
        decimal: '',
        roman: '',
      }
    },

    methods: {
      romanPreprocessor: function ( x ) {
        return x.toUpperCase().replace( '\'', '̅' )
      },

      convertRoman: function ( x ) {
        if ( !x || x.length === 0 ) return ''
        let val = roman2Dec( x )
        if ( val.length === 0 ) val = ''
        return val
      },

      convertDecimal: function ( x ) {
        if ( !x || x.length === 0 ) return ''
        let val = dec2Roman( x )
        if ( val.length === 0 ) val = ''
        return val
      },

      romanChanged: function ( x ) {
        this.decimal = x
      },

      decimalChanged: function ( x ) {
        this.roman = x
      },

    },
  }
</script>


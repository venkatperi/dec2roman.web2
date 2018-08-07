<!--suppress ES6UnusedImports -->
<template>
  <div id="app" class="cover-container d-flex h-100 p-3 mx-auto flex-column">
    <!--<app-menu/>-->

    <!--<dec2roman/>-->
    <footer class="mastfoot mt-auto">
      <div class="copyright">
        <p>Copyright &copy; 2018 Venkat Peri & Prahlad Peri. All Rights Reserved.</p>
        <!--<p id="copy"><a href="https://github.com/venkatperi/dec2roman"> </a></p>-->
      </div>
    </footer>
  </div>
</template>

<script>
  import AppMenu from 'components/AppMenu';
  import Dec2roman from 'components/Dec2roman';

  export default {
    name: 'app',
    components: { Dec2roman, AppMenu },
  };
</script>


<style lang="scss">
  @import 'styles/main';
</style>


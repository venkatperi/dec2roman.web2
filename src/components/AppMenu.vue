<template>
  <div class="container-fluid menu p-0 mt-2 mb-4">
    <div class="row">
      <div class="col-auto float-left">
        <h3 class="brand">Romanus Numerum</h3>
      </div>
      <div class="col float-right text-right">
        <a href="https://github.com/venkatperi/dec2roman" target="_blank">
          <GithubLogo/>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import GithubLogo from 'images/github.svg';

  export default {
    name: 'app-menu',
    components: {
      GithubLogo,
    },
  }

</script>


<style lang="scss">
  /*@import '../styles/main';*/
</style>


<style lang="scss" scoped>

  .brand {
    margin-bottom: 0;
    font-family: 'Judson', serif;
    font-size: 1.4em;
    text-transform: uppercase;
    color: #333;
  }

  .nav-masthead {
    .nav-link {
      padding: .25rem 0;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.5);
      background-color: transparent;
      border-bottom: .25rem solid transparent;
      &:hover, &:focus {
      }
      + .nav-link {
        margin-left: 1rem;
      }
    }
    .active {
      color: #fff;
      border-bottom-color: #fff;
    }
  }

  .masthead-brand, .nav-masthead {
    text-align: center;
  }

  @media (min-width: 30rem) {
    .masthead-brand {
      float: left;
    }
    .nav-masthead {
      float: right;
    }
  }

</style>

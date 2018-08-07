<template>
  <header class="masthead mb-auto">
    <div class="inner">
      <h3 class="masthead-brand">Romanus Numerum</h3>
      <nav class="nav nav-masthead justify-content-center">
        <a class="nav-link" href="https://github.com/venkatperi/dec2roman">
          <GithubLogo/>
        </a>
      </nav>
    </div>
  </header>
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

<style lang="scss" scoped>
  .masthead {
    margin-bottom: 0rem;
  }

  .masthead-brand {
    margin-bottom: 0;
    font-family: 'Judson', serif;
    text-transform: uppercase;
    color: #222;
  }

  .nav-masthead .nav-link {
    padding: .25rem 0;
    font-weight: 700;
    color: rgba(255, 255, 255, .5);
    background-color: transparent;
    border-bottom: .25rem solid transparent;
  }

  .nav-masthead .nav-link:hover,
  .nav-masthead .nav-link:focus {
    //border-bottom-color: rgba(255, 255, 255, .25);
  }

  .nav-masthead .nav-link + .nav-link {
    margin-left: 1rem;
  }

  .nav-masthead .active {
    color: #fff;
    border-bottom-color: #fff;
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

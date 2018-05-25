<template>
  <div id="app">
    <toolbar slot="toolbar"/>
    <main>
      <feedList/>
    </main>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'
import FeedList from './components/FeedList'

export default {
  name: 'App',
  components: {
    Toolbar,
    FeedList
  }
}
</script>

<style lang="scss">
@import './styles/theme';
@import './styles/common';

body {
  background: $theme-bg;
  color: $theme-txt;
  -webkit-font-smoothing: antialiased;
}

main {
  max-width: 960px;
  margin: 100px auto;

  .post {
    background: #fff;
    border-radius: .28571429rem;
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    padding: 16px;
  }
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>

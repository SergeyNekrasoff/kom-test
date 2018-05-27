<template>
  <div id="app">
    <toolbar slot="toolbar"/>
    <main>
      <feedlist/>
    </main>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'
// import FeedList from './components/FeedList'
import Feedlist from './components/Test'

export default {
  name: 'App',
  components: {
    Toolbar,
    Feedlist
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
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>

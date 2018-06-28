<template>
  <div id="app">
    <!-- <PageHeader/> -->
    <div class="ml-main" id="aaa">
      <router-view/>
    </div>
    <!-- <PageFooter/> -->
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  },
  methods: {

  },
  mounted() {

  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $defaultTextColor;
  box-sizing: border-box;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  // padding-top: 80px;
  max-width: 1180px;
  min-width: 980px;
  margin: 0 auto;
}
.ml-main {
  flex: 1 0 auto;
}
</style>

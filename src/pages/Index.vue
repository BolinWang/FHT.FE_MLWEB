<template>
  <div class="row">
      <div class="input-field col s4">
        <select ref="mySelect">
          <option value="1" selected>全部</option>
          <option value="2">集中式</option>
          <option value="3">整租</option>
          <option value="4">合租</option>
        </select>
        <label>Materialize Select</label>
      </div>
      <div class="col s8">
        123123312
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    /* eslint-disable */
    M.FormSelect.init(this.$refs.mySelect)
    /* eslint-enable */
  }
}
</script>

<style lang="scss" scoped>

</style>

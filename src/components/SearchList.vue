/*
 * @Author: chudequan
 * @Date: 2018-07-01 16:56:20
 * @Last Modified by: chudequan
 * @Last Modified time: 2018-07-01 16:56:42
 */

<template>
  <div class="search-list">
    <a
      v-for="(item, index) in searchList"
      :key="index"
      @click="$emit('changeFilterList', type, index)"
      :class="{'active': filterList[type] == index}"
      href="javascript: void(0)"
      class="search-item">
      {{item.text}}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Array,
      default: () => []
    },
    filterList: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .search-list {
    position: relative;
    flex: 1;
    .search-item {
      position: relative;
      z-index: 1;
      display: inline-block;
      margin-right: 10px;
      padding: 0 10px;
      line-height: 30px;
      font-size: 13px;
      color: #666;
      transition: color 0.3s;
      &.active {
        color: $mlThemeColor;
      }
      @media screen and (max-width: 1130px) {
        font-size: 12px;
        padding: 0 5px;
      }
    }
  }
</style>

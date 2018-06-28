<template>
  <div class="search-list">
    <a
      v-for="(item, index) in searchList"
      :key="index"
      @click="changeIndex(index)"
      :class="{'white-text': curIndex == index}"
      href="#!"
      class="search-item">
      {{item.text}}
    </a>
    <div class="follow-bg" :style="{ left: `${nowPosition}px`, width: `${nowWidth}px`}"></div>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
			type: Array,
			default: () => []
    },
    curIndex: {
			type: Number,
			default: () => 0
    },
  },
  data () {
    return {
      nowPosition: 0,
      nowWidth: 0
    }
  },
  methods: {
    changeIndex(i) {
      // this.curIndex = i
    }
  },
  watch: {
    curIndex(i) {
      console.log(i)
      this.nowPosition = this.$el.getElementsByClassName('search-item')[i].offsetLeft
      this.nowWidth = this.$el.getElementsByClassName('search-item')[i].getBoundingClientRect().width
    }
  },
  mounted() {
    // this.curIndex = 0
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
      color: $defaultTextColor;
      transition: color 0.3s;
    }
    .follow-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background-color: $mlThemeColor;
      border-radius: 4px;
      transition: left 0.3s, width 0.3s;
    }
  }
</style>

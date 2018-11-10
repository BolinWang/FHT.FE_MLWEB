/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:22:18
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-11-10 12:51:19
 */

<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item,index) in levelList"
        :key="item.path">
        <span
          v-if="item.redirect === 'noredirect' || index === levelList.length - 1"
          class="no-redirect">{{ item.name }}
        </span>
        <a
          class="router-link-active"
          v-else-if="item.name === '立即找房'"
          @click="$router.push(item.path)">{{ item.name }}
        </a>
        <router-link
          v-else
          :to="item.redirect || item.path">{{ item.name }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
export default {
  data () {
    return {
      levelList: []
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      const routePath = this.$route.path.split('/search/')
      const first = matched[0]
      let addMatched = []
      if (first && first.name !== '首页') {
        addMatched.push({name: '首页', path: '/'})
      }
      if (this.$route.name === '房间详情') {
        addMatched.push({name: '立即找房', path: routePath.length > 1 ? routePath[0] + '/search' : '/search'})
      }
      matched = addMatched.concat(matched)
      this.levelList = matched
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

<template>
  <section class="ml-header fixed">
    <div class="container_main flex">
      <div class="container_main--left">
        <img class="logo" src="../assets/images/mlzf.png" alt="logo" title="麦邻租房">
        <el-popover
          placement="bottom"
          popper-class="city_select--box"
          v-model="showCitySelect"
          trigger="click">
          <div class="city_select">
            <el-input
              placeholder="选择城市，Enter键查询"
              v-model="searchCity"
              @change="changeCity"
              @keydown.native.enter="changeCity"
              clearable>
            </el-input>
            <div class="city_items" v-loading="loading">
              <ul v-if="sortCityList.length">
                <li
                  v-for="item in sortCityList"
                  :key="item.char"
                  class="city_items--li">
                  <span class="char">{{item.char}}</span>
                  <span class="city" v-for="city in item.city" :key="city.cityId" @click="selectCity(city)">
                    {{city.name}}
                  </span>
                </li>
              </ul>
              <div class="noCity" v-else>
                无城市o(╥﹏╥)o
              </div>
            </div>
          </div>
          <div class="city-change" slot="reference">
            {{cityName}}
            <i class="icon"></i>
          </div>
        </el-popover>
      </div>
      <div class="container_main--right">
        <ul>
          <li
            v-for="item in pageLinks"
            :key="item.title"
            @click="openLink(item)"
            class="linkItem">
            {{item.title}}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import ConvertPinyin from '@/utils/pinyin'
const sortCityList = JSON.parse(localStorage.getItem('ML_SORTCITYLIST') || '[]')
export default {
  name: 'MLheader',
  data () {
    return {
      searchCity: '',
      showCitySelect: false,
      loading: false,
      cityName: this.$store.state.user.cityInfo.name || '杭州',
      sortCityList,
      pageLinks: [{
        title: '首页'
      }, {
        title: '立即找房',
        link: ''
      }, {
        title: 'APP下载',
        link: ''
      }, {
        title: '房东入驻',
        link: ''
      }, {
        title: '商业合作',
        link: ''
      }]
    }
  },
  methods: {
    selectCity (city) {
      this.$store.dispatch('UPDATECITY', city).then(() => {
        this.routerRefresh()
      })
    },
    routerRefresh () {
      const cityNamePinyin = ConvertPinyin(this.$store.state.user.cityInfo.name)
      const currentPath = (this.$route.meta && this.$route.meta.redirect) ? this.$route.meta.redirect : this.$route.path
      this.$router.push({
        path: `/${cityNamePinyin}/${currentPath}`
      })
    },
    changeCity () {
      if (this.searchCity) {
        this.loading = true
        setTimeout(() => {
          this.sortCityList = sortCityList.filter(item => {
            return (item.city.filter(city => {
              return city.name.toLowerCase().indexOf(this.searchCity.toLowerCase()) > -1
            })).length
          })
          this.loading = false
        }, 200)
      } else {
        this.sortCityList = sortCityList
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .ml-header {
    width: 100%;
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    color: #333;
    font-size: 18px;
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .container_main {
      width: 1280px;
      height: 100%;
      margin: 0 auto;
      justify-content: space-between;
      .container_main--left,
      .container_main--right {
        display: flex;
        justify-items: center;
        align-items: center;
      }
      .logo {
        width: 160px;
        height: 44px;
      }
      .linkItem {
        position: relative;
        display: inline-block;
        padding: 0 20px;
        cursor: pointer;
        &:last-child {
          padding-right: 0;
        }
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          border-bottom: 2px solid #ff8c07;
        }
        &:hover {
          color: #ff8c07;
          &::before {
            width: 100%;
          }
        }
      }
      .city-change {
        padding: 0 10px;
        cursor: pointer;
        -webkit-user-select: none;
        position: relative;
        .icon {
          position: absolute;
          right: -2px;
          top: 40px;
          width: 0;
          height: 0;
          border-bottom: 8px solid #ccc;
          border-left: 8px solid transparent;
        }
      }
    }
  }
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<style lang="scss">
.city_select--box {
  width: 460px;
  height: auto;
  min-height: 130px;
  max-height: 430px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px 30px;
  overflow: auto;
  .el-input input {
    border-color: rgba(245,245,245,1);
    &:focus {
      border-color: #ff8c07 !important;
      box-shadow: 0 1px 0 0 #ff8c07 !important;
    }
  }
  .city_items li {
    display: inline-block;
    width: 50%;
    padding: 8px 0;
    line-height: 24px;
    span {
      &.char {
        font-weight: 600;
        color: #333;
      }
      &.city {
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
  .noCity {
    color: #ddd;
  }
}
</style>

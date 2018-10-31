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
              clearable
              class="input_select_city">
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
          <template v-for="item in pageLinks">
            <el-popover
              v-if="item.type === 'popover'"
              :key="item.title"
              title="APP下载"
              trigger="hover"
              content="APP下载">
              <li
                slot="reference"
                class="linkItem"
                style="padding-right: 20px;">
                {{item.title}}
              </li>
            </el-popover>
            <li
              v-else
              :key="item.title"
              @click="openLink(item)"
              class="linkItem">
              {{item.title}}
            </li>
          </template>
        </ul>
      </div>
    </div>
    <el-dialog
      title="房东入驻"
      :visible.sync="showUserRequest"
      center
      :modal-append-to-body="false"
      width="30%">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="100">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" label-width="100">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUserRequest = false">取 消</el-button>
        <el-button type="primary" @click="showUserRequest = false">确 定</el-button>
      </span>
    </el-dialog>
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
        title: '首页',
        isHome: true,
        type: 'link',
        link: process.env.WEB_LINK
      }, {
        title: '立即找房',
        type: 'link',
        link: this.$route.path
      }, {
        title: 'APP下载',
        type: 'popover'
      }, {
        title: '房东入驻',
        type: 'userRequest'
      }, {
        title: '商业合作',
        type: 'bizpartner'
      }],
      showUserRequest: false,
      showBizpartner: false,
      form: {}
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
          this.sortCityList = (sortCityList.map(item => {
            let filterCity = item.city.filter(city => {
              return city.name.toLowerCase().indexOf(this.searchCity.toLowerCase()) > -1
            })
            if (filterCity.length) {
              return {
                char: item.char,
                city: filterCity
              }
            }
          })).filter(arr => arr)
          this.loading = false
        }, 200)
      } else {
        this.sortCityList = sortCityList
      }
    },
    openLink (item) {
      switch (item.type) {
        default:
        case 'link':
          if (item.isHome) {
            window.open(item.link)
          } else {
            location.href = item.link
          }
          break
        case 'userRequest':
          this.showUserRequest = true
          break
        case 'bizpartner':
          this.showBizpartner = true
          break
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
        display: inline-block;
        width: 20px;
      }
      &.city {
        cursor: pointer;
      }
    }
  }
  .noCity {
    padding: 10px;
    color: #ddd;
  }
}
.input_select_city input {
  border: 0 none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
}
</style>

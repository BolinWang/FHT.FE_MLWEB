/*
 * @Author: chudequan
 * @Date: 2018-07-01 17:10:30
 * @Last Modified by: chudequan
 * @Last Modified time: 2018-07-01 17:10:30
 */
<template>
  <div>
    <div class="row ml-search-container">
      <div class="city-select input-field">
        <select ref="dropdown" v-model="cityId">
          <option
          :value="item.cityId"
          v-for="(item, index) in cityList"
          :key="index">{{item.name}}</option>
        </select>
      </div>
      <div class="ml-search">
        <i class="icon icon-search"></i>
        <input v-model="keyword" type="text" class="browser-default" placeholder="搜索您想住的区域或小区" @keypress.enter="searchByKeyword">
        <a class="waves-effect waves-light btn" @click="searchByKeyword">搜索</a>
      </div>
    </div>
    <div class="row">
      <div class="card filter-card ml-card">
        <div class="card-content">
          <div class="filter-item justify-content-fs">
            <span class="title">类型</span>
            <SearchList v-if="regionList.length" type="typeList" :searchList="typeList" :filterList="filterList" @changeFilterList="changeFilterList"></SearchList>
          </div>
          <div class="filter-item justify-content-fs">
            <span class="title">区域</span>
            <SearchList v-if="regionList.length" type="regionList" :searchList="regionList" :filterList="filterList" @changeFilterList="changeFilterList"></SearchList>
          </div>
          <div class="filter-item justify-content-fs">
            <span class="title">租金</span>
            <SearchList v-if="regionList.length" type="rentalList" :searchList="rentalList" :filterList="filterList" @changeFilterList="changeFilterList"></SearchList>
            <!-- <div class="rental-input-group">
              <input type="number" class="browser-default">
              <input type="number" class="browser-default" @keypress.enter="changeRental">
            </div> -->
          </div>
          <div class="filter-item justify-content-fs">
            <span class="title">居室</span>
            <SearchList v-if="regionList.length" type="chamberList" :searchList="chamberList" :filterList="filterList" @changeFilterList="changeFilterList"></SearchList>
          </div>
          <div class="filter-item justify-content-fs">
            <span class="title">面积</span>
            <SearchList v-if="regionList.length" type="areaList" :searchList="areaList" :filterList="filterList" @changeFilterList="changeFilterList"></SearchList>
          </div>
          <div class="filter-item justify-content-fs">
            <span class="title">装修</span>
            <SearchList v-if="regionList.length" type="decorationList" :searchList="decorationList" :filterList="filterList" @changeFilterList="changeFilterList"></SearchList>
          </div>
        </div>
      </div>
      <div v-show="chipList.length" class="card filter-options ml-card">
        <div class="card-content">
          <div class="filter-item">
            <span class="title">已选</span>
            <span class="delete" @click="deleteChipList"><i class="icon icon-delete"></i>删除选项</span>
            <div
            class="chip"
            v-for="item in chipList"
            :key="item.text">
              {{item.text}}
              <i class="close material-icons" @click="filterList[item.from] = 0">close</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <div class="card filter-tabs ml-card">
        <div class="card-content">
          <div class="filter-item room-count">
            共 <span>{{roomCount}}</span> 套房源
          </div>
          <div class="filter-item">
            <a href="javascript: void(0)">默认排序</a>
          </div>
          <div class="filter-item">
            <a href="javascript: void(0)">最新发布</a>
          </div>
          <div class="filter-item">
            <a href="javascript: void(0)">价格<i class="icon">1</i></a>
          </div>
          <div class="filter-item">
            <a href="javascript: void(0)" class="active">面积<i class="icon">1</i></a>
          </div>
        </div>
      </div>
    </div> -->
    <div class="room-list-container" v-if="roomList.length">
      <div class="row">
        <div
        v-for="(item, index) in roomList"
        :key="index"
        class="col s3">
          <div class="card room-card">
            <div class="card-image">
              <img v-lazy="item.src">
            </div>
            <div class="card-content">
              <div class="justify-content-sb room-info">
                <span class="room-name truncate">{{item.name}}</span>
                <span class="room-region truncate"><i class="material-icons">location_on</i>{{item.region}}</span>
              </div>
              <div class="justify-content-fs room-info">
                <span class="room-area"><span class="truncate">{{item.area}}</span></span>
                <span class="room-layout">{{item.layout}}</span>
                <span class="room-decoration">{{item.decoration}}</span>
              </div>
              <div class="justify-content-sb room-info">
                <span class="room-type info" v-if="item.tagName == '公寓'">{{item.tagName}}</span>
                <span class="room-type warn" v-else-if="item.tagName == '合租'">{{item.tagName}}</span>
                <span class="room-type success" v-else>{{item.tagName}}</span>
                <span class="room-price">&yen;{{parseInt(item.price)}}<span style="font-size: 12px;">/月</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-pagination">
        <ul class="pagination center-align">
          <li v-show="curPage > 1" class="waves-effect" @click="changePage(Number(curPage) - 1)">
            <a href="javascript: void(0)"><i class="material-icons">chevron_left</i></a>
          </li>
          <li
          v-for="(item, index) in pageList"
          :key="index"
          :class="{'active': item == curPage}"
          @click="isNaN(item) ? '' : item == curPage ? '' : changePage(item)"
          class="waves-effect"><a href="javascript: void(0)">{{item}}</a></li>
          <li v-show="curPage < pageCount" class="waves-effect" @click="changePage(Number(curPage) + 1)">
            <a href="javascript: void(0)"><i class="material-icons">chevron_right</i></a>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="row justify-content-ct noData">
      <div v-if="isLoading" class="room-loading">
        <div class="preloader-wrapper big active">
          <div class="spinner-layer">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <img src="../assets/images/no-data.png" width="128" height="128" alt="">
        <p>当前选项暂无房源数据QAQ</p>
      </div>
    </div>
  </div>
</template>

<script>
import SearchList from '@/components/SearchList'
import {
  getAreaListApi,
  getRoomListApi,
  getCityListApi
} from '@/api/searchRoomApi'
export default {
  components: {
    SearchList
  },
  data () {
    return {
      cityId: null,
      cityList: [],
      typeList: [
        {
          val: null,
          text: '不限'
        },
        {
          val: 3,
          text: '品牌公寓'
        },
        {
          val: 1,
          text: '整租'
        },
        {
          val: 2,
          text: '合租'
        }
      ],
      regionList: [
      ],
      rentalList: [
        {
          text: '不限',
          val: {
            minPrice: null,
            maxPrice: null
          }
        },
        {
          text: '1500元以下',
          val: {
            minPrice: null,
            maxPrice: 1500
          }
        },
        {
          text: '1500-2000元',
          val: {
            minPrice: 1500,
            maxPrice: 2000
          }
        },
        {
          text: '2000-2500元',
          val: {
            minPrice: 2000,
            maxPrice: 2500
          }
        },
        {
          text: '2500-3000元',
          val: {
            minPrice: 2500,
            maxPrice: 3000
          }
        },
        {
          text: '3000-4000元',
          val: {
            minPrice: 3000,
            maxPrice: 4000
          }
        },
        {
          text: '4000-5000元',
          val: {
            minPrice: 4000,
            maxPrice: 5000
          }
        },
        {
          text: '5000元以上',
          val: {
            minPrice: 5000,
            maxPrice: null
          }
        }
      ],
      chamberList: [
        {
          text: '不限',
          val: {
            min: 1,
            max: 1
          }
        },
        {
          text: '一室',
          val: {
            min: 1,
            max: 1
          }
        },
        {
          text: '二室',
          val: {
            min: 2,
            max: 2
          }
        },
        {
          text: '三室',
          val: {
            min: 3,
            max: 3
          }
        },
        {
          text: '四室及以上',
          val: {
            min: 4,
            max: null
          }
        }
      ],
      areaList: [
        {
          text: '不限',
          val: {
            maxRoomArea: null,
            minRoomArea: null
          }
        },
        {
          text: '40平以下',
          val: {
            maxRoomArea: 40,
            minRoomArea: null
          }
        },
        {
          text: '40-60平',
          val: {
            maxRoomArea: 60,
            minRoomArea: 40
          }
        },
        {
          text: '60-80平',
          val: {
            maxRoomArea: 80,
            minRoomArea: 60
          }
        },
        {
          text: '80-100平',
          val: {
            maxRoomArea: 100,
            minRoomArea: 80
          }
        },
        {
          text: '100-120平',
          val: {
            maxRoomArea: 120,
            minRoomArea: 100
          }
        },
        {
          text: '120平以上',
          val: {
            maxRoomArea: null,
            minRoomArea: 120
          }
        }
      ],
      decorationList: [
        {
          text: '不限',
          val: null
        },
        {
          text: '毛坯',
          val: '1'
        },
        {
          text: '简装',
          val: '2'
        },
        {
          text: '精装',
          val: '3'
        },
        {
          text: '豪华',
          val: '4'
        }
      ],
      pageCount: 0,
      curPage: 0,
      roomList: [],
      roomCount: 0,
      pageList: [],
      filterList: {
        typeList: 0,
        regionList: 0,
        rentalList: 0,
        chamberList: 0,
        areaList: 0,
        decorationList: 0
      },
      keyword: '',
      isLoading: true
    }
  },
  computed: {
    chipList () {
      let arr = []
      for (let n in this.filterList) {
        if (this.filterList[n] > 0) {
          arr.push({
            from: n,
            text: this[n][this.filterList[n]].text
          })
        }
      }
      return arr
    }
  },
  methods: {
    setFilterList () {
      for (let k in this.$route.query) {
        if (this.filterList[k] !== undefined) {
          this.filterList[k] = this.$route.query[k]
        }
      }
      this.keyword = this.$route.query.keyword || ''
    },
    getRoomList (reset) {
      this.isLoading = true
      if (reset) {
        this.roomList.length = 0
      }
      this.curPage = Number(this.$route.query.page) || 1
      let params = {}
      for (let k in this.filterList) {
        if (this.filterList[k] !== 0) {
          switch (k) {
            case 'typeList':
              if (this[k][this.filterList[k]].val === 3) {
                params.type = 1
              } else {
                params.type = 2
                params.houseRentType = this[k][this.filterList[k]].val
              }
              break
            case 'regionList':
              params.regionId = this[k][this.filterList[k]].val
              break
            case 'rentalList':
              params.maxPrice = this[k][this.filterList[k]].val.maxPrice
              params.minPrice = this[k][this.filterList[k]].val.minPrice
              break
            case 'chamberList':
              params.chamberCounts = [this[k][this.filterList[k]].val]
              break
            case 'areaList':
              params.minRoomArea = this[k][this.filterList[k]].val.minRoomArea
              params.maxRoomArea = this[k][this.filterList[k]].val.maxRoomArea
              break
            case 'decorationList':
              params.decorationDegrees = [this[k][this.filterList[k]].val]
              break
          }
        }
      }
      if (this.$route.query.keyword) {
        params.keyword = this.$route.query.keyword
      }
      params = Object.assign({
        cityId: this.cityId,
        pageNo: this.curPage,
        fullRentType: 1,
        pageSize: 20
      }, params)
      getRoomListApi(params).then((res) => {
        this.isLoading = false
        if (Number(res.code) !== 0) {
          /* eslint-disable */
          M.toast({html: res.message})
          /* eslint-enable */
          return
        }
        let data = res.data
        this.pageCount = data.totalPages
        this.roomCount = data.totalRecords
        data.resultList.forEach((item, index) => {
          if (item.type === 2) {
            item.info = item.name.split('·')
            item.name = item.info[1]
            item.showTagList = [{
              tagName: item.info[0]
            }]
            item.roomArea = item.info[3] ? item.info[2] + ' ' + item.info[3] : item.info[2]
          }
          this.roomList.push({
            src: item.imageUrl,
            name: item.name,
            region: item.region,
            area: item.roomArea,
            layout: item.houseType,
            decoration: item.decorationDegree,
            price: item.minRentPrice,
            tagName: item.showTagList ? item.showTagList[0].tagName : '公寓'
          })
        })
        this.setPageList()
      })
    },
    setPageList () {
      let count = Number(this.pageCount)
      let curPage = Number(this.curPage)
      let startPage = curPage > 3 ? (Math.min(curPage - 2, Math.max(count - 4, 1))) : 1
      let endPage = startPage + 4 > count ? count : startPage + 4
      this.pageList.length = 0
      if (curPage > 3) {
        this.pageList.push(1)
        if (curPage > 4) {
          this.pageList.push('...')
        }
      }
      for (let i = startPage; i <= endPage; i++) {
        this.pageList.push(i)
      }
      if (startPage + 4 < count) {
        if (startPage + 5 < count) {
          this.pageList.push('...')
        }
        this.pageList.push(count)
      }
    },
    getCityList () {
      getCityListApi().then((res) => {
        if (Number(res.code) !== 0) {
          return
        }
        res.data.cityList.forEach((item, index) => {
          this.cityList.push({
            cityId: item.areaId,
            name: item.areaName
          })
        })
      })
    },
    getAreaList () {
      getAreaListApi({
        cityId: this.cityId
      }).then((res) => {
        this.setFilterList()
        res.data.areaZones.forEach((item, index) => {
          this.regionList.push({
            text: item.areaName,
            val: item.areaId
          })
        })
        this.regionList[0].text = '不限'
        this.getRoomList(true)
      })
    },
    changePage (index) {
      let params = {}
      for (let k in this.filterList) {
        if (this.filterList[k] !== 0) {
          params[k] = this.filterList[k]
        }
      }
      if (this.$route.query.keyword) {
        params.keyword = this.$route.query.keyword
      }

      params.page = index
      this.$router.push({
        path: '/search',
        query: params
      })
    },
    deleteChipList () {
      for (let n in this.filterList) {
        this.filterList[n] = 0
      }
      this.$router.push({
        path: '/search'
      })
    },
    changeFilterList (key, val) {
      this.filterList[key] = val
      let params = {}
      for (let k in this.filterList) {
        if (this.filterList[k] !== 0) {
          params[k] = this.filterList[k]
        }
      }
      this.$router.push({
        path: '/search',
        query: params
      })
    },
    searchByKeyword () {
      if (this.keyword === '') {
        /* eslint-disable */
        M.toast({html: '搜索条件不能为空！'})
        /* eslint-enable */
        return
      }
      let params = {}
      for (let k in this.filterList) {
        if (this.filterList[k] !== 0) {
          params[k] = this.filterList[k]
        }
      }
      params.keyword = this.keyword
      this.$router.push({
        path: '/search',
        query: params
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    },
    cityList () {
      this.$nextTick(() => {
        /* eslint-disable */
        M.FormSelect.init(this.$refs.dropdown)
        /* eslint-enable */
        document.querySelectorAll('.dropdown-content')[0].style.height = '500px'
      })
    },
    cityId (newVal, oldVal) {
      if (!oldVal || newVal === oldVal) {
        return
      }
      // this.$cookies.remove('MLUSERCITY')
      this.$cookies.set('MLUSERCITY', newVal, 60 * 60 * 24 * 30, '/')
      location.href = '/search'
    }
  },
  mounted () {
    this.cityId = this.$cookies.get('MLUSERCITY') || '330100'
    this.getCityList()
    this.getAreaList()
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: "FuturaStd-Condensed";
    src: url(../assets/FuturaStd-Condensed.otf)
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type=number]{
    -moz-appearance: textfield;
  }
  .ml-search-container {
    display: flex;
    align-items: center;
    margin-top: 40px;
    .dropdown-content {
      max-height: 300px !important;
      overflow-y: scroll;
    }
  }
  .ml-search {
    position: relative;
    display: flex;
    width: 800px;
    height: 44px;
    background-color: #fff;
    .icon-search {
      position: absolute;
      top: 15px;
      left: 15px;
      width: 16px;
      height: 16px;
      background-image: url(../assets/images/search-icon.png);
      background-size: 100%;
      display: none;
    }
    input {
      position: relative;
      flex: 1;
      height: 100%;
      outline: none;
      border: 0;
      padding-left: 10px;
      background-color: transparent;
      transition: box-shadow .3s;
      &:focus {
        box-shadow: 0 0 15px 0 rgba(0,0,0,0.10);
      }
    }
    .btn {
      width: 120px;
      height: 44px;
      padding: 0;
      line-height: 44px;
      font-size: 18px;
      background-color: $mlThemeColor;
      box-shadow: none;
    }
  }
  .city-select {
    position: relative;
    margin: 0;
    width: 100px;
    height: 44px;
    border-right: 1px solid #f1f1f1;
    background-color: #fff;
  }
  .ml-card {
    box-shadow: none;
    margin: 0;
  }
  .filter-card {
    margin: 0;
    .filter-item {
      height: 30px;
    }
    @at-root {
      .filter-item {
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        .title {
          font-size: 14px;
          font-weight: bold;
          margin-right: 10px;
          @media screen and (max-width: 1130px) {
            font-size: 13px;
          }
        }
        .rental-input-group {
          position: relative;
          display: flex;
          justify-content: space-between;
          width: 180px;
          &::after {
            content: "";
            position: absolute;
            top: 15px;
            left: 87px;
            width: 6px;
            height: 0;
            border-top: 1px solid #333;
          }
          input {
            width: 80px;
            height: 30px;
            margin: 0;
            padding: 0;
            padding: 0 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: none;
          }
        }
      }
    }
  }
  .filter-options {
    background-color: #fcfcfc;
    .filter-item {
      position: relative;
      display: inline-block;
      line-height: 1;
      font-size: 12px;
      padding-right: 70px;
      .title {
        margin-right: 20px;
      }
    }
    .chip {
      height: 24px;
      line-height: 24px;
      background-color: transparent;
      border: 1px solid #ddd;
      border-radius: 2px;
      padding: 0 10px;
      margin-bottom: 0;
      margin-right: 20px;
      &:hover {
        border-color: $mlThemeColor;
        .close {
          color: $mlThemeColor;
        }
      }
      .close {
        color: #ccc;
        line-height: 24px;
      }
    }
    .delete {
      position: absolute;
      top: 6px;
      right: 0;
      padding-left: 16px;
      cursor: pointer;
      &:hover {
        color: $mlThemeColor;
        & ~ .chip {
          border-color: $mlThemeColor;
          .close {
            color: $mlThemeColor;
          }
        }
        .icon-delete {
          background-image: url(../assets/images/delete-icon-active.png);
        }
      }
      .icon-delete {
        position: absolute;
        top: 0;
        left: 0;
        width: 12px;
        height: 12px;
        background-image: url(../assets/images/delete-icon.png);
        background-size: 100%;
      }
    }
  }
  .room-list-container {
    margin-bottom: 50px;
    .row {
      margin-left: -10px;
      margin-right: -10px;
    }
    .col {
      padding: 0 10px;
    }
    @at-root {
      .room-card {
        margin: 0 0 20px;
        box-shadow: none;
        cursor: pointer;
        transition: all .3s;
        &:hover {
          box-shadow: 0 15px 30px rgba(0,0,0,.1);
          transform: translate3d(0,-2px,0);
        }
        .card-image {
          padding: 10px 10px 0;
          width: 100%;
          height: 205px;
          overflow: hidden;
          @media screen and (max-width: 1100px) {
            height: 180px;
          }
          @media screen and (max-width: 1000px) {
            height: 160px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .card-content {
          padding: 15px;
          font-size: 12px;
          line-height: 1;
          color: #999;
          .room-info + .room-info {
            margin-top: 10px;
          }
          .room-name {
            flex: 1;
            font-size: 14px;
            color: $defaultTextColor;
            font-weight: bold;
          }
          .room-region {
            position: relative;
            box-sizing: content-box;
            width: 3em;
            padding-left: 14px;
            .material-icons {
              position: absolute;
              top: -1px;
              left: 0;
              font-size: 14px;
            }
          }
          .room-area, .room-layout {
            position: relative;
            margin-right: 20px;
            max-width: 40%;
            &::after {
              content: "";
              position: absolute;
              top: 1px;
              right: -10px;
              width: 0;
              height: 10px;
              border-right: 1px solid #ddd;
              @media screen and (max-width: 1100px) {
                right: -5px;
              }
            }
            @media screen and (max-width: 1100px) {
              margin-right: 10px;
            }
          }
          .room-type {
            padding: 2px 5px;
            background-color: #ff0000;
            &.success {
              @include ml-tag(#2bb198, rgba(43,177,152,0.15))
            }
            &.info {
              @include ml-tag(#f7ba2a, rgba(247,186,42,0.15))
            }
            &.warn {
              @include ml-tag(#ff6b23, rgba(255,107,35,0.15))
            }
          }
          .room-price {
            font-family: "FuturaStd-Condensed";
            color: $mlThemeColor;
            font-size: 18px;
          }
        }
      }
    }
  }
  .filter-tabs {
    margin: 0;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
      line-height: 20px;
      margin-right: 30px;
      &.room-count {
        font-size: 14px;
        span {
          color: $mlThemeColor;
        }
      }
      a {
        color: #666;
        .icon {
          display: none;
        }
        &.active {
          color: $mlThemeColor;
          .icon {
            display: inline-block;
          }
        }
      }
    }
  }
  .ml-pagination {
    margin-bottom: 60px;
  }
  .noData {
    min-height: 200px;
    text-align: center;
    color: #666;
  }
</style>

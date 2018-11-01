/*
 * @Author: chudequan
 * @Date: 2018-07-01 17:10:30
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-11-01 18:49:33
 */
<template>
  <div class="page_container">
    <div class="row ml-search-container">
      <div class="ml-search">
        <i class="icon icon-search"></i>
        <input
          v-model="keyword"
          type="text"
          class="browser-default"
          placeholder="搜索您想住的区域或小区"
          @keypress.enter="searchByKeyword">
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
              <i class="close material-icons" @click="deleteSingle(item)">close</i>
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
          <div class="card room-card" @click="roomDetailPage(item)">
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
import searchParams from '@/options/search'
import { searchApi } from '@/api/searchRoomApi'
import ConvertPinyin from '@/utils/pinyin'
export default {
  components: {
    SearchList
  },
  data () {
    return {
      ...searchParams,
      cityId: null,
      cityList: [],
      regionList: [],
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
  created () {
    this.getCityList()
  },
  mounted () {

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
      searchApi.getRoomList(params).then((res) => {
        this.isLoading = false
        if (res.code * 1 !== 0) {
          return false
        }
        let data = res.data || {}
        this.pageCount = data.totalPages
        this.roomCount = data.totalRecords
        this.roomList = (data.resultList || []).map((item, index) => {
          if (item.type === 2) {
            item.info = item.name.split('·')
            item.name = item.info[1]
            item.showTagList = [{
              tagName: item.info[0]
            }]
            item.roomArea = item.info[3] ? item.info[2] + ' ' + item.info[3] : item.info[2]
          }
          return {
            ...item,
            src: item.imageUrl,
            name: item.name,
            region: item.region,
            area: item.roomArea,
            layout: item.houseType,
            decoration: item.decorationDegree,
            price: item.minRentPrice,
            tagName: item.showTagList ? item.showTagList[0].tagName : '公寓'
          }
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
      this.cityList = JSON.parse(localStorage.getItem('ML_CITYLIST') || '[]')
      this.cityId = this.$store.state.user.cityInfo.cityId || 330100
      this.getAreaList()
    },
    getAreaList () {
      searchApi.getAreaList({
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
      this.routerRefresh(params)
    },
    deleteChipList () {
      for (let n in this.filterList) {
        this.filterList[n] = 0
      }
      this.routerRefresh()
    },
    deleteSingle (item) {
      this.filterList[item.from] = 0
      let params = {}
      for (let k in this.filterList) {
        if (this.filterList[k] !== 0) {
          params[k] = this.filterList[k]
        }
      }
      if (this.$route.query.keyword) {
        params.keyword = this.$route.query.keyword
      }
      this.routerRefresh(params)
    },
    changeFilterList (key, val) {
      this.filterList[key] = val
      let params = {}
      for (let k in this.filterList) {
        if (this.filterList[k] !== 0) {
          params[k] = this.filterList[k]
        }
      }
      this.routerRefresh(params)
    },
    searchByKeyword () {
      if (this.keyword === '') {
        this.$message.info('搜索条件不能为空！')
        return
      }
      let params = {}
      for (let k in this.filterList) {
        if (this.filterList[k] !== 0) {
          params[k] = this.filterList[k]
        }
      }
      params.keyword = this.keyword
      this.routerRefresh(params)
    },
    routerRefresh (query) {
      const cityNamePinyin = ConvertPinyin(this.$store.state.user.cityInfo.name)
      const currentPath = (this.$route.meta && this.$route.meta.redirect) ? this.$route.meta.redirect : this.$route.path
      this.$router.push({
        path: `/${cityNamePinyin}/${currentPath}`,
        query
      })
    },
    roomDetailPage (item) {
      let query = {
        houseType: item.type,
        estateRoomTypeId: item.type === 1 ? item.id : undefined,
        roomId: item.type === 2 ? item.id : undefined,
        rentPrice: item.type === 1 ? item.minRentPrice : undefined
      }
      this.$router.push({
        path: `/${this.$route.path}/${item.roomCode}`,
        query
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.page_container {
  width: 1200px;
}
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
    margin-top: 20px;
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
      &:hover {
        color: #fff;
      }
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

<style lang="scss">
.ml-search-container {
  .el-select input {
    padding: 0 15px;
    margin: 0;
    border-bottom: 0 none !important;
  }
}
</style>

<template>
  <div>
    <div class="row">
      <div class="ml-search">
        <i class="icon icon-search"></i>
        <input type="text" class="browser-default" placeholder="搜索您想住的区域或小区">
        <a class="waves-effect waves-light btn">搜索</a>
      </div>
    </div>
    <div class="row">
      <div class="card filter-card ml-card">
        <div class="card-content">
          <div>
            <div class="filter-item">
              <span class="title">类型:</span>
              <div class="search-list">
                <a
                  v-for="(item, index) in typeList"
                  :key="index"
                  @click="changeIndex('typeIndex', index)"
                  :class="{'active': typeIndex == index}"
                  href="javascript: void(0)"
                  class="search-item">
                  {{item.text}}
                </a>
              </div>
            </div>
            <div class="filter-item">
              <span class="title">区域:</span>
              <div class="search-list">
                <a
                  v-for="(item, index) in regionList"
                  :key="index"
                  @click="changeIndex('regionIndex', index)"
                  :class="{'active': regionIndex == index}"
                  href="javascript: void(0)"
                  class="search-item">
                  {{item.text}}
                </a>
              </div>
            </div>
            <div class="filter-item">
              <span class="title">租金:</span>
              <div class="search-list">
                <a
                  v-for="(item, index) in rentalList"
                  :key="index"
                  @click="changeIndex('rentalIndex', index)"
                  :class="{'active': rentalIndex == index}"
                  href="javascript: void(0)"
                  class="search-item">
                  {{item.text}}
                </a>
              </div>
              <div class="rental-input-group">
                <input type="number" class="browser-default">
                <input type="number" class="browser-default" @keypress.enter="changeRental">
              </div>
            </div>
            <div class="filter-item">
              <span class="title">居室:</span>
              <div class="search-list">
                <a
                  v-for="(item, index) in chamberList"
                  :key="index"
                  @click="changeIndex('chamberIndex', index)"
                  :class="{'active': chamberIndex == index}"
                  href="javascript: void(0)"
                  class="search-item">
                  {{item.text}}
                </a>
              </div>
            </div>
            <div class="filter-item">
              <span class="title">面积:</span>
              <div class="search-list">
                <a
                  v-for="(item, index) in areaList"
                  :key="index"
                  @click="changeIndex('areaIndex', index)"
                  :class="{'active': areaIndex == index}"
                  href="javascript: void(0)"
                  class="search-item">
                  {{item.text}}
                </a>
              </div>
            </div>
            <div class="filter-item">
              <span class="title">装修:</span>
              <div class="search-list">
                <a
                  v-for="(item, index) in decorationList"
                  :key="index"
                  @click="changeIndex('decorationIndex', index)"
                  :class="{'active': decorationIndex == index}"
                  href="javascript: void(0)"
                  class="search-item">
                  {{item.text}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="chipList.length" class="card filter-options ml-card">
        <div class="card-content">
          <div class="filter-item">
            <span class="title">已选</span>
            <div
            class="chip"
            v-for="(item, index) in chipList"
            :key="item.type">
              {{item.text}}
              <i class="close material-icons" @click="deleteChip(item, index)">close</i>
            </div>
            <span class="delete" @click="deleteChipList"><i class="icon icon-delete"></i>删除选项</span>
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
                <span class="room-region truncate">{{item.region}}</span>
              </div>
              <div class="justify-content-fs room-info">
                <span class="room-area">{{item.area}}</span>
                <span class="room-layout">{{item.layout}}</span>
                <span class="room-decoration">{{item.decoration}}</span>
              </div>
              <div class="justify-content-sb room-info">
                <span class="room-type warn">合租</span>
                <span class="room-price">&yen;{{parseInt(item.price)}}/月</span>
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
    <div v-else class="row room-loading justify-content-ct">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getAreaListApi,
  getRoomListApi
} from '@/api/searchRoomApi'
export default {
  data () {
    return {
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
            max: null,
            min: null
          }
        },
        {
          text: '40平以下',
          val: {
            max: 40,
            min: null
          }
        },
        {
          text: '40-60平',
          val: {
            max: 60,
            min: 40
          }
        },
        {
          text: '60-80平',
          val: {
            max: 80,
            min: 60
          }
        },
        {
          text: '80-100平',
          val: {
            max: 100,
            min: 80
          }
        },
        {
          text: '100-120平',
          val: {
            max: 120,
            min: 100
          }
        },
        {
          text: '120平以上',
          val: {
            max: null,
            min: 120
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
      chipList: [],
      pageList: [],
    }
  },
  computed: {
    typeIndex: {
      get () {
        return this.$store.state.typeIndex
      },
      set (val) {
        this.$store.commit('changefilter', {
          item: 'typeIndex',
          index: val
        })
      }
    },
    regionIndex: {
      get () {
        return this.$store.state.regionIndex
      },
      set (val) {
        this.$store.commit('changefilter', {
          item: 'regionIndex',
          index: val
        })
      }
    },
    ...mapState({
      cityId: state => state.cityId,
      rentalIndex: state => state.rentalIndex,
      chamberIndex: state => state.chamberIndex,
      areaIndex: state => state.areaIndex,
      decorationIndex: state => state.decorationIndex,
    })
  },
  methods: {
    getSearchParams() {
      this.curPage = this.$route.query.page || 1
      this.typeIndex = this.$route.query.type || 0
      this.regionIndex = this.$route.query.region || 0
    },
    getRoomList(reset) {
      if (reset) {
        this.roomList.length = 0
      }
      getRoomListApi({
        cityId: this.cityId,
        pageNo: Number(this.curPage),
        fullRentType: 1,
        pageSize: 20
      }).then((res) => {
        let data = res.data
        this.pageCount = data.totalPages
        this.roomCount = data.totalRecords
        data.resultList.forEach((item ,index) => {
          this.roomList.push({
            src: item.imageUrl,
            name: item.name,
            region: item.region,
            area: item.roomArea,
            layout: item.houseType,
            decoration: item.decorationDegree,
            price: item.minRentPrice
          })
        })
      })
    },
    getAreaList() {
      getAreaListApi({
        cityId: this.cityId
      }).then((res) => {
        res.data.areaZones.forEach((item ,index) => {
          this.regionList.push({
            text: item.areaName,
            val: item.areaId
          })
        })
        this.regionList[0].text = '不限'
      })
    },
    changePage(index) {
      this.$router.push({
        path: '/search',
        query: {
          page: index
        }
      })
    },
    changeIndex(item, index) {
      this.$store.commit('changefilter', {
        item,
        index
      })
    },
    changeChipList(type, list, index) {
      let updateFlag = false
      this.chipList.forEach((item, i) => {
        if(item.type == type){
          updateFlag = true
          if(index == 0){
            this.chipList.splice(i, 1)
          } else {
            item.text = this[list][index].text
          }
        }
      })
      if(updateFlag || index == 0){
        return
      }
      this.chipList.push({
        text: this[list][index].text,
        type: type
      })
    },
    deleteChip(item, i) {
      this.chipList.splice(i, 1)
      this.changeIndex(item.type, 0)
    },
    deleteChipList() {
      this.chipList.length = 0
      this.changeIndex('typeIndex', 0)
      this.changeIndex('regionIndex', 0)
      this.changeIndex('rentalIndex', 0)
      this.changeIndex('chamberIndex', 0)
      this.changeIndex('areaIndex', 0)
      this.changeIndex('decorationIndex', 0)
    },
    changeRental() {
      this.changeIndex('rentalIndex', 9999)
    }
  },
  watch: {
    pageCount(count) {
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
    '$route' (to, from) {
      this.$router.go(0);
    },
    typeIndex(val) {
      this.changeChipList('typeIndex', 'typeList', val)
    },
    regionIndex(val) {
      this.changeChipList('regionIndex', 'regionList', val)
    },
    rentalIndex(val) {
      this.changeChipList('rentalIndex', 'rentalList', val)
    },
    chamberIndex(val) {
      this.changeChipList('chamberIndex', 'chamberList', val)
    },
    areaIndex(val) {
      this.changeChipList('areaIndex', 'areaList', val)
    },
    decorationIndex(val) {
      this.changeChipList('decorationIndex', 'decorationList', val)
    },
  },
  mounted() {
    this.getSearchParams()
    this.getAreaList()
    this.getRoomList(true)
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type=number]{
    -moz-appearance: textfield;
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
    }
    input {
      position: relative;
      flex: 1;
      height: 100%;
      outline: none;
      border: 0;
      padding-left: 46px;
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
  .ml-card {
    box-shadow: none;
    margin: 0;
  }
  .filter-card {
    margin: 0;
    @at-root {
      .filter-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .title {
          font-size: 14px;
          font-weight: bold;
          // line-height: 30px;
          margin-right: 10px;
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
      margin-bottom: 0;
      line-height: 1;
      font-size: 12px;
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
      position: relative;
      padding-left: 16px;
      cursor: pointer;
      &:hover {
        color: $mlThemeColor;
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
        &:hover {
          box-shadow: 0 0 15px 0 rgba(0,0,0,0.10);
        }
        .card-image {
          padding: 10px 10px 0;
          width: 100%;
          height: 205px;
          overflow: hidden;
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
            width: 190px;
            font-size: 14px;
            color: $defaultTextColor;
          }
          .room-region {
            width: 50px;
            text-align: right;
          }
          .room-area, .room-layout {
            position: relative;
            margin-right: 20px;
            &::after {
              content: "";
              position: absolute;
              top: 1px;
              right: -10px;
              width: 0;
              height: 10px;
              border-right: 1px solid #ddd;
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
            color: $mlThemeColor;
            font-size: 24px;
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
  .room-loading {
    min-height: 200px;
  }

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
      &.active {
        color: $mlThemeColor;
      }
    }
  }
</style>



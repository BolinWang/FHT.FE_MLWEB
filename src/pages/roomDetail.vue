<template>
  <div class="container">
    <levelbar></levelbar>
    <section class="content_header">
      <photo-swipe ref="swiper" :picList="picList">
      </photo-swipe>
      <div class="roomInfo">
        <div class="room__title">
          <div class="room__name" :class="{'smallSize': detailData.houseName.length > 12}">{{detailData.houseName}}</div>
          <div class="flex space_between">
            <div class="rent__month">
              <span>{{detailData.price}}</span>
              元/月
            </div>
            <div class="rent__mode">
              付款方式 <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="room_content">
          <div class="room__tags">
            <el-tag :type="detailData.houseRentType | filterTags">{{detailData.houseRentType | filterTagsValue}}</el-tag>
          </div>
          <div class="room_infos">
            <ul>
              <li class="infos__item">
                <span class="label">户型</span>
                <span class="value">{{detailData.houseType}}</span>
              </li>
              <li class="infos__item">
                <span class="label">楼层</span>
                <span class="value">{{detailData.floorName}}</span>
              </li>
              <li class="infos__item">
                <span class="label">面积</span>
                <span class="value">{{detailData.houseArea}}</span>
              </li>
              <li class="infos__item">
                <span class="label">装修</span>
                <span class="value">{{DecorationList[detailData.decorationDegree]}}</span>
              </li>
              <li class="infos__item">
                <span class="label">朝向</span>
                <span class="value">{{RoomDirection[detailData.roomDirection]}}</span>
              </li>
              <li class="infos__item">
                <span class="label">编号</span>
                <span class="value">{{detailData.roomCode}}</span>
              </li>
            </ul>
            <div class="infos__item flex">
              <span class="label">所在区域</span>
              <span class="value">{{detailData.region}} {{detailData.address}}</span>
            </div>
            <div class="infos__item flex">
              <span class="label">联系房东</span>
              <span class="value primary">{{detailData.contactMobile}}</span>
            </div>
          </div>
          <el-button class="btn_lookRoom" type="primary">预约看房</el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { roomDetailApi } from '@/api/roomDetail'
import Levelbar from '@/components/Levelbar'
import photoSwipe from '@/components/photoSwipe'
import { ObjectMap } from '@/utils'

const DecorationList = ['', '毛坯', '简装', '精装修', '豪华装']
const RoomDirection = ['', '朝南', '朝北', '朝东', '朝西', '东南', '西南', '东北', '西北']
export default {
  name: 'roomDetail',
  components: {
    Levelbar,
    photoSwipe
  },
  filters: {
    filterTags (val) {
      const tagsMap = {
        '1': 'primary',
        '2': 'success',
        '3': 'warning'
      }
      return tagsMap[val] || 'info'
    },
    filterTagsValue (val) {
      const tagsMap = {
        '1': '整租',
        '2': '合租',
        '3': '公寓'
      }
      return tagsMap[val] || '整租'
    }
  },
  data () {
    return {
      DecorationList,
      RoomDirection,
      picList: [],
      detailData: {
        houseName: ''
      }
    }
  },
  created () {
    let params = this.$route.query
    for (let key in params) {
      params[key] = params[key] * 1
    }
    roomDetailApi[params.houseType === 1 ? 'estate' : 'house'](ObjectMap(params)).then(res => {
      this.detailData = res.data
      this.picList = this.detailData.images.map(item => {
        return {
          src: item,
          w: 800,
          h: 600
        }
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.content_header {
  width: 100%;
  height: 652px;
  display: flex;
  overflow: hidden;
  .roomInfo {
    background: #fff;
    width: 480px;
    .room__title {
      background: url('../assets/images/web_bg_hotel.png') no-repeat center center / cover;
      height: 166px;
      padding: 50px 40px 30px 40px;
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      .room__name {
        font-size: 28px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &.smallSize {
          font-size: 20px;
        }
      }
      .rent__month {
        span {
          font-size: 38px;
        }
      }
    }
  }
  .room_content {
    font-size: 14px;
    padding: 30px 40px;
    .room_infos {
      padding: 20px 0;
      ul {
        display: flex;
        flex-wrap: wrap;
        .infos__item {
          width: 50%;
        }
      }
    }
    .infos__item {
      line-height: 40px;
      span {
        display: inline-block;
        &.label {
          width: 60px;
          color: #999;
        }
        &.value {
          font-size: 16px;
          margin-left: 15px;
          &.primary {
            color: #FFA33B;
          }
        }
      }
      &.flex {
        align-items: flex-start;
        .label {
          width: 70px;
        }
      }
    }
  }
  .btn_lookRoom {
    width: 240px;
    height: 60px;
    border: 0 none;
    border-radius: 0;
    background: #FFA33B;
    font-size: 18px;
    margin-top: 10px;
  }
}
.flex {
  display: flex;
  align-items: center;
  &.space_between {
    justify-content: space-between;
  }
}
.container {
  padding: 20px 0;
  width: 100%;
}
</style>

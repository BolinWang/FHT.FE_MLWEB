<template>
  <div class="page_container">
    <section class="flex_1200">
      <levelbar></levelbar>
      <section class="content_header">
        <div class="content_header__swiper">
          <fht-swiper v-if="picList.length > 0" ref="swiper" :picList="picList">
          </fht-swiper>
        </div>
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
    </section>
    <section class="content_container">
      <div class="room_attribute room_section">
        <h4 class="title">房间设施</h4>
        <div class="attribute__items">
          <div
            class="attribute__item"
            v-for="item in detailData.facilityItems"
            :key="item.name">
            <img :src="require(`../assets/images/device/device-${item.type}.png`)" />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="room_section">
        <h4 class="title">房间描述</h4>
        <article class="room__desc" v-html="detailData.houseDesc"></article>
      </div>
      <div class="room_section room_location">
        <h4 class="title">地理位置</h4>
        <div class="address">{{detailData.address}}</div>
        <div id="map_content" class="map_content"></div>
      </div>
    </section>
    <section class="content_footer flex_1200" v-if="detailData.similarRoomList.length > 0">
      <div class="room_section">
        <h4 class="title">为您推荐</h4>
        <div class="room__similar">
          <Carousel :similarRoomList="detailData.similarRoomList || []"></Carousel>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { roomDetailApi } from '@/api/roomDetail'
import Levelbar from '@/components/Levelbar'
import fhtSwiper from '@/components/photoSwipe'
import Carousel from '@/components/carousel'
import { ObjectMap } from '@/utils'

const DecorationList = ['', '毛坯', '简装', '精装修', '豪华装']
const RoomDirection = ['', '朝南', '朝北', '朝东', '朝西', '东南', '西南', '东北', '西北']
export default {
  name: 'roomDetail',
  components: {
    Levelbar,
    fhtSwiper,
    Carousel
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
      this.picList = (this.detailData.images || this.detailData.imageUrls).map(item => {
        return {
          src: item,
          keyId: Math.random().toFixed(5),
          w: 800,
          h: 600
        }
      })
      this.detailData.houseName = this.detailData.houseName || this.detailData.estateName || ''
      this.detailData.similarRoomList = this.detailData.similarRoomList.length > 4 ? this.detailData.similarRoomList.slice(0, 4) : this.detailData.similarRoomList
      const position = [this.detailData.longitude, this.detailData.latitude]
      this.$nextTick(() => {
        /* 地图信息 */
        const map = new window.AMap.Map('map_content', {
          center: position,
          zoom: 15,
          viewMode: '3D',
          pinch: 45,
          dragEnable: true,
          zoomEnable: true,
          doubleClickZoom: true
        })
        // window.AMap.plugin(['AMap.ToolBar'], () => {
        //   map.addControl(
        //     new window.AMap.ToolBar({
        //       liteStyle: true
        //     })
        //   )
        // })
        window.AMap.plugin(['AMap.ControlBar'], () => {
          map.addControl(new window.AMap.ControlBar())
        })

        const marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position
        })
        map.add(marker)
        marker.setAnimation('AMAP_ANIMATION_BOUNCE')
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.content_header {
  width: 100%;
  height: 652px;
  margin-bottom: 20px;
  display: flex;
  overflow: hidden;
  .content_header__swiper {
    width: 720px;
    height: 100%;
  }
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
.page_container {
  padding: 20px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .flex_1200 {
    width: 1200px;
  }
  .content_container {
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
    .room__desc {
      width: 580px;
      font-size: 20px;
      padding: 30px 0 0 20px;
    }
    .room_location {
      padding-top: 30px;
      .address {
        font-size: 20px;
        padding: 30px 0 20px 20px;
      }
    }
  }
  .room_section {
    width: 1200px;
    .attribute__items {
      width: 580px;
      padding: 20px 0;
      display: flex;
      flex-wrap: wrap;
    }
    .title {
      font-size: 28px;
      border-left: 6px solid #FFA33B;
      text-indent: 10px;
      margin: 0;
    }
    .attribute__item {
      width: 96px;
      height: 56px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 15px 0;
      img {
        width: 72px;
        height: 42px;
        margin-bottom: 5px;
      }
    }
  }
  .content_footer {
    padding: 50px 0;
    .room__similar {
      padding-top: 40px;
    }
  }
}
.map_content {
  width: 886px;
  height: 386px;
  .amap-logo {
    display: none !important;
  }
  .amap-copyright {
    height: 0;
    padding-bottom: 0;
    overflow: hidden;
    display: none !important;
    visibility: hidden !important;
  }
}
</style>

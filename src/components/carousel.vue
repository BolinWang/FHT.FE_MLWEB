/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-11-01 18:59:38
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-11-10 11:46:03
 */

<template>
  <section class="room_similar__items">
    <!-- <el-carousel
      :interval="4000"
      height="324px">
      <el-carousel-item v-for="item in 6" :key="item">
      </el-carousel-item>
    </el-carousel> -->
    <div
      class="room_items__card"
      v-for="item in similarRoomList"
      :key="item.roomId"
      @click="openDetailPage(item)">
      <el-card
        shadow="never"
        :body-style="{ padding: '10px' }">
        <img v-lazy="item.imageUrl" class="image">
        <div class="info_item">
          <span class="roomName">{{item.name || item.estateName}}</span>
          <span class="region">
            <i class="el-icon-location"></i>
            {{item.region}} {{item.zone}}
          </span>
        </div>
        <div class="info_item">
          {{item.houseArea}} | {{item.houseType}} | {{item.decorationDegree}}
        </div>
        <div class="info_item">
          <div class="tags">
            <el-tag size="small" v-for="tag in item.showTagList" :key="tag.tagName" :type="tag.tagName | filterTags">
              {{tag.tagName}}
            </el-tag>
          </div>
          <div class="price">
            <span>{{item.minRentPrice}}</span>
             元/月
          </div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script>
import { ObjectMap } from '@/utils'
export default {
  name: 'carousel',
  props: {
    similarRoomList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  filters: {
    filterTags (val) {
      const tagsMap = {
        '整租': 'success',
        '合租': 'info',
        '公寓': 'warning',
        'VR': 'primary'
      }
      return tagsMap[val] || 'success'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    openDetailPage (item) {
      let query = ObjectMap({
        houseType: item.type,
        estateRoomTypeId: item.type === 1 ? item.id : undefined,
        roomId: item.type === 2 ? item.id : undefined,
        rentPrice: item.type === 1 ? item.minRentPrice : undefined
      })
      // this.$router.push({
      //   path: `/${this.$route.path}/${item.roomCode}`,
      //   query
      // })
      let queryUrl = ''
      for (let key in query) {
        queryUrl += `&${key}=${query[key]}`
      }
      const currentPath = this.$route.path.split('/search/')[0]
      const openUrl = `${window.location.origin}${currentPath}/search/${item.roomCode || 'fangyuanbianma'}`
      window.open(`${openUrl}?${queryUrl.substr(1)}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .room_similar__items {
    display: flex;
    justify-content: flex-start;
  }
  .room_items__card {
    width: 284px;
    background: #fff;
    overflow: hidden;
    cursor: pointer;
    .image {
      width: 100%;
      height: 209px;
    }
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  .info_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #999;
    line-height: 30px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    .tags span {
      margin-right: 5px;
    }
    .roomName {
      font-size: 14px;
      overflow: hidden;
      width: 60%;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #333;
    }
    .price {
      color: #FF8C07;
      span {
        font-size: 20px;
      }
    }
  }
</style>
<style>
.room_items__card .el-card {
  border: 0 none;
}
</style>

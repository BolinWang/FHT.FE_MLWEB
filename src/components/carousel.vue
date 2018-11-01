/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-11-01 18:59:38
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-11-01 19:44:34
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
      :key="item.roomId">
      <el-card
        shadow="never"
        :body-style="{ padding: '10px' }">
        <img v-lazy="item.imageUrl" class="image">
        <div class="info">
          <div class="price">
            <span>{{item.minRentPrice}}</span>
             元/月
          </div>
          <div class="region">
            <i class="el-icon-location"></i>
            {{item.region}}
          </div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script>
export default {
  name: 'carousel',
  props: {
    similarRoomList: {
      type: Array,
      default () {
        return []
      }
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
    .image {
      width: 100%;
      height: 209px;
    }
    &:not(:last-child) {
      margin-right: 10px;
    }
    .price {
      color: #FF8C07;
      font-size: 14px;
      span {
        font-size: 24px;
      }
      line-height: 40px;
    }
    .region {
      color: #999;
      line-height: 40px;
    }
  }
</style>
<style>
.room_items__card .el-card {
  border: 0 none;
}
</style>

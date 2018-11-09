<template>
  <div class="page_container" v-if="detailData.roomCode || detailData.estateId">
    <section class="flex_1200">
      <levelbar></levelbar>
      <section class="content_header">
        <div class="content_header__swiper">
          <fht-swiper v-if="picList.length > 0" ref="swiper" :picList="picList">
          </fht-swiper>
        </div>
        <div class="roomInfo">
          <div class="room__title" :class="{'estate': detailData.houseRentType === 3}">
            <div class="room__name" :class="{'smallSize': detailData.houseName && detailData.houseName.length > 12}">{{detailData.houseName}}</div>
            <div class="flex space_between">
              <div class="rent__month">
                <span>{{detailData.price || detailData.rentPrice}}</span>
                元/月
              </div>
              <div class="rent__mode" @click="showRentTypes = true">
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
                  <span class="value">{{filterHouseType}}</span>
                </li>
                <li class="infos__item">
                  <span class="label">楼层</span>
                  <span class="value">{{filterFloorName}} 层</span>
                </li>
                <li class="infos__item">
                  <span class="label">面积</span>
                  <span class="value">{{filterHouseArea}}</span>
                </li>
                <li class="infos__item" v-if="detailData.houseRentType !== 3">
                  <span class="label">装修</span>
                  <span class="value">{{DecorationList[detailData.decorationDegree]}}</span>
                </li>
                <li class="infos__item" v-else>
                  <span class="label">房间数量</span>
                  <span class="value">{{detailData.totalRoomCount || detailData.estateInfo.roomCount}} 间</span>
                </li>
                <li class="infos__item">
                  <span class="label">朝向</span>
                  <span class="value">{{filterRoomDirection}}</span>
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
                <span class="value primary">{{detailData.contactMobile || detailData.telephone}}</span>
              </div>
            </div>
            <el-button class="btn_lookRoom" type="primary" @click="showBookingRoom = true">预约看房</el-button>
          </div>
        </div>
      </section>
    </section>
    <section class="content_container">
      <div class="room_attribute room_section" v-if="(detailData.privateFacilityItems || detailData.services || []).length">
        <h4 class="title">房间设施</h4>
        <div class="attribute__items">
          <div
            class="attribute__item"
            v-for="item in detailData.privateFacilityItems || detailData.services || []"
            :key="item.name">
            <img v-if="detailData.houseRentType !== 3" :src="require(`../assets/images/device/device-${item.type}.png`)" />
            <img v-else :src="require(`../assets/images/estate-service/${item.code}.png`)" />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="room_attribute room_section" v-if="detailData.houseRentType === 2 && (detailData.facilityItems || []).length">
        <h4 class="title">公共设施</h4>
        <div class="attribute__items">
          <div
            class="attribute__item"
            v-for="item in detailData.facilityItems || []"
            :key="item.name">
            <img :src="require(`../assets/images/device/device-${item.type}.png`)" />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="room_attribute room_section" v-if="detailData.houseRentType === 3 && (detailData.storeServices || []).length">
        <h4 class="title">生活服务</h4>
        <div class="attribute__items">
          <div
            class="attribute__item"
            v-for="item in detailData.storeServices || []"
            :key="item.name">
            <img :src="require(`../assets/images/estate-service/${item.code}.png`)" />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="room_section" v-if="detailData.houseDesc || detailData.desc">
        <h4 class="title">{{detailData.houseRentType === 3 ? '公寓简介' : '房间描述'}}</h4>
        <article class="room__desc" v-html="detailData.houseDesc || detailData.desc"></article>
      </div>
      <div class="room_section room_location">
        <h4 class="title">地理位置</h4>
        <div class="address">{{detailData.address}}</div>
        <div id="map_content" class="map_content"></div>
      </div>
    </section>
    <section class="content_footer flex_1200" v-if="detailData.similarRoomList && detailData.similarRoomList.length">
      <div class="room_section">
        <h4 class="title">为您推荐</h4>
        <div class="room__similar">
          <Carousel :similarRoomList="detailData.similarRoomList || []"></Carousel>
        </div>
      </div>
    </section>
    <el-dialog
      title="付款方式"
      center
      :visible.sync="showRentTypes"
      :modal-append-to-body="false"
      width="600px">
      <ul class="rentTypes_items">
        <li
          style="position: relative; margin-bottom: 20px;"
          v-for="(item, index) in detailData.rentTypes"
          :key="index">
          <div class="rentTypes_item">
            <div class="rentTypes_item__left">
              <span class="name">{{item.name}}</span>
              <span class="price">
                <span>¥ {{item.rentPrice}}</span>
                /月起
              </span>
            </div>
            <div class="rentTypes_item__right">
              <span class="monthNum">租期：{{item.minMonthNum}} ~ {{item.maxMonthNum}} 个月</span>
              <span class="serviceFee">服务费：¥ {{item.serviceChargePrice}}</span>
              <span class="deposit">押金：¥ {{item.depositPrice}}</span>
            </div>
            <div class="deliver"></div>
          </div>
        </li>
      </ul>
    </el-dialog>
    <el-dialog
      title="预约看房"
      :visible.sync="showBookingRoom"
      :modal-append-to-body="false"
      center
      width="500px"
      @open="openBooking"
      :before-close="done => closeDialogForm(done, 'form_booking')">
      <el-form :model="bookingData" :rules="rules" ref="form_booking" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入您的姓名" v-model="bookingData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input placeholder="请输入您的手机号码" v-model="bookingData.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="vCode">
          <el-input placeholder="请输入验证码" v-model="bookingData.vCode">
            <template slot="append">
              <div @click="getCheckCode" :class="[sendCodeCount == 0 ? 'active' : '']">
                {{codeText}}
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="看房时间" prop="selectedOptions">
          <el-cascader
            style="width: 100%;"
            :options="options"
            filterable
            v-model="bookingData.selectedOptions"
            placeholder="请选择看房时间">
          </el-cascader>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input style="position: relative;" type="textarea" :maxlength="50" v-model="bookingData.remark"></el-input>
          <span class="textNumber">还可以输入{{50 - bookingData.remark.length}}字符</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn_booking" round type="primary" @click="bookingRoom">立即预约</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { roomDetailApi } from '@/api/roomDetail'
import Levelbar from '@/components/Levelbar'
import fhtSwiper from '@/components/photoSwipe'
import Carousel from '@/components/carousel'
import { ObjectMap } from '@/utils'
import { validateMobile } from '@/utils/validate'

const DecorationList = ['', '毛坯', '简装', '精装修', '豪华装']
const RoomDirection = ['', '朝南', '朝北', '朝东', '朝西', '东南', '西南', '东北', '西北']
const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
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
        '1': 'success',
        '2': 'info',
        '3': 'warning'
      }
      return tagsMap[val] || 'success'
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
  computed: {
    filterRoomDirection () {
      let val = this.detailData.roomDirection || this.detailData.houseDirection || ''
      if (this.detailData.houseRentType !== 3) {
        return RoomDirection[val]
      }
      let derections = [...new Set(val.split(','))].map(item => {
        return RoomDirection[item]
      })
      return derections.join('、')
    },
    filterHouseType () {
      let val = this.detailData.houseType
      if (this.detailData.houseRentType !== 3) {
        return val
      }
      return (this.detailData.minChamber === this.detailData.maxChamber ? this.detailData.maxChamber : `${this.detailData.minChamber} ~ ${this.detailData.maxChamber}`) + ' 室'
    },
    filterFloorName () {
      let val = this.detailData.floorName
      if (this.detailData.houseRentType !== 3) {
        return val
      }
      return this.detailData.minFloorNum === this.detailData.maxFloorNum ? this.detailData.maxFloorNum : `${this.detailData.minFloorNum} ~ ${this.detailData.maxFloorNum}`
    },
    filterHouseArea () {
      let val = this.detailData.houseArea
      if (this.detailData.houseRentType !== 3) {
        return `${val} ㎡`
      }
      return `${this.detailData.minRoomArea} ㎡` + (this.detailData.minRoomArea === this.detailData.maxRoomArea ? '' : '起')
    }
  },
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      DecorationList,
      RoomDirection,
      picList: [],
      showRentTypes: false,
      detailData: {},
      bookingData: {
        remark: '',
        selectedOptions: []
      },
      showBookingRoom: false,
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        phone: [
          {required: true, trigger: 'blur', validator: validatePhone}
        ],
        selectedOptions: [
          {type: 'array', required: true, message: '请选择看房时间', trigger: 'change'}
        ],
        vCode: [
          { required: true, trigger: 'blur', message: '请输入验证码' }
        ]
      },
      options: [],
      codeText: '发送验证码',
      sendCodeCount: 0,
      isCD: false
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
      if (params.houseType === 1) {
        this.detailData.houseRentType = 3
      }
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
      this.getEstateSimilarRooms()
    })
  },
  methods: {
    getEstateSimilarRooms (type) {
      roomDetailApi.querySimilarListApi(ObjectMap({
        cityId: this.$store.state.user.cityInfo.cityId,
        sourceType: 2,
        currentHousingType: this.detailData.houseRentType,
        estateRoomTypeId: this.detailData.estateRoomTypeId,
        rentPrice: this.detailData.rentPrice,
        roomId: this.detailData.roomId
      })).then((res) => {
        let similarRoomList = res.data.resultList || []
        this.$set(this.detailData, 'similarRoomList', similarRoomList.length > 4 ? similarRoomList.slice(0, 4) : similarRoomList)
      })
    },
    closeDialogForm (done, form) {
      this.bookingData = {
        remark: ''
      }
      this.$refs[form].clearValidate()
      done()
    },
    openBooking () {
      let today = new Date()
      let todayY = today.getFullYear()
      let todayM = today.getMonth()
      let todayD = today.getDate()
      // 7天内
      for (let i = 0; i < 7; i++) {
        let date = new Date(todayY, todayM, todayD + i)
        let curY = date.getFullYear()
        let curM = date.getMonth() + 1
        let curD = date.getDate()
        let curDText = curD < 10 ? '0' + curD : curD
        let curDay = date.getDay()
        this.options.push({
          value: `${curY}-${curM}-${curDText}`,
          label: `${weekList[curDay]} ` + (i === 0 ? '今天' : `${curM}月${curDText}日`)
        })
      }
      // 8~21点
      let pickHList = []
      for (let i = 8; i <= 21; i++) {
        pickHList.push({
          label: (i < 10 ? '0' + i : i) + '时',
          value: (i < 10 ? '0' + i : i) + ':',
          hour: i
        })
      }
      // 00 / 30分
      let pickMiList = []
      pickMiList.push({
        label: '00分',
        value: '00:00'
      }, {
        label: '30分',
        value: '30:00'
      })
      let todayH = today.getHours()
      let todayMi = today.getMinutes()
      this.options.map((item, index) => {
        if (index === 0) {
          if (todayMi >= 30) {
            item.children = pickHList.slice(todayH - 7)
          } else {
            item.children = pickHList.slice(todayH - 8)
          }
        } else {
          item.children = pickHList.slice()
        }
        item.children.map((child, childIndex) => {
          if (index === 0 && childIndex === 0 && todayMi < 30) {
            child.children = pickHList.slice(1)
          } else {
            child.children = pickMiList.slice()
          }
        })
      })
    },
    bookingRoom () {
      this.$refs.form_booking.validate((valid) => {
        if (valid) {
          this.doBooking()
        } else {
          return false
        }
      })
    },
    getCheckCode () {
      if (!this.bookingData.phone) {
        this.$message.error('请先输入手机号')
        return false
      }
      if (this.isCD) {
        return
      }
      let time = 60
      let timer = setInterval(() => {
        this.isCD = true
        this.sendCodeCount++
        time--
        this.codeText = time + '秒后重发'
        if (time < 0) {
          this.isCD = false
          clearInterval(timer)
          this.codeText = '重发验证码'
        }
      }, 1000)
      roomDetailApi.sendCheckcodeApi({
        mobile: this.bookingData.phone
      }).then((res) => {
        this.$message.success('验证码发送成功，请查收')
      }).catch()
    },
    doBooking () {
      const selectedDateTime = this.bookingData.selectedOptions
      const bookingTime = `${selectedDateTime[0]} ${selectedDateTime[1]}${selectedDateTime[2]}`
      roomDetailApi.bookingRoomApi({
        name: this.bookingData.name,
        phone: this.bookingData.phone,
        bookingTime: new Date(bookingTime).getTime(),
        housingType: this.detailData.houseRentType === 3 ? 1 : 2,
        positionId: this.detailData.estateRoomTypeId || this.detailData.roomId
      }).then(res => {
        this.$message.success('预约成功！')
      })
    }
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
      &.estate {
        background: url('../assets/images/web_bg_hotel.png') no-repeat center center / cover;
        color: #fff;
        height: 166px;
        padding: 50px 40px 30px 40px;
        .room__name {
          color: #fff;
          border-bottom: none;
          padding-bottom: 0px;
          margin-bottom: 0px;
        }
      }
      padding: 50px 40px 0 40px;
      font-weight: 500;
      font-size: 16px;
      .room__name {
        color: #FFA33B;
        border-bottom: 2px solid#DADADA;
        padding-bottom: 25px;
        margin-bottom: 15px;
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
  .rent__mode {
    cursor: pointer;
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
.rentTypes_item {
  margin: 0 auto;
  width: 516px;
  height: 118px;
  background: rgba(249,249,249,1);
  border-radius: 4px;
  border: 1px solid #E8E8E8;
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  font-size: 16px;
  color: #AAAAAA;
  .rentTypes_item__left {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    .name {
      font-size: 20px;
      color: #5A5A5A;
    }
    .price {
      color: #FFA33B;
      span {
        font-size: 30px;
      }
    }
  }
  .rentTypes_item__right {
    display: flex;
    flex-direction: column;
    align-content: space-between;
  }
  .deliver {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -26px;
    width: 1px;
    height: 52px;
    opacity: 0.8;
    background: #DBDBDB;
  }
}
.textNumber {
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: #666;
  font-size: 12px;
  line-height: 1.2;
}
.btn_booking {
  width: 200px;
}
.active {
  color: #FFA33B;
}
</style>

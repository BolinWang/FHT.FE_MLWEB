<template>
  <div class="swiper-container">
    <div class="swiper-content">
      <div class="swiper-wrap">
        <!-- swiper1 -->
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
          <swiper-slide
            v-for="(item, index) in picListTop"
            :key="index"
            :data-background="item.src"
            @click.native="openPreview(index)"
            class="swiper-slide preview-img swiper-lazy">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </swiper-slide>
        </swiper>
        <!-- swiper2 Thumbs -->
        <div class="content__thumb">
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide
              v-for="(item, index) in picListThumbs"
              :key="index"
              :data-background="item.src"
               class="swiper-slide swiper-lazy" >
              <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'fhtSwiper',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    picList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      picListThumbs: [],
      picListTop: []
    }
  },
  computed: {
    swiperOptionTop () {
      return {
        lazy: true,
        spaceBetween: 10,
        loop: true,
        loopedSlides: this.picList.length,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    },
    swiperOptionThumbs () {
      return {
        lazy: true,
        spaceBetween: 10,
        slidesPerView: 5,
        loop: true,
        slideToClickedSlide: true,
        loopedSlides: this.picList.length
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
  methods: {
    openPreview (index) {
      if (!this.picList || this.picList.length === 0) {
        this.$message.error('图片预览失败')
        return false
      }
      // const imgloadAsync = item => new Promise(resolve => {
      //   let _img = new Image()
      //   _img.src = item.src
      //   _img.onload = e => {
      //     item.w = _img.width > 800 ? 800 : _img.width
      //     item.h = _img.width > 800 ? 600 : _img.height
      //     resolve(item)
      //   }
      // })
      // const previewList = []
      // for (let i = 0; i < this.picList.length; i++) {
      //   previewList.push(await imgloadAsync(this.picList[i]))
      // }
      this.$preview.open(index, this.picList)
    }
  },
  watch: {
    picList: {
      immediate: true,
      handler (val) {
        this.$set(this, 'picListTop', val)
        const thums = val.map(item => {
          return {
            src: item.src,
            w: 200,
            height: 150
          }
        })
        this.$set(this, 'picListThumbs', thums)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.swiper-container {
  outline: none;
  background-color: #fff;
  box-shadow: none;
  height: 100%;
  .swiper-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
.swiper-wrap {
  position: relative;
  width: 720px;
  margin-left: auto;
  margin-right: auto;
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}
.gallery-top {
  width: 720px;
  height: 540px;
  .swiper-slide {
    width: 100%;
    height: 100%;
  }
}
.content__thumb {
  position: relative;
  cursor: pointer;
  margin-top: 10px;
  .gallery-thumbs {
    height: 102px;
    box-sizing: border-box;
    .swiper-slide {
      height: 100%;
      opacity: 0.4;
      height: 102px;
      width: 136px;
    }
    .swiper-slide-active {
      opacity: 1;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    z-index: 99;
    top: 22px;
    width: 20px;
    height: 102px;
    background-size: 12px;
    background-color: rgba(0, 0, 0, .5);
    &:hover {
      background-color: rgba(0, 0, 0, .8);
    }
  }
  .swiper-button-prev {
    left: 0;
  }
  .swiper-button-next {
    right: 0;
  }
}
</style>

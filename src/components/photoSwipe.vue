<template>
  <div class="swiper-container">
    <div class="swiper-content">
      <div class="swiper-wrap">
        <!-- Swiper -->
        <div class="swiper-container gallery-top">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in picList"
              :key="index"
              @click="openPreview(index)">
              <img class="preview-img" v-lazy="item.src" alt="" title="">
            </div>
          </div>
        </div>
        <div class="content__thumb">
          <!-- Add Arrows -->
          <div v-if="picList.length" class="swiper-button-next swiper-button-white"></div>
          <div v-if="picList.length" class="swiper-button-prev swiper-button-white"></div>
          <div class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item, index) in picList"
                :key="index"
                style="margin-right: 10px;">
                <img v-lazy="item.src" alt="" title="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css'
export default {
  props: {
    picList: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {
        return {
          loop: true,

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.$nextTick(() => {
      const galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 6,
        effect: 'coverflow',
        cube: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 10,
          shadowScale: 0.6
        }
      })
      const galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 5,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 6,
        slideToClickedSlide: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
      galleryTop.controller.control = galleryThumbs
      galleryThumbs.controller.control = galleryTop
    })
  },
  methods: {
    async openPreview (index) {
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
  }
}
</script>

<style scoped lang="scss">
.swiper-container {
  outline: none;
  background-color: transparent;
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
  img {
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
    img {
      height: 102px;
      width: 136px;
    }
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

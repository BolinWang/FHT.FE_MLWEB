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
          <div class="swiper-button-next swiper-button-white"></div>
          <div class="swiper-button-prev swiper-button-white"></div>
          <div class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item, index) in picList"
                :key="index">
                <img :src="item.src" alt="" title="">
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
        loopedSlides: 5,
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
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 5,
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
    openPreview (index) {
      if (!this.picList || this.picList.length === 0) {
        this.$message.error('图片预览失败')
        return false
      }
      this.$preview.open(index, this.picList)
    }
  }
}
</script>

<style scoped lang="scss">
.swiper-container {
  height: 100vh;
  outline: none;
  background-color: transparent;
  box-shadow: none;
  max-height: 100vh;
  .swiper-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
}
.swiper-wrap {
  position: relative;
  width: 800px;
  height: 600px;
  margin-left: auto;
  margin-right: auto;
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}
.gallery-top {
  height: 480px;
  img {
    width: 100%;
    height: 100%;
  }
}
.content__thumb {
  position: relative;
  cursor: pointer;
  .gallery-thumbs {
    height: 120px;
    box-sizing: border-box;
    padding-top: 10px;
    margin: 0 50px;
    img {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      height: 100%;
      opacity: 0.4;
    }
    .swiper-slide-active {
      opacity: 1;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    z-index: 99;
    top: 32px;
    width: 40px;
    height: 110px;
    background-size: 30px;
    background-color: rgba(16, 29, 55, .6);
    &:hover {
      background-color: rgba(16, 29, 55, .8);
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

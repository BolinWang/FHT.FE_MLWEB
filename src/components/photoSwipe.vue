<template>
  <div id="modal1" class="modal">
    <div class="modal-content">
      <i class="material-icons close-btn" @click="instance.close()">close</i>
      <div class="swiper-wrap">
        <!-- Swiper -->
        <div class="swiper-container gallery-top">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-lazy:background-image="'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210510519316'"></div>
            <div class="swiper-slide" v-lazy:background-image="'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210514913667'"></div>
            <div class="swiper-slide" v-lazy:background-image="'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210520779615'"></div>
            <div class="swiper-slide" v-lazy:background-image="'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210526170359'"></div>
            <div class="swiper-slide" v-lazy:background-image="'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210532591268'"></div>
          </div>
        </div>

        <div class="swiper-container gallery-thumbs">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-lazy:background-image="'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210510519316'"></div>
            <div class="swiper-slide" v-lazy:background-image="'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210514913667'"></div>
            <div class="swiper-slide" v-lazy:background-image="'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210520779615'"></div>
            <div class="swiper-slide" v-lazy:background-image="'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210526170359'"></div>
            <div class="swiper-slide" v-lazy:background-image="'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210532591268'"></div>
          </div>
        </div>
      </div>
      <!-- Add Arrows -->
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css'
// import PhotoSwipe from 'photoswipe/dist/photoswipe.min.js'
// import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.min.js'
// import 'photoswipe/dist/photoswipe.css'
// import 'photoswipe/dist/default-skin/default-skin.css'
export default {
  props: {
    photoList: {
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
      instance: null
    }
  },
  methods: {
    showPhoto () {
      this.instance.open()
    }
  },
  mounted () {
    /* eslint-disable */
    this.instance = M.Modal.init(this.$el, {
    /* eslint-enable */
      onOpenEnd () {
        var galleryTop = new Swiper('.gallery-top', {
          spaceBetween: 10,
          loop: true,
          loopedSlides: 5, // looped slides should be the same
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        })
        var galleryThumbs = new Swiper('.gallery-thumbs', {
          spaceBetween: 10,
          slidesPerView: 4,
          touchRatio: 0.2,
          loop: true,
          loopedSlides: 5, // looped slides should be the same
          slideToClickedSlide: true
        })
        galleryTop.controller.control = galleryThumbs
        galleryThumbs.controller.control = galleryTop
      },
      startingTop: '0%',
      endingTop: '0%',
      opacity: 0.9
    })
  }
}
</script>

<style scoped lang="scss">
.modal {
  width: 90%;
  height: 100%;
  outline: none;
  background-color: transparent;
  box-shadow: none;
  max-height: 100%;
  .modal-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-top: 70px;
    z-index: 11;
  }
  .close-btn {
    position: fixed;
    top: 10px;
    right: 40px;
    font-size: 50px;
    color: #fff;
    cursor: pointer;
  }
}
.swiper-wrap {
  position: relative;
  width: 70%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}
.swiper-button-prev {
  left: 50px;
}
.swiper-button-next {
  right: 50px;
}
.gallery-top {
  height: 80%;
  width: 100%;
}
.gallery-thumbs {
  height: 20%;
  box-sizing: border-box;
  padding-top: 10px;
}
.gallery-thumbs .swiper-slide {
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
</style>

<template>
  <div>
    <a class="waves-effect waves-teal btn-flat" @click="showPhoto">我要看图片</a>
    <photo-swipe ref="modal1" :photoList="bannerList" :options="photoViewOptions">
    </photo-swipe>
  </div>
</template>

<script>
import photoSwipe from '@/components/photoSwipe.vue'
export default {
  components: {
    photoSwipe
  },
  data () {
    return {
      bannerList: [
        {
          src: 'https://placekitten.com/600/400',
          w: 600,
          h: 400
        },
        {
          src: 'https://placekitten.com/1200/900',
          w: 1200,
          h: 900
        }
      ],
      photoViewOptions: {
        loop: true,

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    }
  },
  methods: {
    showPhoto() {
      this.$refs.modal1.showPhoto()
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>

</style>



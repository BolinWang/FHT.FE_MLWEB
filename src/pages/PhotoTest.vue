<template>
  <photo-swipe ref="modal1" :picList="bannerList">
  </photo-swipe>
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
          src: 'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210510519316',
          w: 1200,
          h: 900
        },
        {
          src: 'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210514913667',
          w: 1200,
          h: 900
        },
        {
          src: 'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210520779615',
          w: 1200,
          h: 900
        },
        {
          src: 'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210526170359',
          w: 1200,
          h: 900
        },
        {
          src: 'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20170330210532591268',
          w: 1200,
          h: 900
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>

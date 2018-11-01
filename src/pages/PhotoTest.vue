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
        'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180814173944461741',
        'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180814173944260120',
        'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180814173945440908',
        'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180814173947015821',
        'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180814173949633783',
        'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180814173949904034',
        'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180814173950198488',
        'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180814173951400465',
        'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180814173952177743',
        'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180814173953631639',
        'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180827112520176848'
      ].map(item => {
        return {
          src: item,
          w: 800,
          h: 600
        }
      })
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>

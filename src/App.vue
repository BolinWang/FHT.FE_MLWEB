<template>
  <div id="app">
    <PageHeader/>
    <div class="ml-main">
      <router-view/>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import { searchApi } from '@/api/searchRoomApi'
import ConvertPinyin from '@/utils/pinyin'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  },
  created () {
    let cityList = JSON.parse(localStorage.getItem('ML_CITYLIST') || '[]')
    if (cityList.length) {
      return false
    }
    searchApi.getCityList().then((res) => {
      cityList = (res.data.cityList || []).map(item => {
        return {
          char: (ConvertPinyin(item.areaName, true) || '').substr(0, 1),
          cityId: item.areaId,
          name: item.areaName.replace(/市/g, '')
        }
      })
      localStorage.setItem('ML_CITYLIST', JSON.stringify(cityList))
      // 首字母排序
      const cityChars = [...new Set(cityList.map(item => item.char))].sort((a, b) => a.localeCompare(b))
      let sortCityList = []
      for (let i = 0; i < cityChars.length; i++) {
        let addData = {
          char: cityChars[i],
          city: []
        }
        for (let j = 0; j < cityList.length; j++) {
          if (cityChars[i] === cityList[j].char) {
            addData.city.push(cityList[j])
          }
        }
        sortCityList.push(addData)
      }
      localStorage.setItem('ML_SORTCITYLIST', JSON.stringify(sortCityList))
    })
  }
}
</script>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $defaultTextColor;
  box-sizing: border-box;
  margin: 0 auto;
}
.ml-main {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}
</style>
<style lang="scss">
@import './styles/index.scss';
.fixed + .ml-main {
  padding-top: 80px;
}
</style>

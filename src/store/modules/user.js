/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-10-26 10:06:11
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-26 10:47:11
 */

import { getCityInfo, setCityInfo } from '@/utils/auth'

const user = {
  state: {
    cityInfo: getCityInfo(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_CITYINFO: (state, data) => {
      state.cityInfo = data
      setCityInfo(data)
    }
  },

  actions: {
    UPDATECITY ({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_CITYINFO', data)
        resolve()
      })
    }
  }
}

export default user

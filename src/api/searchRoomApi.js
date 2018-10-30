import { fetch } from '@/utils/fetch'

export const searchApi = {
  requestPath: '/api/search',
  /* 获取区域数据 */
  getAreaList (params = {}) {
    return fetch(this.requestPath, {
      method: 'areaListWithHouse',
      params
    })
  },
  /* 获取房源列表 */
  getRoomList (params = {}) {
    return fetch(this.requestPath, {
      method: 'searchByPage',
      params
    }, {
      interceptors: false
    })
  },
  /* 获取城市列表 */
  getCityList (params = {}) {
    return fetch(this.requestPath, {
      method: 'cityList',
      params
    })
  }
}

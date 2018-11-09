import { fetch } from '@/utils/fetch'
const version = '3.6.0'

export const roomDetailApi = {
  version: '3.6.0',
  /* 获取房间详情 */
  estate (params = {}) {
    return fetch('/api/estate', {
      v: version,
      method: 'eRoomTypeDetail',
      params
    })
  },
  house (params = {}, v = '3.6') {
    return fetch('/api/house', {
      v,
      method: 'queryHouseRoomDetail',
      params
    })
  },
  /* 获取推荐房源 */
  querySimilarListApi (params = {}) {
    return fetch('/api/search', {
      v: version,
      method: 'recommendList',
      params
    })
  },
  /* 下单，预定房间 */
  bookingRoomApi (params = {}) {
    return fetch('/api/customer', {
      v: '2.3',
      method: 'tenantBooking',
      params
    })
  },
  /* 发送短信验证码 */
  sendCheckcodeApi (params = {}) {
    return fetch('/api/customer', {
      v: '2.3',
      method: 'sendCheckcode',
      params
    })
  }
}

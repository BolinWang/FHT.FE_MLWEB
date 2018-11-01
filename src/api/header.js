import { fetch } from '@/utils/fetch'

export const headerApi = {
  requestPath: 'https://h.mdguanjia.com/hms/market/',
  sendUserRequest (params = {}) {
    return fetch(`${this.requestPath}request/sendUserRequest.htm`, {
      params
    }, {
      interceptors: false
    })
  },
  sendBizpartner (params = {}) {
    return fetch(`${this.requestPath}businessCooperation/sendCooperationContent.htm`, {
      params
    }, {
      interceptors: false
    })
  }
}

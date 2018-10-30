/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-10-26 10:01:28
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-30 17:24:18
 */

import Cookies from 'js-cookie'

const cityKey = 'MLUSERCITY'
const sessionId = 'MLSESSIONID'

export function getCityInfo () {
  return JSON.parse(Cookies.get(cityKey) || '{}')
}

export function setCityInfo (cityInfo) {
  return Cookies.set(cityKey, cityInfo, { expires: 7 })
}

export function removeCityInfo () {
  return Cookies.remove(cityKey)
}

export function getSessionId () {
  return JSON.parse(Cookies.get(sessionId))
}

export function setSessionId (sessionId) {
  return Cookies.set(sessionId, sessionId)
}

export function removeSessionId () {
  return Cookies.remove(sessionId)
}

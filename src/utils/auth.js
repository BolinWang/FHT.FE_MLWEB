/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-10-26 10:01:28
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-26 10:47:48
 */

import Cookies from 'js-cookie'

const cityKey = 'MLUSERCITY'

export function getCityInfo () {
  return JSON.parse(Cookies.get(cityKey))
}

export function setCityInfo (cityInfo) {
  return Cookies.set(cityKey, cityInfo, { expires: 7 })
}

export function removeCityInfo () {
  return Cookies.remove(cityKey)
}

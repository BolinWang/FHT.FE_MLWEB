import fetch from '@/utils/fetch';

/* 获取区域数据 */
export function getAreaListApi(params = {}) {
  return fetch({
    url: '/api/search',
    method: 'post',
    data: {
      method: 'areaListWithHouse',
      params
    }
  });
}

/* 获取房源列表 */
export function getRoomListApi(params = {}) {
  return fetch({
    url: '/api/search',
    method: 'post',
    data: {
      method: 'searchByPage',
      params
    }
  });
}

/* 获取城市列表 */
export function getCityListApi(params = {}) {
  return fetch({
    url: '/api/search',
    method: 'post',
    data: {
      method: 'cityList',
      params
    }
  });
}

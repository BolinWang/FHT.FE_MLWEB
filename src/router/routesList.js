import Index from '@/pages/Index'
import SearchRoom from '@/pages/SearchRoom'
import roomDetail from '@/pages/roomDetail'

export default [
  {
    path: '/',
    name: '首页',
    redirect: '/search',
    component: Index,
    meta: {
      prerender: true,
      title: '麦邻租房-{城市名}租房_出租房信息_单身公寓|酒店式公寓|白领公寓',
      metaList: [
        {
          name: 'keywords',
          content: '{城市名}租房,{城市名}出租房,{城市名}单身公寓,{城市名}白领公寓,{城市名}酒店式公寓,麦邻租房'
        },
        {
          name: 'description',
          content: '{城市名}麦邻租房为您提供最新的租房信息,单身公寓,酒店式公寓,青年公寓,配置智能家居系统,支持APP在线签约付款，让你一步到位租到好房子！'
        }
      ]
    }
  },
  {
    path: '/search',
    name: 'searchRoom',
    component: SearchRoom,
    meta: {
      prerender: true,
      title: '{城市名}租房子_{城市名}合租|整租_{城市名}单身公寓|白领公寓|酒店式公寓-麦邻租房',
      metaList: [
        {
          name: 'keywords',
          content: '{城市名}租房,{城市名}租房信息,{城市名}单身公寓,{城市名}白领公寓,麦邻租房'
        },
        {
          name: 'description',
          content: '{城市名}麦邻租房,提供最新的租房房源,酒店式公寓、单身公寓、青年公寓、白领公寓出租服务,免中介费，拎包入住,可合租、整租,{城市名}找房就找麦邻租房！'
        }
      ]
    }
  },
  {
    path: '/search/roomDetail',
    name: 'roomDetail',
    component: roomDetail,
    meta: {
      prerender: true,
      title: '{城市名}租房子_{城市名}合租|整租_{城市名}单身公寓|白领公寓|酒店式公寓-麦邻租房',
      metaList: [
        {
          name: 'keywords',
          content: '{城市名}租房,{城市名}租房信息,{城市名}单身公寓,{城市名}白领公寓,麦邻租房'
        },
        {
          name: 'description',
          content: '{城市名}麦邻租房,提供最新的租房房源,酒店式公寓、单身公寓、青年公寓、白领公寓出租服务,免中介费，拎包入住,可合租、整租,{城市名}找房就找麦邻租房！'
        }
      ]
    }
  },
  {
    path: '*/search',
    name: '立即找房',
    component: SearchRoom,
    hidden: true,
    meta: {
      prerender: true,
      redirect: 'search',
      title: '{城市名}租房子_{城市名}合租|整租_{城市名}单身公寓|白领公寓|酒店式公寓-麦邻租房',
      metaList: [
        {
          name: 'keywords',
          content: '{城市名}租房,{城市名}租房信息,{城市名}单身公寓,{城市名}白领公寓,麦邻租房'
        },
        {
          name: 'description',
          content: '{城市名}麦邻租房,提供最新的租房房源,酒店式公寓、单身公寓、青年公寓、白领公寓出租服务,免中介费，拎包入住,可合租、整租,{城市名}找房就找麦邻租房！'
        }
      ]
    }
  },
  {
    path: '*/search/*',
    component: roomDetail,
    name: '房间详情',
    hidden: true,
    meta: {
      prerender: true,
      redirect: 'search',
      title: '{城市名}租房子_{城市名}合租|整租_{城市名}单身公寓|白领公寓|酒店式公寓-麦邻租房',
      metaList: [
        {
          name: 'keywords',
          content: '{城市名}租房,{城市名}租房信息,{城市名}单身公寓,{城市名}白领公寓,麦邻租房'
        },
        {
          name: 'description',
          content: '{城市名}麦邻租房,提供最新的租房房源,酒店式公寓、单身公寓、青年公寓、白领公寓出租服务,免中介费，拎包入住,可合租、整租,{城市名}找房就找麦邻租房！'
        }
      ]
    }
  }
]

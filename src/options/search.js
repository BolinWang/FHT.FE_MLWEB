/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-10-25 15:22:18
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-25 16:20:07
 */

const searchParams = {
  typeList: [
    {
      val: null,
      text: '不限'
    },
    {
      val: 3,
      text: '品牌公寓'
    },
    {
      val: 1,
      text: '整租'
    },
    {
      val: 2,
      text: '合租'
    }
  ],
  rentalList: [
    {
      text: '不限',
      val: {
        minPrice: null,
        maxPrice: null
      }
    },
    {
      text: '1500元以下',
      val: {
        minPrice: null,
        maxPrice: 1500
      }
    },
    {
      text: '1500-2000元',
      val: {
        minPrice: 1500,
        maxPrice: 2000
      }
    },
    {
      text: '2000-2500元',
      val: {
        minPrice: 2000,
        maxPrice: 2500
      }
    },
    {
      text: '2500-3000元',
      val: {
        minPrice: 2500,
        maxPrice: 3000
      }
    },
    {
      text: '3000-4000元',
      val: {
        minPrice: 3000,
        maxPrice: 4000
      }
    },
    {
      text: '4000-5000元',
      val: {
        minPrice: 4000,
        maxPrice: 5000
      }
    },
    {
      text: '5000元以上',
      val: {
        minPrice: 5000,
        maxPrice: null
      }
    }
  ],
  chamberList: [
    {
      text: '不限',
      val: {
        min: 1,
        max: 1
      }
    },
    {
      text: '一室',
      val: {
        min: 1,
        max: 1
      }
    },
    {
      text: '二室',
      val: {
        min: 2,
        max: 2
      }
    },
    {
      text: '三室',
      val: {
        min: 3,
        max: 3
      }
    },
    {
      text: '四室及以上',
      val: {
        min: 4,
        max: null
      }
    }
  ],
  areaList: [
    {
      text: '不限',
      val: {
        maxRoomArea: null,
        minRoomArea: null
      }
    },
    {
      text: '40平以下',
      val: {
        maxRoomArea: 40,
        minRoomArea: null
      }
    },
    {
      text: '40-60平',
      val: {
        maxRoomArea: 60,
        minRoomArea: 40
      }
    },
    {
      text: '60-80平',
      val: {
        maxRoomArea: 80,
        minRoomArea: 60
      }
    },
    {
      text: '80-100平',
      val: {
        maxRoomArea: 100,
        minRoomArea: 80
      }
    },
    {
      text: '100-120平',
      val: {
        maxRoomArea: 120,
        minRoomArea: 100
      }
    },
    {
      text: '120平以上',
      val: {
        maxRoomArea: null,
        minRoomArea: 120
      }
    }
  ],
  decorationList: [
    {
      text: '不限',
      val: null
    },
    {
      text: '毛坯',
      val: '1'
    },
    {
      text: '简装',
      val: '2'
    },
    {
      text: '精装',
      val: '3'
    },
    {
      text: '豪华',
      val: '4'
    }
  ]
}

export default searchParams

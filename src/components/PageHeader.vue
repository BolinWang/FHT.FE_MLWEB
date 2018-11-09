<template>
  <section class="ml-header fixed">
    <div class="container_main flex">
      <div class="container_main--left">
        <img class="logo" src="../assets/images/mlzf.png" alt="logo" title="麦邻租房">
        <el-popover
          placement="bottom"
          popper-class="city_select--box"
          v-model="showCitySelect"
          trigger="click">
          <div class="city_select">
            <el-input
              placeholder="选择城市，Enter键查询"
              v-model="searchCity"
              @change="changeCity"
              @keydown.native.enter="changeCity"
              clearable
              class="input_select_city">
            </el-input>
            <div class="city_items" v-loading="loading">
              <ul v-if="sortCityList.length">
                <li
                  v-for="item in sortCityList"
                  :key="item.char"
                  class="city_items--li">
                  <span class="char">{{item.char}}</span>
                  <span class="city" v-for="city in item.city" :key="city.cityId" @click="selectCity(city)">
                    {{city.name}}
                  </span>
                </li>
              </ul>
              <div class="noCity" v-else>
                无城市o(╥﹏╥)o
              </div>
            </div>
          </div>
          <div class="city-change" slot="reference">
            {{cityName}}
            <i class="icon"></i>
          </div>
        </el-popover>
      </div>
      <div class="container_main--right">
        <ul>
          <template v-for="item in pageLinks">
            <el-popover
              v-if="item.type === 'popover'"
              :key="item.title"
              title=""
              trigger="hover">
              <div class="popover_items">
                <div class="popover_items__item">
                  <img src="../assets/images/code/web_code_ios@2x.png">
                  <span>APP下载苹果</span>
                </div>
                <div class="popover_items__item">
                  <img src="../assets/images/code/web_code_android@2x.png">
                  <span>APP下载安卓</span>
                </div>
              </div>
              <li
                slot="reference"
                class="linkItem"
                style="padding-right: 20px;">
                {{item.title}}
              </li>
            </el-popover>
            <li
              v-else
              :key="item.title"
              @click="openLink(item)"
              class="linkItem">
              {{item.title}}
            </li>
          </template>
        </ul>
      </div>
    </div>
    <el-dialog
      title="房东入驻"
      :visible.sync="showUserRequest"
      :modal-append-to-body="false"
      center
      width="500px"
      :before-close="done => closeUserRequest(done, 'form_userRequest')">
      <el-form :model="ruleForm" :rules="rules" ref="form_userRequest" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请填写您的姓名" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input placeholder="请填写您的手机号码" v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-input placeholder="请填写您的所在城市" v-model="ruleForm.housePosion"></el-input>
        </el-form-item>
        <el-form-item label="房间数量">
          <el-input placeholder="请填写您的房间数量" v-model="ruleForm.houseAmount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn_userRequest" round type="primary" @click="doUserRequest">立即预约</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="合作意向"
      :visible.sync="showBizpartner"
      :modal-append-to-body="false"
      center
      width="500px"
      :before-close="done => closeUserRequest(done, 'form_bizpartner')">
      <el-form :model="ruleForm" :rules="rules" ref="form_bizpartner" label-width="100px" class="demo-ruleForm">
        <el-form-item label="所在城市" prop="housePosion" required>
          <el-input placeholder="请填写您的所在城市" v-model="ruleForm.housePosion"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请填写您的姓名" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请填写您的邮箱" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input placeholder="请填写您的手机号码" v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="备注内容" prop="content">
          <el-input type="textarea" placeholder="请填写您的合作内容" v-model="ruleForm.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn_userRequest" round type="primary" @click="doBizpartner">提交意向</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import ConvertPinyin from '@/utils/pinyin'
import { validateMobile, validateEmail } from '@/utils/validate'
import { headerApi } from '@/api/header'
const sortCityList = JSON.parse(localStorage.getItem('ML_SORTCITYLIST') || '[]')
export default {
  name: 'MLheader',
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validateisEmail = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    return {
      searchCity: '',
      showCitySelect: false,
      loading: false,
      cityName: this.$store.state.user.cityInfo.name || '杭州',
      sortCityList,
      pageLinks: [{
        title: '首页',
        isHome: true,
        type: 'link',
        link: process.env.WEB_LINK
      }, {
        title: '立即找房',
        type: 'link',
        link: this.$route.path
      }, {
        title: 'APP下载',
        type: 'popover'
      }, {
        title: '房东入驻',
        type: 'userRequest'
      }, {
        title: '商业合作',
        type: 'bizpartner'
      }],
      showUserRequest: false,
      showBizpartner: false,
      ruleForm: {},
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        mobile: [
          {required: true, trigger: 'blur', validator: validatePhone}
        ],
        email: [
          {required: true, trigger: 'blur', validator: validateisEmail}
        ],
        housePosion: [
          {required: true, message: '请输入您的所在城市', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    selectCity (city) {
      this.$store.dispatch('UPDATECITY', city).then(() => {
        this.routerRefresh()
      })
    },
    routerRefresh () {
      const cityNamePinyin = ConvertPinyin(this.$store.state.user.cityInfo.name)
      const currentPath = (this.$route.meta && this.$route.meta.redirect) ? this.$route.meta.redirect : this.$route.path
      this.$router.push({
        path: `/${cityNamePinyin}/${currentPath}`
      })
    },
    changeCity () {
      if (this.searchCity) {
        this.loading = true
        setTimeout(() => {
          this.sortCityList = (sortCityList.map(item => {
            let filterCity = item.city.filter(city => {
              return city.name.toLowerCase().indexOf(this.searchCity.toLowerCase()) > -1
            })
            if (filterCity.length) {
              return {
                char: item.char,
                city: filterCity
              }
            }
          })).filter(arr => arr)
          this.loading = false
        }, 200)
      } else {
        this.sortCityList = sortCityList
      }
    },
    openLink (item) {
      switch (item.type) {
        default:
        case 'link':
          if (item.isHome) {
            window.open(item.link)
          } else {
            location.href = item.link
          }
          break
        case 'userRequest':
          this.showUserRequest = true
          break
        case 'bizpartner':
          this.showBizpartner = true
          break
      }
    },
    closeUserRequest (done, form) {
      this.ruleForm = {}
      this.$refs[form].clearValidate()
      done()
    },
    doUserRequest () {
      this.$refs.form_userRequest.validate((valid) => {
        if (valid) {
          headerApi.sendUserRequest({
            name: this.ruleForm.name,
            mobile: this.ruleForm.mobile,
            housePosion: this.ruleForm.housePosion,
            houseAmount: this.ruleForm.houseAmount
          }).then((res) => {
            if (!res.success) {
              this.$message.error(res.msg || '网络错误o(╥﹏╥)o')
              return false
            }
            this.$message.success('提交成功！')
          })
        } else {
          return false
        }
      })
    },
    doBizpartner () {
      this.$refs.form_bizpartner.validate((valid) => {
        if (valid) {
          headerApi.sendBizpartner({
            name: this.ruleForm.name,
            mobile: this.ruleForm.mobile,
            housePosion: this.ruleForm.housePosion,
            email: this.ruleForm.email,
            content: this.ruleForm.content
          }).then((res) => {
            if (!res.success) {
              this.$message.error(res.msg || '网络错误o(╥﹏╥)o')
              return false
            }
            this.$message.success('提交成功！')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .ml-header {
    width: 100%;
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    color: #333;
    font-size: 18px;
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .container_main {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      justify-content: space-between;
      .container_main--left,
      .container_main--right {
        display: flex;
        justify-items: center;
        align-items: center;
      }
      .logo {
        width: 160px;
        height: 44px;
      }
      .linkItem {
        position: relative;
        display: inline-block;
        padding: 0 20px;
        cursor: pointer;
        &:last-child {
          padding-right: 0;
        }
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          border-bottom: 2px solid #ff8c07;
        }
        &:hover {
          color: #ff8c07;
          &::before {
            width: 100%;
          }
        }
      }
      .city-change {
        padding: 0 10px;
        cursor: pointer;
        -webkit-user-select: none;
        position: relative;
        .icon {
          position: absolute;
          right: -2px;
          top: 40px;
          width: 0;
          height: 0;
          border-bottom: 8px solid #ccc;
          border-left: 8px solid transparent;
        }
      }
    }
  }
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn_userRequest {
    width: 200px;
  }
  .popover_items {
    display: flex;
    .popover_items__item {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      &:not(:first-child) {
        margin-left: 10px;
      }
      span {
        font-size: 12px;
        text-align: center;
        margin-top: 10px;
      }
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
</style>
<style lang="scss">
.city_select--box {
  width: 460px;
  height: auto;
  min-height: 130px;
  max-height: 430px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px 30px;
  overflow: auto;
  .el-input input {
    border-color: rgba(245,245,245,1);
    &:focus {
      border-color: #ff8c07 !important;
      box-shadow: 0 1px 0 0 #ff8c07 !important;
    }
  }
  .city_items li {
    display: inline-block;
    width: 50%;
    padding: 8px 0;
    line-height: 24px;
    span {
      &.char {
        font-weight: 600;
        color: #333;
        display: inline-block;
        width: 20px;
      }
      &.city {
        cursor: pointer;
      }
    }
  }
  .noCity {
    padding: 10px;
    color: #ddd;
  }
}
.input_select_city input {
  border: 0 none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
}
</style>

<template>
  <footer class="ml-footer">
    <div class="container">
      <img class="logo" src="../assets/images/icon_footer_logo.png" alt="logo" title="麦邻租房" />
      <div class="contract_us">
        <h4>联系我们</h4>
        <p>杭州复恒科技有限公司</p>
        <p>服务热线: 400-033-9858</p>
        <p>联系地址 : 杭州市西溪路550号钱江西溪<br>新座6幢B座5楼</p>
      </div>
      <div class="follow_us">
        <h4>关注我们</h4>
        <ul class="follow_QRcode">
          <li>
            <img src="../assets/images/code/web_code_ios@2x.png">
            <span>APP下载苹果</span>
          </li>
          <li>
            <img src="../assets/images/code/web_code_android@2x.png">
            <span>APP下载安卓</span>
          </li>
          <li>
            <img src="../assets/images/code/web_code_vx@2x.png">
            <span>公众号更多惊喜</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer_ICP">
      浙ICP备88888666号-5 | 2018 FuHeng Tech All Rights Reserved. 麦邻租房生活服务
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MLfooter'
}
</script>

<style lang="scss" scoped>
.ml-footer {
  width: 100%;
  height: 350px;
  padding: 60px 0 30px 0;
  background: url('../assets/images/bg_footer.png') repeat;
  font-size: 18px;
  font-weight: 400;
  color: #C5C5C5;
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    width: 1200px;
    .logo {
      width: 100px;
      height: 111px;
    }
    h4 {
      font-weight: 500;
      font-size: 28px;
      color: #fff;
      line-height: 42px;
      margin: 0;
      margin-bottom: 20px;
    }
    .contract_us {
      p {
        line-height: 32px;
        margin: 0;
      }
    }
    .follow_us {
      .follow_QRcode {
        display: flex;
        img {
          width: 100px;
          height: 100px;
        }
        li {
          display: flex;
          flex-direction: column;
          align-content: center;
          justify-content: center;
          &:not(:first-child) {
            margin-left: 30px;
          }
          span {
            color: #B5B5B5;
            font-size: 12px;
            text-align: center;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .footer_ICP {
    width: 100%;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: rgba(197, 197, 197, 1);
  }
}
</style>

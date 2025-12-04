<template>
    <!-- 底栏容器 -->
    <el-footer>
        <div class="footer">
          <div class="ng-promise-box">
            <div class="ng-promise">
              <p class="text">
                <a class="icon1" href="javascript:;">7天无理由退换货</a>
                <a class="icon2" href="javascript:;">满99元全场免邮</a>
                <a class="icon3" style="margin-right: 0" href="javascript:;">
                  100%品质保证
                </a>
              </p>
            </div>
          </div>
          <div class="github">
            <a href="https://github.com/congz666/cmall-go" target="_blank">
              <div class="github-but"></div>
            </a>
          </div>
          <div class="mod_help">
            <p>
              <router-link to="/">首页</router-link>
              <span>|</span>
              <router-link to="/goods">全部商品</router-link>
              <span>|</span>
              <router-link to="/about">关于我们</router-link>
            </p>
            <p>
              Copyright ©2020, congz.top 本网站设计内容大部分小米商
              <iframe
                style="margin-left: 2px; margin-bottom: -5px"
                frameborder="0"
                scrolling="0"
                width="91px"
                height="20px"
                src="https://ghbtns.com/github-btn.html?user=congz666&repo=cmall-go&type=star&count=true"
              ></iframe>
            </p>
            <a href="http://www.beian.miit.gov.cn/" target="_blank">
              粤ICP备20067893号
            </a>
          </div>
        </div>
  </el-footer>
</template>

<style>
.el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}

/* 底栏容器CSS */
.footer {
  width: 100%;
  text-align: center;
  background: #fff;
  padding-bottom: 20px;
}
.footer .ng-promise-box {
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}
.footer .ng-promise-box {
  margin: 0 auto;
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}
.footer .ng-promise-box .ng-promise p a {
  color: #0c0000;
  font-size: 20px;
  margin-right: 210px;
  padding-left: 44px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  text-decoration: none;
  background: url('../assets/imgs/us-icon.png') no-repeat left 0;
}
.footer .github {
  height: 50px;
  line-height: 50px;
  margin-top: 20px;
}
.footer .github .github-but {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background: url('../assets/imgs/github.png') no-repeat;
}
.footer .mod_help {
  text-align: center;
  color: #888888;
}
.footer .mod_help p {
  margin: 20px 0 16px 0;
}

.footer .mod_help p a {
  color: #888888;
  text-decoration: none;
}
.footer .mod_help p a:hover {
  color: #fff;
}
.footer .mod_help p span {
  padding: 0 22px;
}
.footer .mod_help a {
  color: #888888;
}
/* 底栏容器CSS END */

</style>

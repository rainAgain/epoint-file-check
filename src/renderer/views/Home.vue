<template>
    <div class="home">
      <div class="functions">
        <work-button></work-button>
      </div>
      <!-- 左侧菜单 -->
      <div class="left-menu" :style="{width: menuWidth+'px'}">
          <p class="menu-title fz-12">资源管理</p>
          <left-menu></left-menu>
      </div>
      <div class="split-line" @mousedown="downMenu"></div>
      <div class="result">
        <right-result></right-result>
      </div>

      <!-- 这边是小图标 -->
      <svg-icon></svg-icon>
      <!-- 这边是小图标 end -->
    </div>
</template>

<script>
import LeftMenu from '../components/LeftMenu/LeftMenu'
import WorkButton from '../components/WorkButton/WorkButton'
import RightResult from '../components/RightResult/RightResult'
import SvgIcon from '../components/SvgIcon/SvgIcon'
const $path = require('path')

export default {
  name: 'home',
  components: {
    LeftMenu,
    WorkButton,
    RightResult,
    SvgIcon
  },
  data () {
    return {
      key: '首页',
      MINWIDTH: 180, // 最小宽度
      menuWidth: 200 // 默认宽度
    };
  },
  methods: {
    downMenu (e) {
      const _this = this;
      document.onmousemove = function (e) {
        let _width = e.clientX - 50;
        if (_width < _this.MINWIDTH) {
          _width = _this.MINWIDTH;
        }
        _this.menuWidth = _width;
      }
      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      }
    }
  },
  created () {
    const _path = $path.resolve();
    let rootPath;
    if (this.$electron.remote.process.env.NODE_ENV != 'development') {
      rootPath = `${_path}\\resources\\app.asar.unpacked\\lintFolder`;
    } else {
      rootPath = `${_path}\\lintFolder`;
    }
    this.$store.dispatch('setPathInfo', {
      rootPath: rootPath
    });
  }
};
</script>

<style scoped>
  .home {
    height: 100%;
    width: 100%;
    display: flex;
    /* align-items: stretch; */
  }
  .functions {
    width: 50px;
    background-color: #333;
  }

  .left-menu {
    width: 200px;
    background-color: rgb(37, 37, 38);
    
  }

  .menu-title {
    color: #fff;
    padding-left: 10px;
    line-height: 30px;
  }

  .split-line {
    width: 2px;
    background-color: rgb(30, 30, 30);
    cursor: e-resize;
  }
  .result {
    flex: 1;
    background-color: rgb(30, 30, 30);
    overflow: auto;
  }
 
</style>
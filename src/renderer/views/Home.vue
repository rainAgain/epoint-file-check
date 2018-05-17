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
      <div class="result"></div>

      <!-- 这边是小图标 -->
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0;visibility:hidden">
        <defs>
          <symbol viewBox="0 0 32 32" id="icon-file" name="文件">
            <path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path>
            <path d="M23 26h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
            <path d="M23 22h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
            <path d="M23 18h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
          </symbol>
          <symbol viewBox="0 0 32 32" id="icon-folder" name="文件夹">
            <path d="M14 4l4 4h14v22h-32v-26z"></path>
          </symbol>
          <symbol viewBox="0 0 32 32" id="icon-folder-open" name="文件夹-打开">
            <path d="M26 30l6-16h-26l-6 16zM4 12l-4 18v-26h9l4 4h13v4z"></path>
          </symbol>
          <symbol viewBox="0 0 32 32" id="icon-file-status" name="文件/文件夹状态">
            <path d="M12 16c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM20.761 7.204c3.12 1.692 5.239 4.997 5.239 8.796s-2.119 7.104-5.239 8.796c1.377-2.191 2.239-5.321 2.239-8.796s-0.862-6.605-2.239-8.796zM9 16c0 3.475 0.862 6.605 2.239 8.796-3.12-1.692-5.239-4.997-5.239-8.796s2.119-7.104 5.239-8.796c-1.377 2.191-2.239 5.321-2.239 8.796zM3 16c0 5.372 1.7 10.193 4.395 13.491-4.447-2.842-7.395-7.822-7.395-13.491s2.948-10.649 7.395-13.491c-2.695 3.298-4.395 8.119-4.395 13.491zM24.605 2.509c4.447 2.842 7.395 7.822 7.395 13.491s-2.948 10.649-7.395 13.491c2.695-3.298 4.395-8.119 4.395-13.491s-1.7-10.193-4.395-13.491z"></path>
          </symbol>
          <symbol viewBox="0 0 32 32" id="icon-add-project" name="添加项目">
            <path d="M18 8l-4-4h-14v26h32v-22h-14zM22 22h-4v4h-4v-4h-4v-4h4v-4h4v4h4v4z"></path>
          </symbol>
          <symbol viewBox="0 0 32 32" id="icon-start" name="启动">
            <path d="M6 4l20 12-20 12z"></path>
          </symbol>
        </defs>
      </svg>
      <!-- 这边是小图标 end -->
    </div>
</template>

<script>
import LeftMenu from '../components/LeftMenu/LeftMenu'
import WorkButton from '../components/WorkButton/WorkButton'

export default {
  name: 'home',
  components: {
    LeftMenu,
    WorkButton
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
        let _width = e.layerX - 50;
        if (_width < _this.MINWIDTH) {
          _width = _this.MINWIDTH;
        }
        _this.menuWidth = _width;
      }
      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      }
    }
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
  }
 
</style>
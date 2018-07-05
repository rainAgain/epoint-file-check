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
        <!-- <right-result></right-result> -->
        <monaco-editor></monaco-editor>
      </div>

      <!-- 这边是小图标 -->
      <svg-icon></svg-icon>
      <!-- 这边是小图标 end -->

      <div class="bg-icon" v-if="ready">
        <svg class="icon-start rotate">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-spinner2"></use>
        </svg>
      </div>
      <div v-if="showVersion" class="update-info">{{updateTips}} {{downloadPercent}} <span class="btns" v-if="showBtns" @click="doUpdate(1)">是</span> <span  @click="doUpdate(0)" class="btns" title="'否'会在退出软件后自动更新" v-if="showBtns">否</span> </div>
    </div>
</template>

<script>
import LeftMenu from '../components/LeftMenu/LeftMenu'
import WorkButton from '../components/WorkButton/WorkButton'
import RightResult from '../components/RightResult/RightResult'
import MonacoEditor from '../components/monacoEditor/monacoEditor'
import SvgIcon from '../components/SvgIcon/SvgIcon'
const $path = require('path')
const $fs = require('fs')
const decompress = require('decompress');
const decompressUnzip = require('decompress-unzip');

export default {
  name: 'home',
  components: {
    LeftMenu,
    WorkButton,
    RightResult,
    MonacoEditor,
    SvgIcon
  },
  data () {
    return {
      key: '',
      MINWIDTH: 180, // 最小宽度
      menuWidth: 200, // 默认宽度
      ready: false, // 是否初始化完
      updateTips: '', // 更新信息
      downloadPercent: '', // 下载进度
      showBtns: false, // 显示是否更新按钮
      showVersion: true // 是否显示更新信息
    }
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
    },
    getUpdateInfo () {
      this.$electron.ipcRenderer.on("message", (event, text) => {
        console.log('自动更新-----------')
        console.log(text);
        this.updateTips = text;
        if (text == '最新版已经下载完毕,是否立即更新') {
          this.showBtns = true;
        } else if (text == '当前为最新版') {
          const _this = this;
          setTimeout(function() {
            _this.showVersion = false;
          }, 5000)
        }
      });
      this.$electron.ipcRenderer.on("downloadProgress", (event, progressObj) => {
        this.downloadPercent = progressObj.percent || 0;
      });
    },
    doUpdate (flag) {
      if (flag) {
        this.$electron.ipcRenderer.send('update:app', true);
      }
      this.showVersion = false;
      this.showBtns = false;
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
    this.getUpdateInfo();
    this.$store.dispatch('setPathInfo', {
      rootPath: rootPath
    });
  },
  mounted() {
    const _path = $path.resolve();
    const _this = this;
    if (this.$electron.remote.process.env.NODE_ENV != 'development') {
      $fs.readFile(`${_path}\\resources\\app.asar.unpacked\\lintFolder\\package.json`, "utf-8", (err, data) => {
        if (err) {
          _this.ready = true;
          decompress(`${_path}\\resources\\app.asar.unpacked\\lintFolder.zip`, `${_path}\\resources\\app.asar.unpacked`, {
            plugins: [decompressUnzip()]
          }).then(() => {
            console.log('complete')
            _this.ready = false;
          });
          throw err;
        }
        _this.ready = false;
      });
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
    height: 100%;
    /* padding-right: 20px; */
    box-sizing: border-box;
    background-color: rgb(30, 30, 30);
    overflow: hidden;
  }
  .update-info {
    position: absolute;
    right: 10px;
    bottom: 0;
    height: 20px;
    z-index: 9;
    font-size: 12px;
    color: #fff;
    user-select: none;
    cursor: default;
  }

  .btns {
    color: #666;
    background-color:#ffe4c4;
    padding: 0 4px;
    display: inline-block;
  }

  .btns:hover {
    cursor: pointer;
    background-color: #f7dab7;
    box-shadow: 0 0 3px 1px rgba(251,251,251,.5)
  }

  .bg-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(187, 168, 168, 0.3);
  }
  .icon-start {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -10px;
    margin-left: -10px;
    z-index: 11;
    width: 20px;
    height: 20px;
    margin: 10px;
    fill: rgb(173, 173, 173);
  }
  .bg-icon:after {
    content:'初始化中…';
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: 15px;
    margin-left: 40px;
    width: 100px;
    height: 20px;
    font-size: 12px;
    color: #e5e5e5;
  }
  .bg-icon:before {
    content:'Tip: 只有第一次才会初始化';
    position: absolute;
    left: 57%;
    margin-left: -75px;
    bottom: 5px;
    width: 150px;
    height: 20px;
    font-size: 12px;
    color: rgb(211, 208, 16);
  }
 .rotate {
    -webkit-animation: rotate360 5s infinite;
            animation: rotate360 5s infinite;
  }
  @keyframes rotate360
  {
    0% {
      transform:rotate(0deg);
      fill: rgb(251,251,251);
    }

    20% {
      fill: rgb(251,0,0);
    }

    40% {
        fill: rgb(251,251,0);
    }

    60% {
      fill: rgb(32, 114, 180);
    }

    80% {
      fill: rgb(32, 180, 64);
    }

    100% {
      transform:rotate(360deg);
      fill: rgba(251,251,251);
    }
  }
</style>
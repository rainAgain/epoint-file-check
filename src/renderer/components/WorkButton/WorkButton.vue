<template>
  <div id="work-button">
    <ul>
      <!-- <li class="func-icons">Menu</li> -->
      <li class="func-icons" @click="openFile" title="导入项目">
        <svg class="icon-project">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-add-project"></use>
        </svg>
      </li>
      <li class="func-icons" title="开始测试JS" @click="startJs">
        <svg class="icon-start">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-start"></use>
        </svg>
      </li>
      <li class="func-icons" title="开始测试CSS"  @click="startCss">
        <svg class="icon-start">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-lastfm"></use>
        </svg>
      </li>
      <li class="func-icons" v-if="status">
        <svg class="icon-start rotate">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-spinner"></use>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from "vuex"

  const filesTree = require('files-tree')
  const copy = require('recursive-copy')
  const $childProcess = require('child_process')
  const empty = require('empty-folder')
  
  export default {
    name: 'work-button',
    data() {
      return {
        softPath: '', // 软件地址
        toRoot: '', // F盘
        toPath: '', // 目标文件夹
        fromPath: '', // 选择项目文件夹
        status: false, // 是否开始执行
        options: { // 拷贝文件配置项
          overwrite: true,
          expand: true,
          dot: true,
          junk: true,
          filter: [
            '**/*.js',
            '**/*.css',
            '!node_modules/**/*',
            '!.gitignore'
          ]
        },
        ignoreOptions: ['node_modules', '.git'] // 遍历目录过滤文件
      }
    },
    computed: {
      ...mapGetters(["pathInfo"])
    },
    methods: {
      // 打开项目
      openFile () {
        this.$electron.ipcRenderer.send('openfile:workButton', true)
      },
      // 开始测试js
      startJs () {
        const _this = this;
        const lintFolder = _this.pathInfo.rootPath;
        const cmd = `${_this.toRoot}: && cd ${lintFolder} && run.bat`;
        _this.$store.dispatch('setResultContent', 0);
        _this.status = true;
        $childProcess.exec(cmd, (err, stdout, stderr) => {
          console.log('完成');
          _this.status = false;
          // if (err) {
          //   console.error(err)
          //   return;
          // }
          _this.$store.dispatch('setResultContent', 1);
        })
      },
      // 开始测试css
      startCss () {
        const _this = this;
        const lintFolder = _this.pathInfo.rootPath;
        const cmd = `${_this.toRoot}: && cd ${lintFolder} && css.bat`;
        _this.$store.dispatch('setResultContent', 0);
        _this.status = true;
        $childProcess.exec(cmd, (err, stdout, stderr) => {
          _this.status = false;
          console.log('完成');
          // if (err) {
          //   console.error(err)
          //   return;
          // }
          _this.$store.dispatch('setResultContent', 2);
        })
      },
      // 拷贝项目到软件指定eslint配置目录
      copyToLocal () {
        const _this = this;
        copy(this.fromPath, this.toPath, this.options)
          .on(copy.events.COPY_FILE_START, function(copyOperation) {
            console.info('Copying file ' + copyOperation.src + '...');
          })
          .on(copy.events.COPY_FILE_COMPLETE, function(copyOperation) {
            console.info('Copied to ' + copyOperation.dest);
          })
          .on(copy.events.ERROR, function(error, copyOperation) {
            console.error('Unable to copy ' + copyOperation.dest);
          })
          .then(function(results) {
            console.info(results.length + ' file(s) copied');
            _this.recursiveproject();
          })
          .catch(function(error) {
            return console.error('Copy failed: ' + error);
          });
      },
      // 遍历项目目录
      recursiveproject () {
        const _this = this;
        const folderList = filesTree.tree(this.toPath, {
          ignore: _this.ignoreOptions
        });
        console.log(folderList);
        this.$store.dispatch('setFolderList', folderList);
        _this.status = false;
      }
    },
    created () {
      const _this = this;
      this.toPath = `${_this.pathInfo.rootPath}/projects`;
      this.toRoot = _this.pathInfo.rootPath.split(':')[0];
      this.$electron.ipcRenderer.on('openfile:workButton:reply', (e, data) => {
        const _path = data[0];
        if (_path) {
          this.fromPath = _path;
          empty(this.toPath, false, (o) => {
            if (o.error) {
              console.error(`remove folder error: ${o.error}`)
            } else if (e.failed) {
              console.error(`remove folder failed:${e.failed}`)
            } else {
              // 清空目标文件夹
              _this.status = true;
              _this.copyToLocal()
            }
          })
        } else {
          console.log('没有选择文件夹')
        }
      })
    },
    mounted() {
      this.recursiveproject();
    }
  }
</script>

<style scoped>
  .func-icons {
    width: 40px;
    height: 40px;
    margin: 10px auto;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
  }

  .icon-project,
  .icon-start {
    width: 20px;
    height: 20px;
    margin: 10px;
    fill: rgb(173, 173, 173);
  }
  
  .icon-project:hover,
  .icon-start:hover {
    fill: rgb(251,251,251);
    cursor: pointer;
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
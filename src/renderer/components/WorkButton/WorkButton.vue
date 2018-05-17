<template>
  <div id="work-button">
    <ul>
      <!-- <li class="func-icons">Menu</li> -->
      <li class="func-icons" @click="openFile" title="打开项目">
        <svg class="icon-project">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-add-project"></use>
        </svg>
      </li>
      <li class="func-icons" title="开始测试">
        <svg class="icon-start">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-start"></use>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
  const filesTree = require('files-tree');

  export default {
    name: 'work-button',
    methods: {
      openFile () {
        this.$electron.ipcRenderer.send('openfile:workButton', true)
      }
    },
    created () {
      this.$electron.ipcRenderer.on('openfile:workButton:reply', (e, data) => {
        const _path = data[0];
        if (_path) {
          this.$store.dispatch('setFolderList', _path);
          const folderList = filesTree.tree(_path, {
            ignore: ['node_modules', '.git']
          });
          this.$store.dispatch('setFolderList', folderList);
        } else {
          console.log('没有选择文件夹')
        }
      })
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
</style>
<template>
  <div class="right-result codemirror">
    <textarea></textarea>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  const $fs = require('fs')
  const CodeMirror = require('codemirror/lib/codemirror.js')
  require('codemirror/mode/javascript/javascript.js')
  require('codemirror/lib/codemirror.css')
  require('codemirror/theme/monokai.css')
  export default {
    name: 'right-result',
    computed: {
      ...mapGetters(["resultContent", "pathInfo"])
    },
    data() {
      return {
        editor: '',
        jsResultPath: '',
        cssResultPath: '',
        code: 'welcome to use the tool,this can test your css & javascript files about can they use in browser ',
        options: {
          mode: 'text/javascript',
          // lineNumbers: true,
          lineWrapping: true,
          theme: 'monokai'
        }
      }
    },
    mounted() {
      this.editor = CodeMirror.fromTextArea(this.$el.querySelector('textarea'), this.options)
      this.editor.setValue(this.code)

      this.jsResultPath = `${this.pathInfo.rootPath}/output/esresult.js`
      this.cssResultPath = `${this.pathInfo.rootPath}/output/cssresult.js`
    },
    watch: {
      resultContent (newValue, oldValue) {
        const _this = this;
        if (newValue == 0) {
          this.code = '';
        } else if (newValue == 1) {
          $fs.readFile(this.jsResultPath, "utf-8", (err, data) => {
            if (err) throw err;
            _this.editor.setValue(data);
          });
        } else if (newValue == 2) {
          $fs.readFile(this.cssResultPath, "utf-8", (err, data) => {
            if (err) throw err;
            _this.editor.setValue(data);
          });
        }
      }
    }
  }
</script>

<style>
  .right-result {
    height: 100%;
    padding-left: 2px;
  }

  .right-result * {
    font-family: monospace;
  }
  .CodeMirror-focused .cm-matchhighlight {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVQI12NgYGBgkKzc8x9CMDAwAAAmhwSbidEoSQAAAABJRU5ErkJggg==);
    background-position: bottom;
    background-repeat: repeat-x;
  }
  .cm-matchhighlight {background-color: lightgreen}
  .CodeMirror-selection-highlight-scrollbar {background-color: green}

  .CodeMirror {
    height:100%;
  }
  .CodeMirror-wrap pre {
    line-height: 30px;
  }
</style>
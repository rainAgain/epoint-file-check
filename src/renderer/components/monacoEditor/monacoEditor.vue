<template>
  <div id="editor" class="editor">

  </div>
</template>

<script>
import { mapGetters } from "vuex";
// const $fs = require("fs");
const path = require("path");
function requireMonacoEditor(amdRequire, thisEditor) {
  function uriFromPath(_path) {
    var pathName = path.resolve(_path).replace(/\\/g, "/");
    if (pathName.length > 0 && pathName.charAt(0) !== "/") {
      pathName = "/" + pathName;
    }
    return encodeURI("file://" + pathName);
  }
  var baseDev = "../../../../node_modules/monaco-editor/dev";
  if (thisEditor.$electron.remote.process.env.NODE_ENV != "development") {
    baseDev = "./";
  }
  amdRequire.config({
    baseUrl: uriFromPath(path.join(__dirname, baseDev))
  });
  // workaround monaco-css not understanding the environment
  self.module = undefined;
  // workaround monaco-typescript not understanding the environment
  self.process.browser = true;
  amdRequire(
    ["vs/editor/editor.main.nls", "vs/editor/editor.main"],
    function() {
      thisEditor.monaco = this.monaco;
      const editorContainer = document.getElementById("editor");
      thisEditor.editor = this.monaco.editor.create(editorContainer, {
        // wordWrap: 'on',
        language: "typescript",
        theme: "vs-dark",
        automaticLayout: true,
        scrollBeyondLastLine: false
      });
      thisEditor.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
        {
          noSyntaxValidation: true,
          noSemanticValidation: true
        }
      );
      function updateDimensions() {
        thisEditor.editor.layout();
      }
      window.addEventListener("resize", updateDimensions);
      editorContainer.addEventListener("resize", updateDimensions);
      thisEditor.editorModel = this.monaco.editor.createModel(
        thisEditor.content,
        "typescript"
      );
      this.monaco.editor.createModel("heLLo world!", "text/plain");

      thisEditor.editorModel.onDidChangeContent(e => {
        thisEditor.content = thisEditor.editorModel.getValue();
      });
      thisEditor.editor.onDidChangeCursorSelection(e => {
        thisEditor.selection = e.selection;
      });
      thisEditor.editor.setModel(thisEditor.editorModel);
    }
  );
}

function loadMonacoEditor(thisEditor) {
  if (thisEditor.amdRequire.config === undefined) {
    const nodeRequire = global.require;
    const loaderScript = document.createElement("script");
    loaderScript.onload = () => {
      const amdRequire = global.require;
      thisEditor.$store.dispatch("setAmdRequire", amdRequire);
      global.require = nodeRequire;
      requireMonacoEditor(amdRequire, thisEditor);
    };
    if (thisEditor.$electron.remote.process.env.NODE_ENV != "development") {
      loaderScript.setAttribute("src", "./vs/loader.js");
    } else {
      loaderScript.setAttribute(
        "src",
        "../node_modules/monaco-editor/dev/vs/loader.js"
      );
    }
    document.body.appendChild(loaderScript);
  } else {
    requireMonacoEditor(thisEditor.amdRequire, thisEditor);
  }
}

export default {
  components: {},
  computed: {
    ...mapGetters(["amdRequire", "resultContent", "pathInfo"])
  },
  props: {
    resultdata: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    /* jsResultPath: "",
    cssResultPath: "", */
    content: "",
    currentPost: "",
    code: "",
    monaco: {},
    editor: {},
    cssEditor: {},
    editorModel: undefined,
    cssModel: undefined
  }),
  methods: {
    init() {
      const version = this.$electron.remote.app.getVersion();
      this.code = `/**
      * 版本: ${version}
      * 
      * 介绍说明：
      * 
      * 左侧按钮模块 从上到下为： 选择项目文件夹、开始检测 JS、开始检测 CSS
      * 
      * 资源管理模块 列出选择的项目文件夹的内容，只显示 css 和 js 文件
      * 
      * 此面板模块   显示检测的结果
      * 
      * 更新记录：
      * 
      * 2018/08/22 v0.0.6
      * 
      * 支持字符串调用 trim 方法的检测
      * 
      * 2018/08/17 v0.0.5
      * 
      * 1、添加 css 和 js 的 tab 切换
      * 
      * 2、去除底部波浪线
      * 
      * 3、去掉一些 warning 的提示，保留必要的 error 提示
      * 
      */`;
    }
  },
  mounted: function() {
    this.init();
    loadMonacoEditor(this);
    /*     this.jsResultPath = `${this.pathInfo.rootPath}/output/esresult.js`;
    this.cssResultPath = `${this.pathInfo.rootPath}/output/cssresult.js`;
 */
    const _this = this;
    setTimeout(function() {
      if (_this.editorModel) {
        _this.editorModel.setValue(_this.code);
      }
    }, 3000);
  },
  watch: {
    resultdata(newValue, oldValue) {
      if (newValue != oldValue) {
        this.editor.setValue(newValue);
      }
    }
  }
};
</script>

<style>
.editor {
  width: 100%;
  height: 100%;
  padding-left: 2px;
}

.editor * {
  font-family: inherit;
}
</style>
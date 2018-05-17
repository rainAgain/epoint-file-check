<template>
    <div id="left-menu" class="left-menu-warp fz-12">
      <vue-tree v-model="nodes"
        ref="slVueTree"
        @select="nodeSelected"
        @drop="nodeDropped"
        @toggle="nodeToggled"
        @nodeContextmenu="showContextMenu">

        <template slot="title" slot-scope="{ node }">
          <span class="item-icon">
            <svg class="fa-file" v-if="node.isLeaf">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-file"></use>
            </svg>
          </span>

          {{ node.title }}
        </template>


        <template slot="toggle" slot-scope="{ node }">
          <span v-if="!node.isLeaf">
            <svg class="fa-folder" v-if="node.isExpanded">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-folder-open"></use>
            </svg>
            <svg class="fa-folder" v-if="!node.isExpanded">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-folder"></use>
            </svg>
          </span>
        </template>


        <template slot="sidebar" slot-scope="{ node }">
          <span class="visible-icon" @click="event => toggleVisibility(event, node)">
            <svg class="fa-file-status" v-if="node.data && node.data.visible" :class="{active: node.data && node.data.visible}">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-file-status"></use>
            </svg>
          </span>
        </template>
      </vue-tree>
    </div>
</template>

<script>
  import VueTree from "../VueTree/VueTree";
  import { mapGetters } from "vuex";
  export default {
    name: "left-menu",
    computed: {
      ...mapGetters(["folderList"])
    },
    components: {
      VueTree
    },
    data() {
      return {
        nodes: []
      };
    },
    methods: {
      toggleVisibility: function(event, node) {
        const slVueTree = this.$refs.slVueTree;
        event.stopPropagation();
        const visible = !node.data || node.data.visible !== false;
        slVueTree.updateNode(node, { data: { visible: !visible } });
        this.lastEvent = `Node ${node.title} is ${
          visible ? "visible" : "invisible"
        } now`;
      },

      nodeSelected(nodes, event) {
        this.lastEvent = `Select nodes: ${nodes
          .map(node => node.title)
          .join(", ")}`;
      },

      nodeToggled(node, event) {
        this.lastEvent = `Node ${node.title} is ${
          node.isExpanded ? "expanded" : "collapsed"
        }`;
      },

      nodeDropped(nodes, position, event) {
        this.lastEvent = `Nodes: ${nodes
          .map(node => node.title)
          .join(", ")} are dropped ${position.placement} ${position.node.title}`;
      },

      showContextMenu(node, event) {
        event.preventDefault();
        this.contextMenuIsVisible = true;
        const $contextMenu = this.$refs.contextmenu;
        $contextMenu.style.left = event.clientX + "px";
        $contextMenu.style.top = event.clientY + "px";
      },

      removeNode() {
        this.contextMenuIsVisible = false;
        const $slVueTree = this.$refs.slVueTree;
        const paths = $slVueTree.getSelected().map(node => node.path);
        $slVueTree.remove(paths);
      }
    },
    watch: {
      folderList(newValue, oldValue) {
        if (newValue) {
          this.nodes = JSON.parse(JSON.stringify(newValue));
        }
      }
    }
  };
</script>

<style scoped>
  .left-menu-warp {
    height: calc(100% - 30px);
    overflow: auto;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }

  .item-icon {
    display: inline-block;
    text-align: left;
    /* width: 20px; */
  }

  .fa-file {
    display: inline-block;
    width: 16px;
    height: 16px;
    fill: rgb(117, 117, 117);
  }

  .fa-folder {
    display: inline-block;
    width: 16px;
    height: 16px;
    fill: rgb(117, 117, 117);
  }

  .fa-file-status {
    display: inline-block;
    width: 16px;
    height: 16px;
    fill: rgb(117, 117, 117);
  }

  .fa-file-status.active {
    fill: rgb(255, 0, 0);
  }
</style>
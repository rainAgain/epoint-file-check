const state = {
  folderPath: '',
  folderList: []
}

const getters = {
  folderPath: state => state.folderPath,
  folderList: state => state.folderList
}

const mutations = {
  // 文件夹
  SET_FOLDER_LIST (state, data) {
    /**
     * 转换数据格式
     * @param {*} arr
     */
    let reWriteArr = (arr) => {
      let newArr = [];
      for (let i = 0, len = arr.length; i < len; i++) {
        let _obj = {
          title: arr[i].name,
          isLeaf: arr[i].file,
          isExpanded: false,
          data: {
            visible: false
          }
        };

        if (arr[i].list) {
          _obj['children'] = reWriteArr(arr[i].list);
        }
        newArr.push(_obj);
      }
      return newArr;
    };

    const vueTreeData = reWriteArr(data);
    state.folderList = vueTreeData
  },
  SET_FOLDER_PATH (state, data) {
    state.folderPath = data
  }
}

const actions = {
  setFolderList ({ commit }, data) {
    commit('SET_FOLDER_LIST', data)
  },
  setFolderPath ({ commit }, data) {
    commit('SET_FOLDER_PATH', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

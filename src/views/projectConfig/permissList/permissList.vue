<template>
  <div class="permissList">
    <a-row :gutter="24">
      <a-col :span='10'>
        <a-card>
          <a-button type="danger"
                    ghost
                    class="newAdd"
                    @click="newAdd">+新增</a-button>
          <a-tree class="draggable-tree"
                  :tree-data="treeData"
                  @select='selectInfo'>
            <template slot="custom"
                      slot-scope="item">
              {{item.menu_text}}
              <a-icon class="icon"
                      type="drag"
                      v-if='false' />
              <a-icon class="icon"
                      type="form"
                      @click="edit(item)" />
              <a-icon class="icon"
                      type="delete"
                      @click="del(item.id)" />
              <a-icon class="icon"
                      type="cluster"
                      @click="selectItem(item)" />
            </template>
          </a-tree>
        </a-card>
      </a-col>
      <a-col :span='14'>
        <a-card v-if="rightShow">
          <div class="content">
            <div class="left">
              <div>
                美好生活家园APP
                <a-icon class="rightIcon"
                        type="right" />
              </div>
              <div class="t1"
                   v-for="(item,index) in titleArr"
                   :key='index'>
                {{item}}
                <a-icon class="rightIcon"
                        type="right" />
              </div>
            </div>
            <div class="right">
              <div>
                <div class="r2"
                     v-show="itemInfo"
                     v-for="(item,index) in itemInfo.children"
                     :key='index'>
                  <a-input v-model="item.menu_text"
                           style="width:150px"
                           placeholder="菜单名称"></a-input>
                  <a-input v-model="item.icon"
                           style="width:150px"
                           placeholder="菜单图标样式"></a-input>
                  <a-input v-model="item.limits_path"
                           style="width:150px"
                           placeholder="访问路径"></a-input>
                  <a-input v-model="item.list_order"
                           style="width:150px"
                           placeholder="排序"></a-input>

                  <a-radio-group v-model="item.display">
                    <a-radio :value="0">
                      隐藏
                    </a-radio>
                    <a-radio :value="1">
                      显示
                    </a-radio>
                  </a-radio-group>

                  <a-icon type="close"
                          class="close"
                          @click="removeMe(item.id,index)" />
                </div>
              </div>
              <div class="r1 inputItem"
                   v-for="(item,index) in inputArr"
                   :key='index'>
                <a-input v-model="item.menuText"
                         style="width:150px"
                         placeholder="菜单名称"></a-input>
                <a-input v-model="item.icon"
                         style="width:150px"
                         placeholder="菜单图标样式"></a-input>
                <a-input v-model="item.limitsPath"
                         style="width:150px"
                         placeholder="访问路径"></a-input>
                <a-input v-model="item.listOrder"
                         style="width:150px"
                         placeholder="排序"></a-input>

                <a-radio-group v-model="item.display">
                  <a-radio :value="0">
                    隐藏
                  </a-radio>
                  <a-radio :value="1">
                    显示
                  </a-radio>
                </a-radio-group>
                <a-icon type="plus"
                        class="plus"
                        @click="add" />
                <a-icon type="close"
                        class="close"
                        @click="remove(index)" />
              </div>
              <a-button type='primary'
                        @click="save">保存</a-button>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <editModel ref="editModel"></editModel>
    <delModel ref="delModel"></delModel>
    <addModel ref="addModel"></addModel>
  </div>
</template>

<script>

import editModel from './editModel'
import delModel from './delModel'
import addModel from './addModel'
import { getMenus, updateBatchMenu, removeBatchMenu } from '@/api/projectConfig.js'
// const treeData2 = [
//   {
//     title: '首页',
//     id: '0-0',
//     scopedSlots: {
//       title: 'custom'
//     },
//     children: [
//       {
//         title: '搜索',
//         id: '0-0-0',
//         scopedSlots: {
//           title: 'custom'
//         }
//       },
//       {
//         title: '扫一扫',
//         id: '0-0-1',
//         scopedSlots: {
//           title: 'custom'
//         }
//       },
//       {
//         title: '消息',
//         id: '0-0-2',
//         scopedSlots: {
//           title: 'custom'
//         }
//       }
//     ]
//   },
//   {
//     title: '生活',
//     id: '0-1',
//     scopedSlots: {
//       title: 'custom'
//     },
//     children: [
//       {
//         title: '全部分类',
//         id: '0-1-0',
//         scopedSlots: {
//           title: 'custom'
//         }
//       },
//       {
//         title: '搜索',
//         id: '0-1-1',
//         scopedSlots: {
//           title: 'custom'
//         }
//       },
//       {
//         title: '热门搜索',
//         id: '0-1-2',
//         scopedSlots: {
//           title: 'custom'
//         },
//         children: [
//           {
//             title: '有趣',
//             id: '0-2-0',
//             scopedSlots: {
//               title: 'custom'
//             }
//           },
//           {
//             title: '哈哈',
//             id: '0-2-1',
//             scopedSlots: {
//               title: 'custom'
//             },
//             children: [
//               {
//                 title: '购物车',
//                 id: '0-3-0',
//                 scopedSlots: {
//                   title: 'custom'
//                 }
//               },
//               {
//                 title: '页面详情',
//                 id: '0-3-1',
//                 scopedSlots: {
//                   title: 'custom'
//                 }
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ]

let arr = []
// 递归获取标题
function getParentTitle (parent2) {
  if (parent2.dataRef.menu_text) {
    arr.unshift(parent2.dataRef.menu_text)
  }
  // console.log('parent2.dataRef.title', parent2.dataRef.title)
  const parent = parent2.$parent
  // console.log('parent', parent)
  // console.log('parent.dataRef', parent.dataRef)
  if (parent.dataRef) {
    getParentTitle(parent)
  }
  return arr
}

const inputArr = []
for (let i = 0; i < 5; i++) {
  inputArr.push({
    id: '',
    parentId: '',
    menuText: '',
    limitsPath: '',
    icon: '',
    listOrder: '',
    display: ''
  })
}

export default {
  components: {
    editModel,
    delModel,
    addModel
  },
  data () {
    return {
      treeData: [], // 左侧树结构数据
      inputArr, // 右侧 空输入框结构数据
      itemInfo: {}, // 右侧 编辑的菜单数据
      titleArr: [], // 题目标题
      rightShow: false,
      idArr: [], // 权限id数组
      parentId: 0
    }
  },

  methods: {
    // 新增权限菜单
    newAdd () {
      this.$refs.addModel.isShow = true
    },
    // 批量编辑权限菜单
    async save () {
      if (this.parentId === 0) {
        let menus = this.itemInfo.children.map(item => {
          return {
            id: item.id,
            parentId: item.parent_id,
            menuText: item.menu_text,
            limitsPath: item.limits_path,
            icon: item.icon,
            listOrder: item.list_order,
            display: item.display
          }
        })
        const arr = this.inputArr.filter(item => {
          return item.menuText !== ''
        })
        arr.forEach(item => {
          item.parentId = menus[0].parentId
          item.id = 0
        })
        menus = [...menus, ...arr]
        await updateBatchMenu({
          menus: menus
        })
      } else {
        const arr = this.inputArr.filter(item => {
          return item.menuText !== ''
        })
        arr.forEach(item => {
          item.parentId = this.parentId
          item.id = 0
        })
        await updateBatchMenu({
          menus: arr
        })
      }
      if (this.idArr.length > 0) {
        await removeBatchMenu({ ids: this.idArr })
      }
      this.getData()
      this.itemInfo = {}
      // 清空右侧输入框数组
      this.inputArr = []
      for (let i = 0; i < 5; i++) {
        this.inputArr.push({
          id: '',
          parentId: '',
          menuText: '',
          limitsPath: '',
          icon: '',
          listOrder: '',
          display: ''
        })
      }
      this.rightShow = false
    },
    // 获取权限菜单数据
    async getData () {
      const res = await getMenus()
      this.treeData = res.data
      console.log('权限菜单列表', res)
    },
    // 设置标题
    selectInfo (selectedKeys, info) {
      let arr2 = []
      if (info.node.$parent.dataRef) {
        arr2 = getParentTitle(info.node.$parent)
      }
      // console.log(info.node.dataRef.title)
      arr2.push(info.node.dataRef.menu_text)
      this.titleArr = arr2
      arr2 = []
      arr = []
      // console.log(this.titleArr)
    },
    // 删除节点
    del (id) {
      this.$refs.delModel.isShow = true
      this.$refs.delModel.id = id
      this.$refs.delModel.itemInfo = this.itemInfo
    },
    // 编辑
    edit (item) {
      this.$refs.editModel.isShow = true
      item.display = +item.display
      this.$refs.editModel.item = JSON.parse(JSON.stringify(item))
    },
    // 添加输入框
    add () {
      this.inputArr.push({
        id: '',
        parentId: '',
        menuText: '',
        limitsPath: '',
        icon: '',
        listOrder: '',
        display: ''
      })
    },
    // 删除输入框
    remove (index) {
      this.inputArr.splice(index, 1)
    },
    // 批量删除菜单
    removeMe (id, index) {
      console.log(id)
      this.idArr.push(id)
      this.itemInfo.children.splice(index, 1)
    },
    // 选择菜单
    selectItem (item) {
      // 显示右边结构
      this.rightShow = true
      this.itemInfo = {}
      // 清空右侧输入框数组
      this.inputArr = []
      for (let i = 0; i < 5; i++) {
        this.inputArr.push({
          id: '',
          parentId: '',
          menuText: '',
          limitsPath: '',
          icon: '',
          listOrder: '',
          display: ''
        })
      }
      if (item.children) {
        this.itemInfo = JSON.parse(JSON.stringify(item))
        this.itemInfo.children.forEach(item => {
          item.display = +item.display
        })
      } else {
        this.parentId = item.id
        // let obj = {}
        // obj = {
        //   ...JSON.parse(JSON.stringify(item.dataRef))
        // }
        // const arr = []
        // arr.push(obj)
        // this.itemInfo = { children: arr }
        // this.itemInfo.children.forEach(item => {
        //   item.display = +item.display
        // })
      }
    }

  },
  created () {
    this.getData()
  }
}
</script>

<style lang='less' scoped>
.permissList {
  .newAdd {
    margin-left: 20px;
    width: 100px;
    text-align: left;
  }
  .icon {
    margin: 0 5px;
    font-size: 16px;
  }
  .content {
    line-height: 30px;
    .left {
      display: flex;
      align-items: center;
      .rightIcon {
        margin: 0 10px;
      }
    }
  }
  .right {
    margin-top: 30px;
    .close {
      font-size: 18px;
    }
    .r1 {
      margin-bottom: 10px;
      .plus {
        margin: 0 10px;
        font-size: 18px;
      }
    }
    .r2 {
      margin-bottom: 10px;
      .close {
        font-size: 18px;
        margin-left: 37px;
      }
    }
    button {
      margin-right: 10px;
    }
  }
}
</style>

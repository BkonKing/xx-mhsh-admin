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
              {{item.role_name}}
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
              <a-icon class="icon"
                      type="appstore"
                      @click="getMenus(item.id)" />
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
                  <a-input v-model="item.role_name"
                           style="width:150px"
                           placeholder="权限名称"></a-input>
                  <a-input v-model="item.list_order"
                           style="width:150px"
                           placeholder="排序"></a-input>
                  <a-icon type="close"
                          class="close"
                          @click="removeMe(item.id,index)" />
                </div>
              </div>
              <div class="r1 inputItem"
                   v-for="(item,index) in inputArr"
                   :key='index'>
                <a-input v-model="item.roleName"
                         style="width:150px"
                         placeholder="菜单名称"></a-input>
                <a-input v-model="item.listOrder"
                         style="width:150px"
                         placeholder="排序"></a-input>
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
        <a-card v-if="showMunes">
          <a-button style='marginLeft:20px'
                    type='primary'
                    @click="setRoleMenus">保存</a-button>
          <a-tree v-model="checkedKeys"
                  checkable
                  class="draggable-tree"
                  :tree-data="roleMunes"
                  :replaceFields='{key:"id"}'
                  @select="onSelect"
                  :default-expanded-keys="openArr">
            <template slot="custom"
                      slot-scope="item">
              {{item.menu_text}}
            </template>
          </a-tree>

        </a-card>
      </a-col>
    </a-row>
    <delModel ref="delModel"></delModel>
    <addModel ref="addModel"></addModel>
    <editModel ref="editModel"></editModel>
  </div>
</template>

<script>

import { getRoles, updateBatchRole, removeBatchRole, getAllotsMenus, updateAllotsMenus } from '@/api/systemSetup'
import delModel from './delModel'
import addModel from './addModel'
import editModel from './editMdoel'
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
  if (parent2.dataRef.role_name) {
    arr.unshift(parent2.dataRef.role_name)
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
    listOrder: '',
    roleName: ''
  })
}

export default {
  components: {
    delModel,
    addModel,
    editModel
  },
  data () {
    return {
      treeData: [], // 角色菜单列表
      inputArr, // 右侧 空输入框结构数据
      itemInfo: {}, // 右侧 编辑的菜单数据
      titleArr: [], // 题目标题
      rightShow: false, // 显示编辑菜单
      idArr: [], // 权限id数组
      parentId: 0,
      showMunes: false,
      roleMunes: [], // 角色菜单数组
      checkedKeys: [], // 选中的权限菜单
      openArr: [], // 展开的菜单节点
      roleId: '' // 角色id
    }
  },
  watch: {
    // 选中复选框时触发
    checkedKeys (val) {
      console.log('onCheck1111', val)
    }
  },
  methods: {
    // 配置角色对应的菜单
    async setRoleMenus () {
      const res = await updateAllotsMenus({
        roleId: this.roleId,
        allots: this.checkedKeys.join(',')
      })
      this.showMunes = false
      console.log('配置角色菜单', res)
    },
    // 获取所有需要展开的id数组
    getOpenArr (arr) {
      arr.forEach(item => {
        if (item.state.opened === 1) {
          this.openArr.push(item.id)
        }
        if (item.state.selected === 1) {
          this.checkedKeys.push(item.id)
        }
        if (item.children) {
          this.getOpenArr(item.children)
        }
      })
    },
    // 展开 和关闭 时触发
    // onExpand (expandedKeys) {
    //   console.log('onExpand', expandedKeys)
    //   // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    //   // or, you can remove all expanded children keys.
    //   this.expandedKeys = expandedKeys
    //   this.autoExpandParent = false
    // },
    // onCheck (checkedKeys) {
    //   console.log('onCheck22222', checkedKeys)
    //   this.checkedKeys = checkedKeys
    // },
    // 选中节点时候触发
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },

    //  获取角色对应的权限菜单
    async getMenus (id) {
      this.roleId = id
      this.rightShow = false
      this.openArr = []
      this.checkedKeys = []
      // console.log(id)
      const res = await getAllotsMenus({ roleId: id })
      this.roleMunes = res.data
      this.showMunes = true
      this.getOpenArr(this.roleMunes)
      // console.log('openArr', this.openArr)
      console.log('checkedKeys', this.checkedKeys)
      // console.log('角色对应的权限菜单', res)
    },
    // 新增权限菜单
    newAdd () {
      this.$refs.addModel.isShow = true
    },
    // 批量编辑权限菜单
    async save () {
      if (this.parentId === 0) {
        let roles = this.itemInfo.children.map(item => {
          return {
            id: +item.id,
            parentId: +item.parent_id,
            roleName: item.role_name,
            listOrder: item.list_order
          }
        })
        const arr = this.inputArr.filter(item => {
          return item.roleName !== ''
        })
        arr.forEach(item => {
          item.parentId = +roles[0].parentId
          item.id = 0
        })
        roles = [...roles, ...arr]
        await updateBatchRole({
          roles: roles
        })
      } else {
        const arr = this.inputArr.filter(item => {
          return item.roleName !== ''
        })
        arr.forEach(item => {
          item.parentId = this.parentId
          item.id = 0
        })
        await updateBatchRole({
          roles: arr
        })
        // console.log('修改角色菜单', res)
      }
      if (this.idArr.length > 0) {
        await removeBatchRole({ ids: this.idArr })
      }
      this.getData()
      this.itemInfo = {}
      // 清空右侧输入框数组
      this.inputArr = []
      for (let i = 0; i < 5; i++) {
        this.inputArr.push({
          id: '',
          parentId: '',
          roleName: '',
          listOrder: ''
        })
      }
      this.rightShow = false
    },
    // 获取权限菜单数据
    async getData () {
      const res = await getRoles()
      this.treeData = res.data
      // console.log('所有角色列表', res)
    },
    // 设置标题
    selectInfo (selectedKeys, info) {
      // console.log(info.node.$parent.dataRef)
      let arr2 = []
      if (info.node.$parent.dataRef) {
        arr2 = getParentTitle(info.node.$parent)
      }
      // console.log(info.node.dataRef.title)
      arr2.push(info.node.dataRef.role_name)
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
        ruleName: '',
        listOrder: ''
      })
    },
    // 删除输入框
    remove (index) {
      this.inputArr.splice(index, 1)
    },
    // 批量删除菜单
    removeMe (id, index) {
      // console.log(id)
      this.idArr.push(id)
      this.itemInfo.children.splice(index, 1)
    },
    // 选择菜单
    selectItem (item) {
      // 显示右边结构
      this.rightShow = true
      this.showMunes = false
      this.itemInfo = {}
      // 清空右侧输入框数组
      this.inputArr = []
      for (let i = 0; i < 5; i++) {
        this.inputArr.push({
          id: '',
          parentId: '',
          roleName: '',
          listOrder: ''

        })
      }
      if (item.children) {
        this.itemInfo = JSON.parse(JSON.stringify(item))
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

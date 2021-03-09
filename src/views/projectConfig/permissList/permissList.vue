<template>
  <div class="permissList">
    <a-row :gutter="24">
      <a-col :span='10'>
        <a-card>

          <a-tree class="draggable-tree"
                  :tree-data="treeData2"
                  @select='selectInfo'>
            <template slot="custom"
                      slot-scope="item">
              {{item.title}}
              <a-icon class="icon"
                      type="drag" />
              <a-icon class="icon"
                      type="form"
                      @click="edit" />
              <a-icon class="icon"
                      type="delete"
                      @click="del" />
              <a-icon class="icon"
                      type="cluster"
                      @click="selectItem(item)" />
            </template>
          </a-tree>
        </a-card>
      </a-col>
      <a-col :span='14'>
        <a-card>
          <div class="content">
            <div class="left">
              <div>
                美好生活家园APP
                <a-icon type="right" />
              </div>
              <div class="t1"
                   v-show="titleArr.length>0"
                   v-for="(item, index) in titleArr"
                   :key="index">
                {{item}}
                <a-icon type="right" />
              </div>
            </div>
            <div class="right">
              <div>
                <div class="r2"
                     v-show="itemInfo"
                     v-for="(item,index) in itemInfo.children"
                     :key='index'>
                  <a-input v-model="item.title"
                           style="width:300px"
                           placeholder="模块名称"></a-input>
                  <a-input style="width:100px"
                           placeholder="简称"></a-input>
                </div>
              </div>
              <div class="r1"
                   v-for="(item,index) in inputArr"
                   :key='item'>
                <a-input style="width:300px"
                         placeholder="模块名称"></a-input>
                <a-input style="width:100px"
                         placeholder="简称"></a-input>
                <a-icon type="plus"
                        class="plus"
                        @click="add" />
                <a-icon type="close"
                        @click="remove(index)" />
              </div>
              <a-button type='primary'>保存</a-button>
              <a-button>返回</a-button>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <editModel ref="editModel"></editModel>
    <delModel ref="delModel"></delModel>
  </div>
</template>

<script>

import editModel from './editModel'
import delModel from './delModel'
const treeData2 = [
  {
    title: '首页',
    key: '0-0',
    scopedSlots: {
      title: 'custom'
    },
    children: [
      {
        title: '搜索',
        key: '0-0-0',
        scopedSlots: {
          title: 'custom'
        }
      },
      {
        title: '扫一扫',
        key: '0-0-1',
        scopedSlots: {
          title: 'custom'
        }
      },
      {
        title: '消息',
        key: '0-0-2',
        scopedSlots: {
          title: 'custom'
        }
      }
    ]
  },
  {
    title: '生活',
    key: '0-1',
    scopedSlots: {
      title: 'custom'
    },
    children: [
      {
        title: '全部分类',
        key: '0-1-0',
        scopedSlots: {
          title: 'custom'
        }
      },
      {
        title: '搜索',
        key: '0-1-1',
        scopedSlots: {
          title: 'custom'
        }
      },
      {
        title: '热门搜索',
        key: '0-1-2',
        scopedSlots: {
          title: 'custom'
        },
        children: [
          {
            title: '有趣',
            key: '0-2-0',
            scopedSlots: {
              title: 'custom'
            }
          },
          {
            title: '哈哈',
            key: '0-2-1',
            scopedSlots: {
              title: 'custom'
            }
          }
        ]
      }
    ]
  }

]
export default {
  components: {
    editModel,
    delModel
  },
  data () {
    return {
      treeData2,
      inputArr: [1, 2, 3, 4, 5],
      itemInfo: {},
      titleArr: []
    }
  },
  methods: {
    selectInfo (selectedKeys, info) {
      console.log('selectedKeys', selectedKeys)
      console.log('info', info)
    },
    // 删除节点
    del () {
      this.$refs.delModel.isShow = true
    },
    // 编辑
    edit () {
      this.$refs.editModel.isShow = true
    },
    // 添加输入框
    add () {
      this.inputArr.push(Math.random() * 999)
    },
    // 删除输入框
    remove (index) {
      this.inputArr.splice(index, 1)
    },
    // 选择菜单
    selectItem (item) {
      if (item.children) {
        this.itemInfo = item
        console.log(item)
      } else {
        console.log(item)
        let obj = {}

        obj = {
          ...item.dataRef
        }
        const arr = []
        arr.push(obj)
        this.itemInfo = { children: arr }
      }
    }

  }
}
</script>

<style lang='less' scoped>
.permissList {
  .icon {
    margin: 0 5px;
    font-size: 16px;
  }
  .content {
    .left {
      display: flex;
      align-items: center;
    }
    .right {
      margin-top: 30px;
      .r1 {
        margin-bottom: 10px;
        .plus {
          margin: 0 10px;
        }
      }
      .r2 {
        margin-bottom: 10px;
      }
      button {
        margin-right: 10px;
      }
    }
  }
}
</style>

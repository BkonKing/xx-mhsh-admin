<template>
  <a-modal
v-model="isShow"
           title="权限">
    <a-tree
v-model="checkedKeys"
            checkable
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :selected-keys="selectedKeys"
            :tree-data="treeData"
            @expand="onExpand"
            @select="onSelect" />
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      expandedKeys: ['0-0-0', '0-0-1'], // 张开指定的树节点
      autoExpandParent: true, // 是否自动展开父节点
      checkedKeys: ['0-0-0'], // 选中复选框的树节点
      selectedKeys: [], // 设置选中的树节点
      treeData: [

        {
          title: '父级菜单',
          key: '0-0-0',
          children: [
            { title: '子集菜单一', key: '0-0-0-0' },
            { title: '子集菜单二', key: '0-0-0-1' },
            { title: '子集菜单三', key: '0-0-0-2' }
          ]
        },
        {
          title: '父级菜单',
          key: '0-0-1',
          children: [
            { title: '子集菜单一', key: '0-0-1-0' },
            { title: '子集菜单二', key: '0-0-1-1' },
            { title: '子集菜单三', key: '0-0-1-2' }
          ]
        },
        {
          title: '父级菜单',
          key: '0-1',
          children: [
            { title: '子集菜单一', key: '0-1-0-0' },
            { title: '子集菜单二', key: '0-1-0-1' },
            { title: '子集菜单三', key: '0-1-0-2' }
          ]
        }
      ]
    }
  },
  watch: {
    // 选中节点改变触发
    checkedKeys (val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    // 展开/收起节点时触发
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    // 点击复选框触发
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    // 点击树节点触发
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    }
  }
}
</script>

<style lang='less'>
</style>

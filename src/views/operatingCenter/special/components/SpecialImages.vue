<template>
  <a-card title="专题图片" style="margin-top: 24px" :bordered="false">
    <div style="margin-bottom: 24px">
      行与行自动上下拼接；列最多三个图片自动左右拼接；支持扩展名：.png .jpg；
    </div>
    <a-row type="flex" :gutter="20">
      <a-col flex="397px">
        <mobile-preview
          :data="previewData"
          image-url-type="array"
        ></mobile-preview>
      </a-col>
      <a-col flex="1">
        <a-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="tableColumns"
          :dataSource="tableData"
          :pagination="false"
          :scroll="{ y: 687 }"
        >
          <template slot="column1" slot-scope="text, record">
            <cform :ref="`cform1${record.id}`" v-model="record.data[0]"></cform>
          </template>
          <template slot="column2" slot-scope="text, record">
            <cform :ref="`cform2${record.id}`" v-model="record.data[1]"></cform>
          </template>
          <template slot="column3" slot-scope="text, record">
            <cform :ref="`cform3${record.id}`" v-model="record.data[2]"></cform>
          </template>
          <template slot="list_order" slot-scope="text, record">
            <a-input
              v-model="record.sort"
              v-number-input.int
              :maxLength="5"
              @blur="changeSort"
            ></a-input>
          </template>
          <template slot="actions" slot-scope="text, record, index">
            <a @click="remove(index)">删除</a>
          </template>
        </a-table>
        <div class="add-btn" @click="add">
          + 新增行
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import MobilePreview from './MobilePreview'
import cform from './cform'
import { sort } from '@/utils/util'
const obj = {
  id: '',
  block_type: undefined,
  block_content: undefined,
  block_img: []
}
export default {
  name: 'SpecialImages',
  components: {
    cform,
    MobilePreview
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tableColumns: [
        {
          title: '行',
          align: 'center',
          width: 50,
          customRender (text, record, index) {
            return index + 1
          }
        },
        {
          title: '列1',
          width: '30%',
          scopedSlots: { customRender: 'column1' }
        },
        {
          title: '列2',
          width: '30%',
          scopedSlots: { customRender: 'column2' }
        },
        {
          title: '列3',
          width: '30%',
          scopedSlots: { customRender: 'column3' }
        },
        {
          title: '排序',
          dataIndex: 'sort',
          align: 'center',
          width: 80,
          scopedSlots: { customRender: 'list_order' }
        },
        {
          title: '操作',
          dataIndex: 'id',
          align: 'center',
          width: 80,
          scopedSlots: { customRender: 'actions' }
        }
      ],
      tableData: [],
      goodsOptions: [],
      specialOptions: [],
      formData: clonedeep(obj)
    }
  },
  computed: {
    previewData () {
      return {
        title: this.title,
        list: this.tableData
      }
    }
  },
  methods: {
    add () {
      this.tableData.push(clonedeep({
        data: [clonedeep(obj), clonedeep(obj), clonedeep(obj)],
        sort: '',
        id: Math.random()
      }))
      this.$nextTick(() => {
        const tableElement = document.getElementsByClassName(
          'ant-table-body'
        )[0]
        const tableBody = document.getElementsByClassName('ant-table-tbody')[0]
        tableElement.scrollTop = tableBody.offsetHeight
      })
    },
    // 排序失去焦点重新排序
    changeSort () {
      this.tableData = sort(this.tableData, 'sort')
    },
    remove (index) {
      this.tableData.splice(index, 1)
    },
    validate () {
      const cformValidate = []
      this.tableData.forEach(obj => {
        cformValidate.push(this.$refs[`cform1${obj.id}`].validate())
        cformValidate.push(this.$refs[`cform2${obj.id}`].validate())
        cformValidate.push(this.$refs[`cform3${obj.id}`].validate())
      })
      return Promise.all(cformValidate)
    },
    setData (data) {
      this.tableData = data.map(obj => {
        const listData =
          obj.data && obj.data.length
            ? this.completionListRow(obj.data)
            : [
              clonedeep(this.formData),
              clonedeep(this.formData),
              clonedeep(this.formData)
            ]
        return {
          sort: obj.sort,
          data: listData,
          id: Math.random()
        }
      })
    },
    // 补全当行数据为3个对象
    completionListRow (data) {
      const rowData = []
      for (let index = 0; index < 3; index++) {
        let itemData = data[index]
        itemData = itemData ? {
          id: Math.random(),
          block_type: itemData.block_type,
          thematic_content_id: itemData.thematic_content_id,
          block_content: itemData.block_content,
          goods_name: itemData.goods_name,
          block_img: itemData.block_img ? [itemData.block_img] : []
        } : clonedeep(this.formData)
        rowData.push(itemData)
      }
      return rowData
    }
  }
}
</script>

<style lang="less" scoped>
.add-btn {
  margin-top: 12px;
  width: 100%;
  height: 32px;
  border-radius: 4px;
  border: 2px dashed #eeeeee;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
}
</style>

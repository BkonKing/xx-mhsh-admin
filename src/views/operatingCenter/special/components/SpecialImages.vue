<template>
  <a-card title="专题图片" style="margin-top: 24px" :bordered="false">
    <div style="margin-bottom: 24px">
      行与行自动上下拼接；列最多三个图片自动左右拼接；支持扩展名：.png .jpg；
    </div>
    <a-row type="flex" :gutter="20">
      <a-col flex="397px">
        <mobile-preview :data="previewData" image-url-type="array"></mobile-preview>
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
            <cform
              v-model="record.data[0]"
              :goodsOptions="goodsOptions"
              :specialOptions="specialOptions"
            ></cform>
          </template>
          <template slot="column2" slot-scope="text, record">
            <cform
              v-model="record.data[1]"
              :goodsOptions="goodsOptions"
              :specialOptions="specialOptions"
            ></cform>
          </template>
          <template slot="column3" slot-scope="text, record">
            <cform
              v-model="record.data[2]"
              :goodsOptions="goodsOptions"
              :specialOptions="specialOptions"
            ></cform>
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
import { searchGoods } from '@/api/operatingCenter/special'
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
      specialOptions: []
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
  created () {
    this.searchGoods()
  },
  methods: {
    // 获取所有的商品
    searchGoods () {
      searchGoods().then(({ list }) => {
        this.goodsOptions = list || []
      })
    },
    add () {
      const obj = {
        id: '',
        block_type: undefined,
        block_img: []
      }
      this.tableData.push({
        data: [clonedeep(obj), clonedeep(obj), clonedeep(obj)],
        sort: '',
        id: Math.random()
      })
    },
    // 排序失去焦点重新排序
    changeSort () {
      this.tableData = sort(this.tableData, 'sort')
    },
    remove (index) {
      this.tableData.splice(index, 1)
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

<template>
  <page-header-view>
    <a-card style="margin-top: 24px" :bordered="false">
      <a-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data-source="tableData"
        :pagination="false"
      >
        <span class="table-action" slot="action" slot-scope="text, record">
          <a @click="openEditModal(record)">编辑</a>
          <a
            ><a-popconfirm
              title="你确定要删除该活动吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleRemove(record)"
            >
              <a-icon
                slot="icon"
                type="close-circle"
                theme="filled"
                style="color: red"
              />
              <a>删除</a>
            </a-popconfirm></a
          >
        </span>
      </a-table>
      <a-button
        type="dashed"
        style="width: 100%;margin-top: 20px;"
        @click="openEditModal(null)"
        >+ 添加</a-button
      >
    </a-card>
    <a-modal
      v-model="editModalVisible"
      :title="modalTitle"
      :width="600"
      :destroyOnClose="true"
      @ok="saveData"
    >
      <a-form-model
        ref="editFrom"
        :model="editFrom"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="有效时间" prop="timeType" required>
          <a-radio-group v-model="editFrom.timeType">
            <a-radio :value="2">有限</a-radio>
            <a-radio :value="1">不限</a-radio>
          </a-radio-group>
          <template v-if="+editFrom.timeType === 2">
            <a-form-model-item
              prop="time"
              :rules="{ required: true, message: '请选择有效时间' }"
              style="margin-bottom: 0;"
            >
              <a-range-picker
                v-model="editFrom.time"
                :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                :placeholder="['开始时间', '结束时间']"
                valueFormat="YYYY-MM-DD HH:mm:ss"
                style="width: 100%;"
              />
            </a-form-model-item>
            <div style="color: #00000072;line-height: 1;">
              到达设定时间将自动生效和失效，生效期间则在APP显示
            </div>
          </template>
        </a-form-model-item>
        <a-form-model-item label="活动商品" prop="goodIds" required>
          <a-select
            v-model="editFrom.goodIds"
            show-search
            mode="multiple"
            placeholder="请选择"
            :filter-option="filterOption"
          >
            <a-select-option
              v-for="item in goodsOptions"
              :key="item.id"
              :value="item.id"
              >{{ item.goods_name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="可购买楼栋" prop="buildingIds" required>
          <a-select
            v-model="editFrom.buildingIds"
            show-search
            mode="multiple"
            placeholder="请选择"
            :filter-option="filterOption"
          >
            <a-select-option
              v-for="item in buildOptions"
              :key="item.id"
              :value="item.id"
              >{{ item.building_name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </page-header-view>
</template>

<script>
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import { getBuild } from '@/api/community'
import { validAForm } from '@/utils/util'
import PageHeaderView from '@/layouts/PageHeaderView'
import {
  getCeremonyList,
  optCeremony,
  getGoodsByProject
} from '@/api/operatingCenter/handRoomGift'

export default {
  name: 'handRoomGift',
  components: {
    PageHeaderView
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 16 }, sm: { span: 16 } },
      columns: [
        {
          title: '活动时间',
          dataIndex: 'activityStime',
          width: 182,
          customRender: (text, row) => {
            const timeType = +row.timeType
            const eTime = row.activityEtime
            if (timeType === 1) {
              return '不限'
            }
            const ele = (
              <div>
                <div>{text}</div>
                <div>{eTime}</div>
              </div>
            )
            return text || eTime ? ele : '--'
          }
        },
        {
          title: '状态',
          width: 90,
          dataIndex: 'statusDesc'
        },
        {
          title: '活动商品',
          dataIndex: 'goodsStr'
        },
        {
          title: '可购买楼栋',
          dataIndex: 'buildingStr'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: 110,
          scopedSlots: { customRender: 'action' }
        }
      ],
      tableData: [],
      editModalVisible: false,
      editFrom: {
        timeType: 2,
        time: [],
        goodIds: [],
        buildingIds: []
      },
      buildOptions: [],
      goodsOptions: []
    }
  },
  computed: {
    modalTitle () {
      return this.editFrom.id ? '编辑' : '新增'
    }
  },
  created () {
    this.getTableData()
    this.getGoodsByProject()
    this.getBuild()
  },
  methods: {
    async getTableData () {
      const { list } = await getCeremonyList()
      this.tableData = list
    },
    openEditModal (data) {
      if (data) {
        const editData = cloneDeep(data)
        editData.buildingIds = editData.buildingIds
          ? editData.buildingIds.split(',').map((data) => +data)
          : []
        editData.goodIds = editData.goodsIds
          ? editData.goodsIds.split(',')
          : []
        this.editFrom = editData
      } else {
        const defaultData = {
          timeType: 2,
          time: [],
          goodIds: [],
          buildingIds: []
        }
        this.editFrom = defaultData
      }
      this.editModalVisible = true
    },
    async getGoodsByProject () {
      const { list } = await getGoodsByProject()
      this.goodsOptions = list || []
    },
    async getBuild () {
      const { list } = await getBuild()
      this.buildOptions = list || []
    },
    filterOption (input, option) {
      const value = input.toLowerCase()
      const text = option.componentOptions.children[0].text.toLowerCase()
      return text.indexOf(value) >= 0 || option.key == value
    },
    saveData () {
      validAForm(this.$refs.editFrom).then(async () => {
        const params = cloneDeep(this.editFrom)
        params.goodIds = params.goodIds.join(',')
        params.buildingIds = params.buildingIds.join(',')
        const { success } = await optCeremony({
          optType: params.id ? 2 : 1,
          ...params
        })
        if (success) {
          this.getTableData()
          this.editModalVisible = false
          this.$message.success('保存成功')
        }
      })
    },
    async handleRemove ({ id }) {
      // optType 1添加 2修改 3删除
      const { success } = await optCeremony({
        optType: 3,
        id
      })
      if (success) {
        this.$message.success('操作成功')
        this.getTableData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-pro-page-header-wrap-children-content {
  padding-bottom: 24px;
}
</style>

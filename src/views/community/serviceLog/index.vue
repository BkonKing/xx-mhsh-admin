<template>
  <page-header-view>
    <a-card class="search-card" style="margin-top: 24px" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="楼栋">
                <a-select
                  v-model="queryParam.build_id"
                  placeholder="请选择"
                  @change="handleBuildChange"
                >
                  <a-select-option
                    v-for="item in buildOptions"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.building_name }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="单元">
                <a-select v-model="queryParam.unit_id" placeholder="请选择">
                  <a-select-option
                    v-for="item in unitOptions"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.unit_name }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="房屋">
                <a-input
                  v-model="queryParam.house"
                  placeholder="请输入"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="服务时间">
                <a-range-picker
                  v-model="queryParam.service_time"
                  valueFormat="YYYY-MM-DD HH:mm:ss"
                  :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                  :placeholder="['开始时间', '结束时间']"
                  :ranges="{
                    本周: [moment().startOf('week'), moment().endOf('week')],
                    本月: [moment().startOf('month'), moment().endOf('month')]
                  }"
                  style="width: 100%;"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="服务者">
                <a-input
                  v-model="queryParam.service_provider"
                  placeholder="请输入"
                ></a-input>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="服务主题">
                  <a-input
                    v-model="queryParam.service_title"
                    placeholder="请输入"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="用户标签">
                  <a-tree-select
                    v-model="queryParam.user_tag"
                    style="width: 100%"
                    multiple
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    :tree-data="labelOptions"
                    :treeCheckable="true"
                    :showCheckedStrategy="SHOW_PARENT"
                    :maxTagCount="3"
                    treeNodeFilterProp="title"
                    placeholder="请选择"
                    :replaceFields="{
                      key: 'id',
                      value: 'id',
                      title: 'tag_name',
                      children: 'child'
                    }"
                    tree-default-expand-all
                  >
                  </a-tree-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="满意度">
                  <a-select
                    v-model="queryParam.service_satisfied"
                    placeholder="请选择"
                  >
                    <a-select-option
                      v-for="item in satisfactionOptions"
                      :key="item.value"
                      :value="item.value"
                      >{{ item.label }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="业主">
                  <a-input
                    v-model="queryParam.owner"
                    placeholder="ID、昵称、姓名、手机号"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="创建时间">
                  <a-range-picker
                    v-model="queryParam.ctime"
                    valueFormat="YYYY-MM-DD HH:mm:ss"
                    :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                    :placeholder="['开始时间', '结束时间']"
                    style="width: 100%;"
                  />
                </a-form-item>
              </a-col>
            </template>
            <advanced-form
              v-model="advanced"
              :md="16"
              @reset="resetTable"
              @search="$refs.table.refresh(true)"
            ></advanced-form>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card style="margin-top: 24px;margin-bottom: 24px;" :bordered="false">
      <div class="table-operator">
        <a-button type="primary" @click="openEditModal">
          新增记录
        </a-button>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :showPagination="true"
      >
        <template slot="userInfo" slot-scope="text, record">
          <div v-if="text || record.mobile" @click="openUserInfo(record)" :class="{'click-text': record.uid}">
            <div>{{ text }}</div>
            <div>{{ record.mobile }}</div>
          </div>
          <template v-else>(无)</template>
        </template>
        <template slot="tags" slot-scope="text">
          <s-tag
            v-for="label in text"
            :key="label.id"
            v-show="label.sy_project_id == projectId"
            :color="label.colour"
            style="margin-bottom: 5px;"
          >
            {{ label.tag_name }}
          </s-tag>
        </template>
        <span class="table-action" slot="action" slot-scope="text, record">
          <template>
            <a style="margin-right: 10px;" @click="openLogModal(record)"
              >查看</a
            >
            <a @click="openEditModal(record)">跟进</a>
          </template>
        </span>
      </s-table>
    </a-card>
    <!-- 编辑服务记录 -->
    <service-log-form
      v-model="editVisible"
      ref="edit-log"
      :data="editForm"
      :buildOptions="buildOptions"
      :satisfactionOptions="satisfactionEditOptions"
      :zIndex="1003"
      @editUserTag="editUserTag"
      @success="editSuccess"
    ></service-log-form>
    <!-- 查看跟进 -->
    <service-log-form
      v-model="lookVisible"
      ref="look-log"
      :data="editForm"
      isLook
      :footer="null"
      @editStep="openEditModal"
    ></service-log-form>
    <check-user-tag
      v-model="tagVisible"
      :tags="labelList"
      :userInfo="userInfo"
      @success="checkTagSuccess"
    ></check-user-tag>
  </page-header-view>
</template>

<script>
// /community/serviceLog
import PageHeaderView from '@/layouts/PageHeaderView'
import { STable, AdvancedForm } from '@/components'
import moment from 'moment'
import { getBuild, getUnit, getServiceRecord } from '@/api/community'
import { TreeSelect } from 'ant-design-vue'
import { getDimensionList } from '@/api/userManage'
import serviceLogForm from './components/service-log-form'
import checkUserTag from './components/check-user-tag'
import STag from '@/views/userManage/components/tag'
import clonedeep from 'lodash.clonedeep'
import Cookies from 'js-cookie'

const { SHOW_PARENT } = TreeSelect

export default {
  components: {
    PageHeaderView,
    STable,
    AdvancedForm,
    serviceLogForm,
    checkUserTag,
    STag
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      projectId: Cookies.get('project_id'),
      SHOW_PARENT,
      userInfo: {},
      advanced: false,
      queryParam: {},
      columns: [
        {
          title: 'ID',
          width: 78,
          dataIndex: 'id'
        },
        {
          title: '房产',
          dataIndex: 'house_property',
          // sorter: true,
          width: '12%',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '业主',
          dataIndex: 'owner',
          width: 116,
          scopedSlots: { customRender: 'userInfo' }
        },
        {
          title: '用户标签',
          dataIndex: 'user_tag_data',
          scopedSlots: { customRender: 'tags' }
        },
        {
          title: '满意度',
          dataIndex: 'service_satisfied_desc',
          width: 78,
          customRender: text => {
            return text
          }
        },
        {
          title: '服务主题',
          dataIndex: 'service_title',
          width: '12%',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '服务者',
          dataIndex: 'service_provider',
          width: 78,
          customRender: text => {
            return text || '--'
          }
        },
        {
          title: '服务时间',
          // sorter: true,
          dataIndex: 'service_time',
          width: 160
        },
        {
          title: '操作',
          width: 100,
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const params = clonedeep(this.queryParam)
        const time = params.service_time
        const ctime = params.ctime
        if (time && time.length) {
          params.service_time = `${time[0]}~${time[1]}`
        }
        if (ctime && ctime.length) {
          params.ctime = `${ctime[0]}~${ctime[1]}`
        }
        if (params.user_tag && params.user_tag.length) {
          params.user_tag = this.setTagTreeData(params.user_tag)
          params.tag_id_text = params.user_tag.join(',')
        }
        return getServiceRecord(Object.assign(parameter, params))
      },
      satisfactionOptions: [
        {
          value: 4,
          label: '满意'
        },
        {
          value: 3,
          label: '一般'
        },
        {
          value: 2,
          label: '差'
        },
        {
          value: 1,
          label: '无'
        }
      ], // 满意度
      satisfactionEditOptions: [
        {
          value: 4,
          label: '满意'
        },
        {
          value: 3,
          label: '一般'
        },
        {
          value: 2,
          label: '差'
        }
      ],
      buildOptions: [],
      unitOptions: [],
      lookVisible: false,
      editVisible: false,
      tagVisible: false,
      labelList: [],
      labelOptions: [],
      editForm: {
        build_id: '',
        unit_id: '',
        house_id: '',
        service_title: '',
        service_provider: '',
        service_satisfied: '',
        service_time: '',
        service_content: ''
      }
    }
  },
  created () {
    this.getBuild()
    this.getDimensionList()
  },
  methods: {
    moment,
    getBuild () {
      getBuild().then(({ list }) => {
        this.buildOptions = list || []
      })
    },
    getDimensionList () {
      getDimensionList().then(({ data }) => {
        this.labelList = clonedeep(data) || []
        data.forEach((obj, index) => {
          obj.tag_name = obj.dimension_name
          obj.id = `dimension|${index}`
        })
        this.labelOptions = data || []
      })
    },
    setTagTreeData (data) {
      let arr = data.map(obj => {
        const ids = obj.split('dimension|')
        if (ids[1]) {
          const newTag = this.labelOptions[+ids[1]].child.map(obj => obj.id)
          return newTag
        } else {
          return obj
        }
      })
      arr = arr.reduce((acc, val) => acc.concat(val), [])
      return arr
    },
    handleBuildChange () {
      this.$set(this.queryParam, 'unit_id', undefined)
      this.$set(this.queryParam, 'house_id', undefined)
      this.getUnit(this.queryParam.build_id)
    },
    getUnit () {
      getUnit({
        build_id: this.queryParam.build_id
      }).then(({ data }) => {
        this.unitOptions = data || []
      })
    },
    resetTable () {
      this.queryParam = {}
      this.unitOptions = []
      this.$refs.table.refresh(true)
    },
    openLogModal (item) {
      this.editForm = clonedeep(item)
      this.lookVisible = true
    },
    openEditModal (item) {
      if (item) {
        this.editForm = clonedeep(item)
      } else {
        this.$refs.editForm && this.$refs.editForm.resetFields()
      }
      this.editVisible = true
    },
    editUserTag ({ userInfo }) {
      this.userInfo = userInfo
      this.tagVisible = true
    },
    editSuccess () {
      if (this.editForm.process_id) {
        this.$refs['look-log'].refresh()
      }
      this.$refs.table.refresh()
    },
    checkTagSuccess () {
      this.$refs['look-log'] && this.$refs['look-log'].getTags()
      this.$refs['edit-log'] && this.$refs['edit-log'].getTags()
      this.$refs.table.refresh()
    },
    openUserInfo ({ uid }) {
      uid && window.open(
        `/xmht/household/member/getMemberList?uid=${uid}`,
        '_blank'
      )
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper {
  /deep/ .ant-form-inline .ant-form-item > .ant-form-item-label {
    min-width: 80px;
    flex-shrink: 0;
  }
}
h3 {
  margin-bottom: 20px;
  font-weight: bold;
}
/deep/ .ant-form-item-control,
/deep/ .ant-form-item-label {
  line-height: 32px;
}
.form-item-text {
  /deep/ .ant-form-item-control,
  /deep/ .ant-form-item-label {
    line-height: 24px;
  }
}
/deep/ .ant-table-tbody td {
  padding-bottom: 11px;
}
.click-text {
  cursor: pointer;
  div {
    color: @primary-color;
  }
}
</style>

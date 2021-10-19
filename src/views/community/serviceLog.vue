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
                  :show-time="{ defaultValue: [defaultTime, defaultTime] }"
                  :placeholder="['开始时间', '结束时间']"
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
                  <a-select
                    v-model="queryParam.user_tag"
                    placeholder="请选择"
                    @change="handleBuildChange"
                  >
                    <a-select-option
                      v-for="item in buildOptions"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.company_name }}</a-select-option
                    >
                  </a-select>
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
                    v-model="queryParam.staff_text"
                    placeholder="ID、昵称、姓名、手机号"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="创建时间">
                  <a-range-picker
                    v-model="queryParam.ctime"
                    valueFormat="YYYY-MM-DD HH:mm:ss"
                    :show-time="{ defaultValue: [defaultTime, defaultTime] }"
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
    <a-card style="margin-top: 24px" :bordered="false">
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
          <template v-if="text || record.mobile">
            <a>{{ text }}</a>
            <div>{{ record.mobile }}</div>
          </template>
          <template v-else>无</template>
        </template>
        <template slot="tags" slot-scope="text">
          <s-tag v-for="label in text" :key="label.id" :color="label.colour">
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
      :data="editForm"
      :buildOptions="buildOptions"
      :satisfactionOptions="satisfactionOptions"
      @success="$refs.table.refresh()"
    ></service-log-form>
    <!-- 查看跟进 -->
    <service-log-form
      v-model="lookVisible"
      :data="editForm"
      isLook
      :footer="null"
    ></service-log-form>
    <a-modal
      v-model="tagVisible"
      title="编辑标签"
      :width="800"
      @ok="awardCredits"
      :destroyOnClose="true"
    >
      <div style="padding: 0 24px 24px 0;border-bottom: 1px solid #eee;">
        <div>用户昵称(姓名)：</div>
        <div>
          <s-tag
            v-for="(label, index) in tagChecked"
            :key="label.id"
            :closable="!+label.project_id"
            color="196,29,127"
            @close="resetTable"
          >
            {{ label.tag_name }}</s-tag
          >
        </div>
      </div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="维度">
                <a-select v-model="tagParams.dimension" placeholder="请选择">
                  <a-select-option
                    v-for="option in labelList"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.dimension_name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="标签">
                <a-input
                  v-model="tagParams.labelText"
                  placeholder="请输入"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span
                class="table-page-search-submitButtons"
                style="text-align: right;"
              >
                <a-button type="primary" @click="search">查询</a-button>
                <a-button style="margin-left: 8px" @click="reset"
                  >重置</a-button
                >
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div>
        <a-checkbox-group v-model="tagChecked">
          <div
            v-for="item in labelList"
            :key="item.id"
            v-show="filterParams.dimension === item.id || !filterParams.dimension"
          >
            <div>{{ item.dimension_name }}</div>
            <div>
              <a-checkbox
                v-for="(label, index) in item.child"
                :value="label.id"
                :key="label.id"
                v-show="
                  label.tag_name.indexOf(filterParams.labelText) > -1 ||
                    !filterParams.labelText
                "
                >{{ label.tag_name }}</a-checkbox
              >
            </div>
          </div>
        </a-checkbox-group>
      </div>
    </a-modal>
  </page-header-view>
</template>

<script>
import PageHeaderView from '@/layouts/PageHeaderView'
import { STable, AdvancedForm } from '@/components'
import moment from 'moment'
import { getBuild, getUnit, getHouse, getServiceRecord } from '@/api/community'
import STag from '../userManage/components/tag'
import serviceLogForm from './components/service-log-form'
import clonedeep from 'lodash.clonedeep'

export default {
  components: {
    PageHeaderView,
    STable,
    STag,
    AdvancedForm,
    serviceLogForm
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      advanced: false,
      queryParam: {},
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '房产',
          dataIndex: 'house_property',
          sorter: true,
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '业主',
          dataIndex: 'owner',
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
          customRender: text => {
            return text
          }
        },
        {
          title: '服务主题',
          dataIndex: 'service_title',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '服务者',
          dataIndex: 'service_provider',
          customRender: text => {
            return text || '--'
          }
        },
        {
          title: '服务时间',
          sorter: true,
          dataIndex: 'service_time'
        },
        {
          title: '操作',
          width: '100px',
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
      buildOptions: [],
      unitOptions: [],
      lookVisible: false,
      editVisible: false,
      tagVisible: false,
      labelList: [
        {
          id: '1',
          dimension_name: '兴趣爱好',
          sort: '0',
          child: [
            {
              id: '2',
              project_id: '0',
              dimension_id: '1',
              tag_name: '吃饭',
              sort: '0',
              count: 0
            },
            {
              id: '1',
              project_id: '0',
              dimension_id: '1',
              tag_name: '睡觉',
              sort: '0',
              count: 0
            }
          ]
        },
        {
          id: '2',
          dimension_name: '性格',
          sort: '0',
          child: [
            {
              id: '3',
              project_id: '0',
              dimension_id: '2',
              tag_name: '吃饭',
              sort: '0',
              count: 0
            },
            {
              id: '4',
              project_id: '0',
              dimension_id: '2',
              tag_name: '睡觉',
              sort: '0',
              count: 0
            }
          ]
        }
      ],
      editForm: {},
      tagForm: {
        child: []
      },
      tagParams: {},
      filterParams: {},
      tagChecked: []
    }
  },
  created () {
    this.getBuild()
  },
  methods: {
    getBuild () {
      getBuild().then(({ list }) => {
        this.buildOptions = list || []
      })
    },
    addLog () {},
    awardCredits () {},
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
    reset () {
      this.tagParams = {}
      this.filterParams = {}
    },
    search () {
      this.filterParams = clonedeep(this.tagParams)
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
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper {
  margin-top: 24px;
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
</style>

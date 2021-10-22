<template>
  <page-header-view>
    <div class="appUser">
      <a-card class="search-card" style="margin-top: 24px" :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="楼栋">
                  <a-select
                    v-model="queryParam.building_id"
                    placeholder="请选择"
                    @change="handleBuildChange(false)"
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
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="房屋">
                    <a-input
                      v-model="queryParam.sSearch"
                      placeholder="请输入"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="业主">
                    <a-input
                      v-model="queryParam.sSearch"
                      placeholder="ID、昵称、姓名、手机号"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="是否启用">
                    <a-select
                      v-model="queryParam.is_enabled"
                      placeholder="请选择"
                    >
                      <a-select-option value="1">是</a-select-option>
                      <a-select-option value="0">否</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="创建时间">
                    <a-range-picker
                      v-model="queryParam.create_time"
                      valueFormat="YYYY-MM-DD HH:mm:ss"
                      :show-time="{ defaultValue: [defaultTime, defaultTime] }"
                      :placeholder="['开始时间', '结束时间']"
                      style="width: 100%;"
                    />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="用户标签">
                    <a-tree-select
                      v-model="queryParam.user_tag"
                      style="width: 100%"
                      multiple
                      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                      :tree-data="lebelOptions"
                      :dropdownMatchSelectWidth="false"
                      :maxTagCount="3"
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
                  <a-form-item label="服务记录">
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
              </template>
              <advanced-form
                v-model="advanced"
                :md="24"
                @reset="resetTable"
                @search="$refs.table.refresh(true)"
              ></advanced-form>
            </a-row>
          </a-form>
        </div>
      </a-card>
      <a-card style="margin-top: 24px" :bordered="false">
        <div class="table-operator">
          <a-button @click="openEditModal"> 添加房屋 </a-button>
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="handleImport">
                导入房屋
              </a-menu-item>
            </a-menu>
            <a-button> 批量操作 <a-icon type="down"/></a-button>
          </a-dropdown>
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
            <template v-if="text || record.owner_mobile">
              <a>{{ text }}</a>
              <div>{{ record.owner_mobile }}</div>
            </template>
            <template v-else>无</template>
          </template>
          <template slot="tags" slot-scope="text">
            <s-tag v-for="label in text" :key="label.id" :color="label.colour">
              {{ label.tag_name }}
            </s-tag>
          </template>
          <template slot="switch" slot-scope="text, record">
            <a-switch
              :checked="Boolean(+record.is_enabled)"
              @change="changeEnabled(record)"
            />
          </template>
          <span class="table-action" slot="action" slot-scope="text, record">
            <template>
              <!-- <a style="margin-right: 10px;">查看</a> -->
              <a style="margin-right: 10px;" @click="openEditModal(record)"
                >编辑</a
              >
              <a @click="deleteHouse(record)">删除</a>
            </template>
          </span>
        </s-table>
      </a-card>
      <a-modal
        v-model="userVisible"
        :title="`${userForm.id ? '新增' : '编辑'}房屋`"
        :width="640"
        class="house-edit-modal"
        @ok="saveHouse"
        :destroyOnClose="true"
      >
        <a-form-model
          ref="userForm"
          :model="userForm"
          :rules="userRules"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="房产" required>
            <a-row :gutter="12">
              <a-col :md="8" :sm="24">
                <a-form-model-item prop="building_id" style="margin-bottom: 0;">
                  <a-select
                    v-model="userForm.building_id"
                    placeholder="楼栋"
                    @change="handleBuildChange(true)"
                  >
                    <a-select-option
                      v-for="item in buildOptions"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.building_name }}</a-select-option
                    >
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item prop="unit_id" style="margin-bottom: 0;">
                  <a-select v-model="userForm.unit_id" placeholder="单元">
                    <a-select-option
                      v-for="item in unitEditOptions"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.unit_name }}</a-select-option
                    >
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item prop="house_name" style="margin-bottom: 0;">
                  <a-input
                    v-model="userForm.house_name"
                    placeholder="房屋"
                  ></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item label="楼层" prop="floors">
            <a-input
              v-model="userForm.floors"
              suffix="层"
              placeholder="请输入"
              :maxLength="3"
              v-number-input.int
            />
            <div class="alert-text">例：1楼输入“1”</div>
          </a-form-model-item>
          <a-form-model-item label="业主姓名" prop="floors">
            <a-input
              v-model="userForm.owner_name"
              placeholder="请输入"
              :maxLength="20"
            />
          </a-form-model-item>
          <a-form-model-item label="业主手机号" prop="floors">
            <a-input
              v-model="userForm.owner_mobile"
              placeholder="请输入"
              :maxLength="11"
            />
          </a-form-model-item>
          <a-form-model-item v-if="userForm.owner_id" label="用户标签" class="form-item-text" prop="floors">
            <span
              v-if="userInfo.user_tag_data && userInfo.user_tag_data.length"
            >
              <s-tag
                v-for="label in userInfo.user_tag_data"
                :key="label.id"
                :color="label.colour"
              >
                {{ label.tag_name }}
              </s-tag>
            </span>
            <span v-else>--</span>
            <a-icon
              type="edit"
              @click="tagVisible = true"
              style="margin-left: 10px;color: #1890ff;"
            ></a-icon>
          </a-form-model-item>
          <a-form-model-item
            v-if="userForm.id"
            label="满意度"
             prop="floors"
            class="form-item-text"
          >
            {{ userInfo.service_satisfied_desc || "--" }}
          </a-form-model-item>
          <a-form-model-item
            v-if="userForm.id"
            label="服务记录"
             prop="floors"
            class="form-item-text"
          >
            {{ userInfo.service_record || 0 }}条
          </a-form-model-item>
          <a-form-model-item label="是否启用" class="form-item-text" prop="floors">
            <a-switch v-model="userInfo.is_enabled" />
          </a-form-model-item>
          <h3>其他信息</h3>
          <a-form-model-item label="水费" prop="floors">
            <a-row type="flex">
              <a-col flex="1">
                <a-input
                  v-model="userForm.water_account_numb"
                  prefix="户号"
                  :maxLength="25"
                />
              </a-col>
              <a-col flex="1" style="margin-left: 20px;">
                <a-input
                  v-model="userForm.water_meter"
                  prefix="表号"
                  :maxLength="25"
                />
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item label="电费" prop="floors">
            <a-row type="flex">
              <a-col flex="1">
                <a-input
                  v-model="userForm.electric_account_numb"
                  prefix="户号"
                  :maxLength="25"
                />
              </a-col>
              <a-col flex="1" style="margin-left: 20px;">
                <a-input
                  v-model="userForm.electric_meter"
                  prefix="表号"
                  :maxLength="25"
                />
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item label="燃气费" prop="gas_account_numb">
            <a-row type="flex">
              <a-col flex="1">
                <a-input
                  v-model="userForm.gas_account_numb"
                  prefix="户号"
                  :maxLength="25"
                />
              </a-col>
              <a-col flex="1" style="margin-left: 20px;">
                <a-input
                  v-model="userForm.gas_meter"
                  prefix="表号"
                  :maxLength="25"
                />
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item label="建筑面积" prop="house_area">
            <a-input
              v-model="userForm.house_area"
              suffix="㎡"
              v-number-input="{ min: 0, max: 9999999999 }"
            />
          </a-form-model-item>
          <a-form-model-item label="使用面积" prop="usable_area">
            <a-input
              v-model="userForm.usable_area"
              suffix="㎡"
              v-number-input="{ min: 0, max: 9999999999 }"
            />
          </a-form-model-item>
          <a-form-model-item label="附加面积" prop="additive_area">
            <a-input
              v-model="userForm.additive_area"
              suffix="㎡"
              v-number-input="{ min: 0, max: 9999999999 }"
            />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <check-user-tag
        v-model="tagVisible"
        :isGetTag="true"
        :tags="labelList"
        :userInfo="userForm"
        :checkTags="userForm.user_tag_data"
        @getTag="setUserTag"
      ></check-user-tag>
    </div>
    <import-file
      v-model="importVisible"
      templateUrl="/upload/excel_files/美好生活家园房屋导入模版.xls"
      name="housefile"
      :request="importHouse"
      @submit="$refs.table.refresh()"
    >
      <!-- :request="importStaff" -->
    </import-file>
  </page-header-view>
</template>

<script>
// /realty/house
import PageHeaderView from '@/layouts/PageHeaderView'
import { STable, AdvancedForm } from '@/components'
import STag from '@/views/userManage/components/tag'
import importFile from '@/views/userManage/employee/importFile'
import checkUserTag from '@/views/community/components/check-user-tag'
import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'
import { getDimensionList, editUserTag } from '@/api/userManage'
import { getBuild, getUnit } from '@/api/community'
import {
  getHouseList,
  deleteHouse,
  importHouse,
  editHouse,
  setEnabledHouse
} from '@/api/realty'
export default {
  components: {
    PageHeaderView,
    STable,
    AdvancedForm,
    STag,
    checkUserTag,
    importFile
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      advanced: false,
      buildOptions: [],
      unitOptions: [],
      unitEditOptions: [],
      queryParam: {},
      userTypeOptions: [
        {
          value: '1',
          label: '全部游客'
        },
        {
          value: '2',
          label: '业主'
        },
        {
          value: '3',
          label: '业主成员'
        },
        {
          value: '4',
          label: '租户'
        },
        {
          value: '5',
          label: '租户成员'
        },
        {
          value: '6',
          label: '游客-未认证业主'
        },
        {
          value: '7',
          label: '游客-定位'
        },
        {
          value: '8',
          label: '游客-未定位'
        }
      ],
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
      projectOptions: [],
      columns: [
        {
          title: '楼栋',
          dataIndex: 'building_name',
          width: 100
        },
        {
          title: '单元',
          dataIndex: 'unit_name',
          width: 100
        },
        {
          title: '房屋',
          dataIndex: 'house_name'
        },
        {
          title: '业主',
          dataIndex: 'owner_name',
          scopedSlots: { customRender: 'userInfo' }
        },
        {
          title: '用户标签',
          dataIndex: 'user_tag_data',
          scopedSlots: { customRender: 'tags' }
        },
        {
          title: '服务记录',
          dataIndex: 'service_record'
        },
        {
          title: '满意度',
          dataIndex: 'service_satisfied'
        },
        {
          title: () => {
            return (
              <div>
                是否启用
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>开启则APP显示房屋</span>
                  </template>
                  <a-icon type="info-circle" style="margin-left: 5px;" />
                </a-tooltip>
              </div>
            )
          },
          dataIndex: 'is_enabled',
          scopedSlots: { customRender: 'switch' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const params = cloneDeep(this.queryParam)
        if (params.user_tag && params.user_tag.length) {
          params.tag_id_text = params.user_tag.join(',')
        }
        // const time = params.service_time
        // const ctime = params.ctime
        // if (time && time.length) {
        //   params.service_time = `${time[0]}~${time[1]}`
        // }
        // if (ctime && ctime.length) {
        //   params.ctime = `${ctime[0]}~${ctime[1]}`
        // }
        return getHouseList(Object.assign(parameter, params))
      },
      selectedRowKeys: [],
      selectedRows: [],
      userVisible: false,
      userInfo: {},
      userForm: {
        id: '',
        building_id: undefined,
        unit_id: undefined,
        house_name: '',
        floors: '',
        owner_name: '',
        owner_mobile: '',
        user_tag_data: [],
        service_satisfied_desc: '',
        service_record: '',
        is_enabled: true,
        water_account_numb: '',
        water_meter: '',
        electric_account_numb: '',
        electric_meter: '',
        gas_account_numb: '',
        gas_meter: '',
        house_area: '',
        usable_area: '',
        additive_area: ''
      },
      userRules: {
        building_id: { require: true, message: '请选择楼栋' },
        unit_id: { require: true, message: '请选择单元' },
        house_name: { require: true, message: '请输入房屋' }
      },
      tagVisible: false,
      labelList: [],
      importVisible: false,
      importHouse
    }
  },
  computed: {
    rowSelection () {
      return {
        fixed: true,
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  filters: {
    userType (value) {
      const type = {
        0: '游客',
        1: '业主',
        2: '业主成员',
        3: '租户',
        4: '租户成员',
        5: '游客-未认证业主',
        6: '游客-定位',
        7: '游客-未定位'
      }
      return type[value]
    }
  },
  created () {
    this.getBuild()
    this.getDimensionList()
  },
  methods: {
    getDimensionList () {
      getDimensionList().then(({ data }) => {
        this.labelList = cloneDeep(data) || []
        data.forEach(obj => {
          obj.tag_name = obj.dimension_name
        })
        this.lebelOptions = data || []
      })
    },
    getBuild () {
      getBuild().then(({ list }) => {
        this.buildOptions = list || []
      })
    },
    handleBuildChange (isEdit) {
      // 编辑弹窗
      if (isEdit) {
        this.$set(this.userForm, 'unit_id', undefined)
        this.$set(this.userForm, 'house_id', undefined)
        this.getUnit(this.userForm.building_id, isEdit)
      } else {
        this.$set(this.queryParam, 'unit_id', undefined)
        this.$set(this.queryParam, 'house_id', undefined)
        this.getUnit(this.queryParam.building_id)
      }
    },
    getUnit (buildId, isEdit) {
      console.log(buildId)
      getUnit({
        build_id: buildId
      }).then(({ data }) => {
        // 编辑弹窗
        if (isEdit) {
          this.unitEditOptions = data || []
        } else {
          this.unitOptions = data || []
        }
      })
    },
    openEditModal (userInfo = {}) {
      if (userInfo && userInfo.id) {
        this.userForm = cloneDeep(userInfo)
        this.userForm.uid = userInfo.id
      } else {
        this.userForm = {
          id: '',
          building_id: undefined,
          unit_id: undefined,
          house_name: '',
          floors: '',
          owner_name: '',
          owner_mobile: '',
          user_tag_data: [],
          service_satisfied_desc: '',
          service_record: '',
          is_enabled: true,
          water_account_numb: '',
          water_meter: '',
          electric_account_numb: '',
          electric_meter: '',
          gas_account_numb: '',
          gas_meter: '',
          house_area: '',
          usable_area: '',
          additive_area: ''
        }
      }
      this.userVisible = true
    },
    setUserTag (tagData) {
      this.$set(this.userForm, 'user_tag_data', tagData)
    },
    saveHouse () {
      this.$refs.userForm.validate(result => {
        if (result) {
          this.editHouse()
        }
      })
    },
    changeEnabled (item) {
      const { id } = item
      setEnabledHouse({
        id
      }).then(({ success }) => {
        if (success) {
          item.is_enabled = !+item.is_enabled
          this.$message.success('设置成功')
          // this.$refs.table.refresh()
        }
      })
    },
    editHouse () {
      const params = cloneDeep(this.userForm)
      console.log(this.userForm)
      editHouse(params).then(({ success, message }) => {
        if (success) {
          this.$message.success('提交成功')
          this.userVisible = false
          this.$refs.table.refresh()
        } else {
          this.$message.error(message)
        }
      })
    },
    editUserTag () {
      const tagChecked = cloneDeep(this.userInfo.user_tag_data)
        .map(obj => obj.id)
        .join(',')
      editUserTag({
        uid: this.userInfo.uid,
        tag_id_text: tagChecked,
        remarks: this.userForm.remarks
      }).then(({ success }) => {
        if (success) {
          this.userVisible = false
          this.$refs.table.refresh()
          this.$message.success('提交成功')
        }
      })
    },
    // onSelectChange (selectedRowKeys, selectedRows) {
    //   this.selectedRowKeys = selectedRowKeys
    //   this.selectedRows = selectedRows
    // },
    resetTable () {
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },
    deleteHouse ({ id }) {
      deleteHouse({
        id
      }).then(({ success }) => {
        if (success) {
          this.$message.success('删除成功')
          this.$refs.table.refresh()
        }
      })
    },
    handleImport () {
      this.importVisible = true
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
.form-item-text {
  /deep/ .ant-form-item-control,
  /deep/ .ant-form-item-label {
    line-height: 24px;
  }
}
.appUser {
  .avatar {
    width: 16px;
    height: 16px;
    object-fit: cover;
  }
}
.alert-text {
  color: #00000072;
  line-height: 1;
  padding-top: 7px;
}
</style>

<style>
.house-edit-modal .ant-modal-body{
  max-height: 600px;
  overflow-y: auto;
}
</style>

<template>
  <div class="appUser">
    <a-card class="search-card" style="margin-top: 24px" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="所属项目">
                <a-select v-model="queryParam.project_id" placeholder="请选择">
                  <a-select-option
                    v-for="item in projectOptions"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.project_name }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="用户类型">
                <a-select
                  v-model="queryParam.user_type"
                  :options="userTypeOptions"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="用户">
                  <a-input
                    v-model="queryParam.sSearch"
                    placeholder="ID、昵称、姓名、手机号"
                  ></a-input>
                </a-form-item>
              </a-col>
              <!-- <a-col :md="8" :sm="24">
              <a-form-item label="注册时间">
                <a-range-picker
                  v-model="queryParam.service_time"
                  valueFormat="YYYY-MM-DD HH:mm:ss"
                  :show-time="{ defaultValue: [defaultTime, defaultTime] }"
                  :placeholder="['开始时间', '结束时间']"
                  style="width: 100%;"
                />
              </a-form-item>
            </a-col> -->
              <!-- <a-col :md="8" :sm="24">
              <a-form-item label="是否员工">
                <a-select v-model="queryParam.build_id1" placeholder="请选择">
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="0">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col> -->

              <a-col :md="8" :sm="24">
                <a-form-item label="是否注销">
                  <a-select v-model="queryParam.is_cancel" placeholder="请选择">
                    <a-select-option value="0">申请中</a-select-option>
                    <a-select-option value="1">已注销</a-select-option>
                    <a-select-option value="2">未注销</a-select-option>
                  </a-select>
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
                    :showCheckedStrategy="SHOW_ALL"
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
        <a-button @click="openMulTagModel">
          添加标签
        </a-button>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :showPagination="true"
        :alert="{ clear: true }"
        :rowSelection="rowSelection"
      >
        <template slot="userInfo" slot-scope="text, record">
          <template v-if="text || record.mobile">
            <div>{{ text }}</div>
            <div>{{ record.mobile }}</div>
          </template>
          <template v-else>无</template>
        </template>
        <template slot="tags" slot-scope="text">
          <s-tag v-for="label in text" :key="label.id" :color="label.colour">
            {{ label.tag_name }}
          </s-tag>
        </template>
        <div slot="avatar" slot-scope="text">
          <img class="avatar" :src="text" alt="" />
        </div>
        <span class="table-action" slot="action" slot-scope="text, record">
          <template>
            <a style="margin-right: 10px;" @click="openLogModal(record)"
              >查看</a
            >
            <a style="margin-right: 10px;" @click="openTagModal(record)"
              >标签</a
            >
            <a @click="openEditModal(record)">编辑</a>
          </template>
        </span>
      </s-table>
    </a-card>
    <chekcDrawer ref="chekcDrawer"></chekcDrawer>
    <a-modal
      v-model="userVisible"
      title="编辑用户"
      :width="640"
      @ok="editUserTag"
      :destroyOnClose="true"
    >
      <a-form-model
        ref="userForm"
        :model="userForm"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="用户昵称" class="form-item-text">
          {{ userInfo.nickname }}
        </a-form-model-item>
        <a-form-model-item label="姓名/手机号" class="form-item-text">
          <div v-if="userInfo.realname || userInfo.mobile">
            <span style="margin-right: 10px;">{{ userInfo.realname }}</span
            ><span>{{ userInfo.mobile }}</span>
          </div>
          <div v-else>--</div>
        </a-form-model-item>
        <a-form-model-item label="用户类型" class="form-item-text">
          {{ userInfo.user_type | userType }}
        </a-form-model-item>
        <a-form-model-item label="所属项目" class="form-item-text">
          {{ userInfo.project_name }}
        </a-form-model-item>
        <a-form-model-item label="账号状态" class="form-item-text">
          {{ +userInfo.is_del ? "不正常" : "正常" }}
        </a-form-model-item>
        <a-form-model-item label="用户标签" class="form-item-text">
          <span v-if="userInfo.user_tag_data && userInfo.user_tag_data.length">
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
            v-if="userInfo.id"
            type="edit"
            @click="tagVisible = true"
            style="margin-left: 10px;color: #1890ff;"
          ></a-icon>
        </a-form-model-item>
        <a-form-model-item class="form-item-text" label="满意度">
          {{ userInfo.service_satisfied_desc || "--" }}
        </a-form-model-item>
        <a-form-model-item label="备注">
          <a-textarea
            v-model="userForm.remarks"
            :maxLength="1000"
            :autoSize="{ minRows: 4, maxRows: 4 }"
          ></a-textarea>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <check-user-tag
      v-model="tagVisible"
      :isGetTag="isGetTag"
      :tags="labelList"
      :userInfo="userInfo"
      :checkTags="userInfo.user_tag_data"
      @getTag="setUserTag"
      @success="saveTagSuccess"
    ></check-user-tag>
    <check-user-tag
      v-model="tagMulVisible"
      :multiple="true"
      :isGetTag="true"
      :tags="labelList"
      :userList="userList"
      @success="saveTagSuccess"
    ></check-user-tag>
  </div>
</template>

<script>
import { STable, AdvancedForm } from '@/components'
import chekcDrawer from './checkDrawer'
import STag from './components/tag'
import checkUserTag from '../community/components/check-user-tag'
import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'
import {
  getAppUserList,
  getDimensionList,
  editUserTag
} from '@/api/userManage'
import { getProjectList } from '@/api/financeCenter'
export default {
  components: {
    chekcDrawer,
    STable,
    AdvancedForm,
    STag,
    checkUserTag
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      advanced: false,
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
          title: 'ID',
          dataIndex: 'id',
          width: 80
        },
        {
          title: '类型',
          dataIndex: 'user_type',
          width: 100
        },
        {
          title: '项目',
          dataIndex: 'project_name',
          width: 100
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          scopedSlots: { customRender: 'avatar' },
          width: 100
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          width: 120
        },
        {
          title: '姓名/手机号',
          dataIndex: 'realname',
          scopedSlots: { customRender: 'userInfo' }
        },
        {
          title: '用户标签',
          dataIndex: 'user_tag_data',
          scopedSlots: { customRender: 'tags' }
        },
        {
          title: '注册时间',
          dataIndex: 'ctime'
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
        return getAppUserList(Object.assign(parameter, params))
      },
      selectedRowKeys: [],
      selectedRows: [],
      userVisible: false,
      userInfo: {},
      isGetTag: false,
      userForm: { remarks: '' },
      tagVisible: false,
      tagMulVisible: false,
      userList: [],
      labelList: []
    }
  },
  computed: {
    rowSelection () {
      return {
        fixed: true,
        selectedRowKeys: this.selectedRowKeys,
        // getCheckboxProps: record => ({
        //   props: {
        //     disabled: +record.status !== 0 || record.auditPermission === 0
        //   }
        // }),
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
    this.getProjectList()
    this.getDimensionList()
  },
  methods: {
    getProjectList () {
      getProjectList().then(({ data }) => {
        this.projectOptions = data
      })
    },
    getDimensionList () {
      getDimensionList().then(({ data }) => {
        this.labelList = cloneDeep(data) || []
        data.forEach(obj => {
          obj.tag_name = obj.dimension_name
        })
        this.lebelOptions = data || []
      })
    },
    openEditModal (userInfo) {
      this.userInfo = cloneDeep(userInfo)
      this.userInfo.uid = userInfo.id
      this.userForm.remarks = userInfo.remarks
      this.isGetTag = true
      this.userVisible = true
    },
    openTagModal (userInfo) {
      this.userInfo = cloneDeep(userInfo)
      this.userInfo.uid = userInfo.id
      this.isGetTag = false
      this.tagVisible = true
    },
    // 批量添加标签
    openMulTagModel () {
      if (this.selectedRowKeys.length) {
        this.userList = this.selectedRowKeys
        this.tagMulVisible = true
      } else {
        this.$message.warning('请选择后再进行操作')
      }
    },
    setUserTag (tagData) {
      this.$set(this.userInfo, 'user_tag_data', tagData)
    },
    editUserTag () {
      const tagChecked = cloneDeep(this.userInfo.user_tag_data).map(obj => obj.id).join(',')
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
    saveTagSuccess () {
      this.tagVisible = false
      this.tagMulVisible = false
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetTable () {
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },
    // 查看
    check () {
      this.$refs.chekcDrawer.isShow = true
    },
    onChange (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    sizeChange (current, size) {
      console.log('size: ', size)
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
/deep/ .ant-table-tbody .tag {
  margin-bottom: 5px;
}
</style>

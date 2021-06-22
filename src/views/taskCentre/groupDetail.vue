<template>
  <div class="groupDetail">
    <page-header-wrapper></page-header-wrapper>
    <div class="cardContent">
      <a-card class="card" v-if="baseInfo != ''">
        <div class="title">基础信息</div>
        <div class="content">
          <a-row>
            <a-col :span="8">
              <div class="item">
                <span style="color: rgba(0, 0, 0, 0.847058823529412)">群ID：</span>
                <span>{{ baseInfo.id }}</span>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="item">
                <span style="color: rgba(0, 0, 0, 0.847058823529412)">群名称：</span>
                <span>{{ baseInfo.group_name }}</span>
                <a-icon type="edit" style="color:#1890ff" @click="editGroup" />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="item">
                <span style="color: rgba(0, 0, 0, 0.847058823529412)">群主：</span>
                <span
                  style="color:#1890ff;marginRight:10px;cursor: pointer;"
                  @click="openUserDetail"
                >
                  <span style="paddingRight:12px">{{ baseInfo.owner_name }}</span>
                  <span>{{ baseInfo.group_mobile }}</span>
                </span>
              </div>
            </a-col>
          </a-row>
          <a-row class="row">
            <a-col :span="8">
              <div class="item">
                <span style="color: rgba(0, 0, 0, 0.847058823529412)">成员：</span>
                <span>{{ baseInfo.group_member }}人</span>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="item">
                <span style="color: rgba(0, 0, 0, 0.847058823529412)">允许加入：</span>
                <a-switch v-model="baseInfo.is_open" @change="isOpen" />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="item">
                <span style="color: rgba(0, 0, 0, 0.847058823529412)">创建时间：</span>
                <span>{{ baseInfo.ctime }}</span>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-card>
      <a-card class="card2">
        <div class="table-page-search-wrapper">
          <div class="top" ref="card2">
            <a-form-model layout="inline">
              <a-row :gutter="36">
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="加入方式">
                    <a-select v-model="join_type" placeholder="请选择">
                      <a-select-option value="1">
                        后台添加
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="用户">
                    <a-input
                      v-model="user_search"
                      placeholder="手机号、昵称/ID、备注"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24" v-if="!card2Bol">
                  <div class="btns">
                    <a-button type="primary" @click="search">查询</a-button>
                    <a-button @click="resetGroupUserList">重置</a-button>
                    <a-button type="link" @click="open"
                      >展开 <a-icon type="down"
                    /></a-button>
                  </div>
                </a-col>
                <template v-if="card2Bol">
                  <a-col :md="8" :sm="24">
                    <a-form-model-item label="所属项目">
                      <a-select v-model="project_id" placeholder="请选择">
                        <a-select-option
                          :value="item.id"
                          v-for="item in projectList"
                          :key="item.id"
                        >
                          {{ item.project_name }}
                        </a-select-option>
                      </a-select>
                    </a-form-model-item>
                  </a-col>

                  <a-col :md="8" :sm="24">
                    <a-form-model-item label="加入时间">
                      <a-range-picker
                        v-model="joinTime"
                        class="piker-time"
                       :ranges="{
                        Today: [moment('00:00:00', 'HH:mm:ss'), moment().endOf('day')],
                        'This Month': [moment('00:00:00', 'HH:mm:ss'), moment().endOf('month')]
                      }"
                         :show-time="{
                        defaultValue: [
                          moment('00:00:00', 'HH:mm:ss'),
                          moment('00:00:00', 'HH:mm:ss')
                        ]
                      }"
                        format="YYYY-MM-DD HH:mm:ss"
                        @change="onChange"
                      />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-model-item label="是否注册">
                      <a-select v-model="is_register" placeholder="请选择">
                        <a-select-option value="0">
                          未注册
                        </a-select-option>
                        <a-select-option value="1">
                          已注册
                        </a-select-option>
                      </a-select>
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <div class="btns">
                      <a-button type="primary" @click="search">查询</a-button>
                      <a-button @click="resetGroupUserList">重置</a-button>
                      <a-button type="link" @click="close"
                        >收起 <a-icon type="up"
                      /></a-button>
                    </div>
                  </a-col>
                </template>
              </a-row>
            </a-form-model>
          </div>
          <div class="btns2">
            <a-button type="primary" @click="addUser">添加用户</a-button>
            <a-button @click="importUser"
              >导入用户 <a-icon type="vertical-align-bottom"
            /></a-button>
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1">
                  批量删除
                </a-menu-item>
              </a-menu>
              <a-button> 批量操作 <a-icon type="down" /> </a-button>
            </a-dropdown>
            <a-button @click="setGroupOwner" :disabled="setOwnerBol"
              >设为群主</a-button
            >
          </div>
          <div style="padding:0 32px">
            <div class="selected" v-if="selectedRowKeys.length > 0">
              <a-icon class="icon" type="info-circle" />
              已选择 <span class="span1">{{ selectedRowKeys.length }}</span> 项
              <span class="span2" @click="clear">清空</span>
            </div>
          </div>
          <div class="table">
            <a-table
              @change="changeGroupMember"
              rowKey="id"
              :columns="columns"
              :data-source="tableData"
              :pagination="false"
              :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange
              }"
            >
              <template slot="owner_name" slot-scope="text, record">
                <div class="user">
                  <div class="t1">
                    <span v-if="record.is_owner === '1'" style="color:#F5222D;paddingRight:10px"
                      >群主</span
                    >
                    <span style="color:rgba(0, 0, 0, 0.647058823529412);">{{ record.owner_name }}</span>
                  </div>
                  <div class="t2" style="color:rgba(0, 0, 0, 0.349019607843137);">{{ record.project_name }}</div>
                </div>
              </template>
              <template slot="user_task" slot-scope="text,record">
                <div
                  class="task"
                  :style="{cursor: record.user_task>0?'pointer':'',color: record.user_task>0?'#1890FF':'',paddingLeft:'8px'}"
                  @click="if(record.user_task>0)$router.push('/taskCentre/task?mobile='+record.mobile)"
                >
                  {{ record.user_task }}
                </div>
              </template>
              <template slot="user_group" slot-scope="text,record">
                <div
                  class="group"
                  :style="{cursor: record.user_group>0?'pointer':'',color: record.user_group>0?'#1890FF':''}"
                  @click="if(record.user_group>0)$router.push('/taskCentre/task?mobile='+record.mobile)"
                >
                  {{ record.user_group }}
                </div>
              </template>
              <template slot="register_time" slot-scope="register_time">
                <div>
                  {{register_time?register_time:''}}
                </div>
              </template>
              <template slot="opera" slot-scope="text, record">
                <div class="opera">
                  <a-button type="link" @click="del(record)">删除</a-button>
                </div>
              </template>
            </a-table>
            <div class="pagination">
              <a-pagination
                v-model="pagination.currentPage"
                show-quick-jumper
                show-size-changer
                :page-size-options="pagination.sizes"
                :total="pagination.total"
                :page-size.sync="pagination.pageSize"
                :show-total="
                  (total, range) =>
                    `共 ${total} 条记录 第${pagination.currentPage}/${Math.ceil(
                      total / pagination.pageSize
                    )}页`
                "
                @change="onChangePage"
                @showSizeChange="sizeChange"
              />
            </div>
          </div>
        </div>
      </a-card>
      <a-card class="card3">
        <div class="table-page-search-wrapper">
          <div class="title">操作日志</div>
          <div class="top" ref="card3">
            <a-form-model layout="inline">
              <a-row :gutter="36">
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="操作员">
                    <a-input v-model="opt_user" placeholder="姓名"></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="操作时间">
                    <a-range-picker
                      v-model="operaTime"
                      class="piker-time"
                      :ranges="{
                        Today: [moment(), moment()],
                        'This Month': [moment(), moment().endOf('month')]
                      }"

                      :show-time="{
                        defaultValue: [
                          moment('00:00:00', 'HH:mm:ss'),
                          moment('00:00:00', 'HH:mm:ss')
                        ]
                      }"
                      format="YYYY-MM-DD HH:mm:ss"
                      @change="onChange2"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24" v-if="!card3Bol">
                  <div class="btns">
                    <a-button type="primary" @click="searchLog">查询</a-button>
                    <a-button @click="resetLog">重置</a-button>
                    <a-button type="link" @click="open2"
                      >展开 <a-icon type="down"
                    /></a-button>
                  </div>
                </a-col>
                <template v-if="card3Bol">
                  <a-col :md="8" :sm="24">
                    <a-form-model-item label="操作类型">
                      <a-input
                        v-model="opt_type"
                        placeholder="关键字"
                      ></a-input>
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-model-item label="操作说明">
                      <a-input
                        v-model="opt_desc"
                        placeholder="关键字"
                      ></a-input>
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8" :sm="24"></a-col>
                  <a-col :md="8" :sm="24">
                    <div class="btns">
                      <a-button type="primary" @click="searchLog"
                        >查询</a-button
                      >
                      <a-button @click="resetLog">重置</a-button>
                      <a-button type="link" @click="close2"
                        >收起 <a-icon type="up"
                      /></a-button>
                    </div>
                  </a-col>
                </template>
              </a-row>
            </a-form-model>
          </div>
          <div class="table">
            <a-table
              rowKey="uid"
              :columns="columns2"
              :data-source="tableData2"
              :pagination="false"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
            </a-table>
            <div class="pagination">
              <a-pagination
                v-model="pagination2.currentPage"
                show-quick-jumper
                show-size-changer
                :page-size-options="pagination2.sizes"
                :total="pagination2.total"
                :page-size.sync="pagination2.pageSize"
                :show-total="
                  (total, range) =>
                    `共 ${total} 条记录 第${
                      pagination2.currentPage
                    }/${Math.ceil(total / pagination2.pageSize)}页`
                "
                @change="onChangePage2"
                @showSizeChange="sizeChange2"
              />
            </div>
          </div>
        </div>
      </a-card>
    </div>
    <addGroup ref="addGroup" mode="edit" :group_id="id"></addGroup>
    <addUserModel ref="addUserModel" mode="addGroup" :id="id"></addUserModel>
    <importFile ref="importFile" :id="id"></importFile>
  </div>
</template>

<script>
import moment from 'moment'
import addGroup from './addGroup'
import addUserModel from './adduserModel'
import importFile from './importFile'
import {
  toGetGroupBaseInfo,
  toGetGroupUserList,
  toDelGroupUser,
  toSetGroupOwner,
  toSetAllow,
  toGetProject,
  toGetLog
} from '@/api/taskCentre'
export default {
  components: {
    addGroup,
    addUserModel,
    importFile
  },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      card2Bol: false,
      pagination: {
        // 成员页码
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 10 // 默认页容量
      },
      pagination2: {
        // 日志页码
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 10 // 默认页容量
      },
      tableData: [], // 成员列表
      columns: [
        // 成员列表
        {
          title: '用户ID',
          dataIndex: 'id',
          key: 'id',
          width: '10%'
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile',
          width: '10%'
        },
        {
          title: '用户',
          dataIndex: 'owner_name',
          key: 'owner_name',
          scopedSlots: { customRender: 'owner_name' },
          width: '10%'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: '10%'
        },
        {
          title: '加入方式',
          dataIndex: 'join_method',
          key: 'join_method',
          width: '10%'
        },
        {
          title: '任务',
          dataIndex: 'user_task',
          key: 'user_task',
          sorter: true,
          scopedSlots: { customRender: 'user_task' },
          width: '10%'
        },
        {
          title: '群',
          dataIndex: 'user_group',
          key: 'user_group',
          sorter: true,
          scopedSlots: { customRender: 'user_group' },
          width: '10%',
          align: 'center'
        },
        {
          title: '注册时间',
          dataIndex: 'register_time',
          key: 'register_time',
          sorter: true,
          scopedSlots: { customRender: 'register_time' },
          width: '10%'
        },
        {
          title: '加入时间',
          dataIndex: 'join_time',
          key: 'join_time',
          sorter: true,
          width: '10%'
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' },
          width: '10%'
        }
      ],
      selectedRowKeys: [], // 表格复选框的id数组
      card3Bol: false,
      tableData2: [], // 日志列表
      columns2: [
        // 日志列表
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: '16.666666666%'
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '操作时间',
          dataIndex: 'ctime',
          key: 'ctime',
          width: '16.666666666%'
        },
        {
          title: '模块',
          dataIndex: 'module_type',
          key: ' module_type',
          width: '16.666666666%'
        },
        {
          title: '操作员',
          dataIndex: 'username',
          key: 'username',
          width: '16.666666666%'
        },
        {
          title: '操作类型',
          dataIndex: 'opt_type',
          key: 'opt_type',
          width: '16.666666666%'
        },
        {
          title: '操作说明',
          dataIndex: 'content',
          key: 'content',
          width: '16.666666666%'
        }
      ],
      id: '', // 群id
      baseInfo: '', // 群基础信息
      setOwnerBol: true,
      order_field: '', // 排序字段
      sort_value: '', // 排序值
      projectList: [], // 所有项目列表
      join_type: undefined, // 加入方式
      user_search: '', // 用户搜索
      owner: '', // 群主搜索
      is_register: undefined, // 是否注册
      project_id: undefined, // 所属项目
      join_time: '', // 加入时间
      opt_user: '', // 操作员
      opt_time: '', // 操作时间
      opt_type: '', // 操作类型
      opt_desc: '', // 操作内容
      joinTime: [],
      operaTime: [],
      selectedRows: []
    }
  },
  mounted () {
    this.close()
    this.close2()
    // console.log(this.$refs.card3.offsetHeight) // 128
  },
  watch: {
    selectedRowKeys: {
      handler () {
        if (this.selectedRowKeys.length === 1) {
          this.setOwnerBol = false
        } else {
          this.setOwnerBol = true
        }
      },
      deep: true
    }
  },
  methods: {
    // 新窗口打开用户详情
    openUserDetail () {
      window.open(
        `/zht/user/user/getUserList?uid=${this.baseInfo.group_ownerid}`,
        '_blank'
      )
    },
    // 批量操作
    async handleMenuClick () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning('请先选择后再操作')
        return
      }
      await toDelGroupUser({
        ids: this.selectedRowKeys,
        group_id: this.id
      })
      this.selectedRowKeys = []
      this.selectedRows = []
      this.$message.success('删除成功')
      this.getGroupBase()
      this.getData()
      this.getRegister()
    },
    // 重置日志查询
    resetLog () {
      this.opt_user = ''
      this.opt_time = ''
      this.opt_type = ''
      this.opt_desc = ''
      this.operaTime = []
      this.pagination2.currentPage = 1
      this.getRegister()
    },
    // 操作日志查询
    searchLog () {
      this.pagination2.currentPage = 1
      this.getRegister()
    },
    // 重置成员搜索
    resetGroupUserList () {
      this.user_search = ''
      this.owner = ''
      this.join_time = ''
      this.is_register = ''
      this.join_type = ''
      this.project_id = ''
      this.joinTime = []
      this.pagination.currentPage = 1
      this.getData()
    },
    // 成员列表查询
    search () {
      this.pagination.currentPage = 1
      this.getData()
    },
    // 获取日志列表
    async getRegister () {
      const res = await toGetLog({
        pagesize: this.pagination2.pageSize,
        pageindex: this.pagination2.currentPage,
        type: 2,
        task_id: +this.id,
        opt_user: this.opt_user,
        opt_time: this.opt_time,
        opt_type: this.opt_type,
        opt_desc: this.opt_desc
      })
      this.tableData2 = res.data.list
      this.pagination2.total = res.data.total
      console.log('获取日志列表', res)
    },
    // 获取群基础信息
    async getGroupBase () {
      if (this.id != '') {
        // 群详情-基础信息
        const res = await toGetGroupBaseInfo({
          group_id: this.id
        })
        this.baseInfo = res.data
        this.baseInfo.is_open = this.baseInfo.is_open === '1'
        console.log('群详情-基础信息', res)
        this.getData()
      }
    },
    // 是否允许加入
    async isOpen (checked) {
      const res = await toSetAllow({
        group_id: this.id,
        is_open: checked === true ? 1 : 0
      })
      this.getRegister()
      console.log('是否允许加入', res)
    },
    // 群成员列表排序
    changeGroupMember (pagination, filters, sorter) {
      console.log('sorter', sorter)
      if (sorter.order === 'ascend') {
        this.sort_value = 'desc'
      } else {
        this.sort_value = 'asc'
      }
      this.order_field = sorter.field
      this.getData()
    },
    // 群详情-成员列表
    async getData () {
      // 群详情-成员列表
      const res = await toGetGroupUserList({
        pagesize: this.pagination.pageSize,
        pageindex: this.pagination.currentPage,
        group_id: this.id,
        order_field: this.order_field,
        sort_value: this.sort_value,
        user_search: this.user_search.trim(),
        owner: this.owner,
        join_time: this.join_time,
        is_register: this.is_register,
        join_type: this.join_type,
        project_id: this.project_id
      })
      this.tableData = res.list
      this.pagination.total = res.data.total
      console.log('获取群成员', res)
    },
    // 设为群主
    async setGroupOwner () {
      console.log('群主', this.selectedRows)
      if (this.selectedRows[0].uid === 0) {
        this.$message.error('该用户无法设置为群主')
        this.selectedRowKeys = []
        this.selectedRows = []
        return
      }
      await toSetGroupOwner({
        uid: this.selectedRows[0].uid,
        group_id: this.id
      })
      this.selectedRowKeys = []
      this.selectedRows = []
      this.getGroupBase()
      this.getRegister()
      this.$message.success('设置群主成功')
    },
    // 删除群成员
    async del (record) {
      console.log('record', record)
      const idArr = []
      idArr.push(record.id)
      await toDelGroupUser({
        ids: idArr,
        group_id: this.id
      })
      this.getData()
      this.getGroupBase()
      this.getRegister()
      this.$message.success('删除成功')
    },
    // 导入用户
    importUser () {
      this.$refs.importFile.isShow = true
    },
    // 添加用户
    addUser () {
      this.$refs.addUserModel.isShow = true
    },
    // 修改群
    editGroup () {
      this.$refs.addGroup.isShow = true
      this.$refs.addGroup.baseInfo = JSON.parse(JSON.stringify(this.baseInfo))
    },
    // 展开card3
    open2 () {
      this.card3Bol = true
    },
    // 收起card3
    close2 () {
      this.card3Bol = false
    },
    // 操作日志时间
    onChange2 (dates, dateStrings) {
      // console.log('From: ', dates[0], ', to: ', dates[1])
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
      this.opt_time = dateStrings[0] + '~' + dateStrings[1]
    },
    // 清空复选框
    clear () {
      this.selectedRowKeys = []
    },
    // 复选框选择事件
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
    },
    // 页码改变事件
    onChangePage (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
      this.getData()
    },
    // 页容量改变事件
    sizeChange (current, size) {
      console.log('size: ', size)
      this.pagination.currentPage = 1
      this.pagination.pageSize = size
      this.getData()
    },
    // 日志页码改变事件
    onChangePage2 (page, size) {
      console.log('Page: ', page)
      this.pagination2.currentPage = page
      this.pagination2.pageSize = size
      this.getRegister()
    },
    // 日志页容量改变事件
    sizeChange2 (current, size) {
      console.log('日志页容量改变事件: ', current)
      this.pagination2.currentPage = 1
      this.pagination2.pageSize = size
      this.getRegister()
    },
    // 展开
    open () {
      this.card2Bol = true
    },
    // 收起
    close () {
      this.card2Bol = false
    },
    moment,
    // 成员列表时间
    onChange (dates, dateStrings) {
      this.join_time = dateStrings[0] + '~' + dateStrings[1]
      // console.log('From: ', dates[0], ', to: ', dates[1])
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
      console.log('成员列表时间', dateStrings[0] + '~' + dateStrings[1])
    }
  },
  async created () {
    // console.log('id', this.$route.query.id)
    this.id = this.$route.query.id
    this.getGroupBase()
    this.getRegister()
    // 获取所有项目
    const res2 = await toGetProject()
    this.projectList = res2.data
    console.log('获取所有项目', res2)
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-form .ant-btn-link {
  padding: 0;
}
.groupDetail {
  padding-bottom: 20px;
  .cardContent {
    padding: 0 20px;
  }
  .card {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      text-align: left;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .content {
      padding: 30px 40px;
      .item {
        display: flex;
        align-items: center;
      }
      .row {
        margin-top: 10px;
      }
    }
  }
  .card2 {
    margin-top: 20px;
    /deep/ .ant-form-item-label {
      min-width: 88px;
    }
    .piker-time {
      width: 100% !important;
    }
    .top {
      padding: 0 20px;
    }
    .btns {
      padding-bottom: 20px;
      text-align: right;
      button + button {
        margin-left: 10px;
      }
    }
    /deep/ .ant-card-body {
      padding-bottom: 0;
      padding-left: 0;
      padding-right: 0;
    }
    .btns2 {
      margin-left: 34px;
      button {
        margin-right: 10px;
      }
    }
    .selected {
      margin-top: 10px;
      width: 100%;
      height: 40px;
      padding-left: 15px;
      line-height: 40px;
      background-color: rgba(230, 247, 255, 1);
      border-width: 1px;
      border-style: solid;
      border-color: rgba(186, 231, 255, 1);
      border-radius: 4px;
      .icon {
        color: #0e77d1;
        margin-right: 10px;
      }
      .span1 {
        color: #0e77d1;
      }
      .span2 {
        cursor: pointer;
        color: #0e77d1;
        margin-left: 10px;
      }
    }
    .table {
      margin-top: 20px;
      padding: 0px 32px;
      /deep/ .ant-table-body {
        overflow-x: auto;
      }
      .pagination {
        margin-top: 10px;
        /deep/ .ant-pagination {
          padding-top: 10px;
          padding-bottom: 20px;
          text-align: right;
        }
        /deep/ .ant-pagination-total-text {
          float: left;
        }
      }
    }
  }
  .card3 {
    margin-top: 20px;
    /deep/ .ant-form-item-label {
      min-width: 88px;
    }
    .piker-time {
      width: 100% !important;
    }
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      text-align: left;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .top {
      padding: 0 20px;
      margin-top: 20px;
      padding-bottom: 20px;
      text-align: right;
      button + button {
        margin-left: 10px;
      }
    }
    .table {
      padding: 0 32px;
      margin-top: 20px;
      .pagination {
        margin-top: 10px;
        /deep/ .ant-pagination {
          padding-top: 10px;
          padding-bottom: 20px;
          text-align: right;
        }
        /deep/ .ant-pagination-total-text {
          float: left;
        }
      }
    }
  }
}
</style>

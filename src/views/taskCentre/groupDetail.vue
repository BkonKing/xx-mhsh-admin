<template>
  <div class="groupDetail">
    <page-header-wrapper></page-header-wrapper>
    <a-card class="card" v-if="baseInfo !=''">
      <div class="title">基础信息</div>
      <div class="content">
        <a-row>
          <a-col :span="8">
            <div class="item">
              <span>群ID：</span>
              <span>{{ baseInfo.id }}</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="item">
              <span>群名称：</span>
              <span>{{ baseInfo.group_name }}</span>
              <a-icon type="edit" style="color:#1890ff" @click="editGroup" />
            </div>
          </a-col>
          <a-col :span="8">
            <div class="item">
              <span>群主：</span>
              <span style="color:#1890ff;marginRight:10px">{{
                baseInfo.owner_name
              }}</span>
              <span style="color:#1890ff">{{ baseInfo.group_mobile }}</span>
            </div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col :span="8">
            <div class="item">
              <span>成员：</span>
              <span>{{ baseInfo.group_member }}人</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="item">
              <span>允许加入：</span>
              <a-switch
                :default-checked="+baseInfo.is_open === 1 ? true : false"
@change="isOpen"
              />
            </div>
          </a-col>
          <a-col :span="8">
            <div class="item">
              <span>创建时间：</span>
              <span>{{ baseInfo.ctime }}</span>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-card class="card2">
      <div class="top" ref="card2">
        <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row>
            <a-col :span="8">
              <a-form-model-item label="加入方式">
                <a-select v-model="join_type" style="width: 264px">
                  <a-select-option value="1">
                    后台添加
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="用户">
                <a-input
                v-model="user_search"
                  placeholder="手机号、昵称/ID、备注"
                  style="width:264px"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="所属项目" v-if="!card2Bol">
                <a-select style="width: 264px">
                  <a-select-option :value="item.id" v-for="(item) in projectList" :key='item.id'>
                    {{item.project_name}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <div class="btns" v-if="card2Bol">
                <a-button type="primary">查询</a-button>
                <a-button>重置</a-button>
                <a-button
type="link"
@click="open"
                  >展开 <a-icon
type="down"
                /></a-button>
              </div>
            </a-col>
          </a-row>
          <a-row v-if="!card2Bol">
            <a-col :span="8">
              <a-form-model-item label="加入时间">
                <a-range-picker
                  style="width: 264px"
                  :ranges="{
                    Today: [moment(), moment()],
                    'This Month': [moment(), moment().endOf('month')]
                  }"
                  show-time
                  format="YYYY-MM-DD HH:mm:ss"
                  @change="onChange"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="是否注册">
                <a-select style="width: 264px">
                  <a-select-option value="jack">
                    Jack
                  </a-select-option>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                  <a-select-option value="disabled" disabled>
                    Disabled
                  </a-select-option>
                  <a-select-option value="Yiminghe">
                    yiminghe
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <div class="btns">
                <a-button type="primary">查询</a-button>
                <a-button>重置</a-button>
                <a-button
type="link"
@click="close"
                  >收起 <a-icon
type="up"
                /></a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
      <div class="btns2">
        <a-button type="primary" @click="addUser">添加用户</a-button>
        <a-button
@click="importUser"
          >导入用户 <a-icon
type="vertical-align-bottom"
        /></a-button>
        <a-button>批量操作 <a-icon type="down"/></a-button>
        <a-button @click="setGroupOwner" :disabled="setOwnerBol">设为群主</a-button>
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
        rowKey="uid"
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
        >
          <template slot="owner_name" slot-scope="text,record">
            <div class="user">
              <div class="t1">{{record.owner_name}}</div>
              <div class="t2">{{record.project_name}}</div>
            </div>
          </template>
          <template #user_task>
            <div
              class="task"
              style="cursor: pointer;"
              @click="$router.push('/taskCentre/task')"
            >
              1000
            </div>
          </template>
          <template #group>
            <div
              class="group"
              style="cursor: pointer;"
              @click="$router.push('/taskCentre/taskGroup')"
            >
              2
            </div>
          </template>
          <template slot="opera" slot-scope="text,record">
            <div class="opera">
              <a-button type="link" @click="del(record)">删除</a-button>
            </div>
          </template>
        </a-table>
        <div class="pagination">
          <a-pagination
            show-quick-jumper
            show-size-changer
            :default-current="pagination.currentPage"
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
    </a-card>
    <a-card class="card3">
      <div class="title">操作日志</div>
      <div class="top" ref="card3">
        <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row>
            <a-col :span="8">
              <a-form-model-item label="操作员">
                <a-input placeholder="姓名" style="width: 264px"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="操作时间">
                <a-range-picker
                  style="width: 264px"
                  :ranges="{
                    Today: [moment(), moment()],
                    'This Month': [moment(), moment().endOf('month')]
                  }"
                  show-time
                  format="YYYY-MM-DD HH:mm:ss"
                  @change="onChange2"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="操作类型" v-if="!card3Bol">
                <a-input placeholder="关键字" style="width: 264px"></a-input>
              </a-form-model-item>
              <div class="btns" v-else>
                <a-button type="primary">查询</a-button>
                <a-button>重置</a-button>
                <a-button
type="link"
@click="open2"
                  >展开 <a-icon
type="down"
                /></a-button>
              </div>
            </a-col>
          </a-row>
          <a-row v-if="!card3Bol">
            <a-col :span="8">
              <a-form-model-item label="操作说明">
                <a-input placeholder="关键字" style="width: 264px"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="8"></a-col>
            <a-col :span="8">
              <div class="btns">
                <a-button type="primary">查询</a-button>
                <a-button>重置</a-button>
                <a-button
type="link"
@click="close2"
                  >收起 <a-icon
type="up"
                /></a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
      <div class="table">
        <a-table :columns="columns2" :data-source="data2" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
        <div class="pagination">
          <a-pagination
            show-quick-jumper
            show-size-changer
            :default-current="pagination2.currentPage"
            :page-size-options="pagination2.sizes"
            :total="pagination2.total"
            :page-size.sync="pagination2.pageSize"
            :show-total="
              (total, range) =>
                `共 ${total} 条记录 第${pagination2.currentPage}/80页`
            "
            @change="onChangePage2"
            @showSizeChange="sizeChange2"
          />
        </div>
      </div>
    </a-card>
    <addGroup ref="addGroup" mode="edit" :group_id='id' ></addGroup>
    <addUserModel ref="addUserModel" mode="addGroup" :id="id" ></addUserModel>
    <importFile ref="importFile" :id="id"></importFile>
  </div>
</template>

<script>
import moment from 'moment'
import addGroup from './addGroup'
import addUserModel from './adduserModel'
import importFile from './importFile'
import { toGetGroupBaseInfo, toGetGroupUserList, toDelGroupUser, toSetGroupOwner, toSetAllow, toGetProject } from '@/api/taskCentre'
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
        pageSize: 1 // 默认页容量
      },
      tableData: [], // 成员列表
      columns: [
        // 成员列表
        {
          title: '用户ID',
          dataIndex: 'uid',
          key: 'uid',
          width: 100
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile',
          width: 150
        },
        {
          title: '用户',
          dataIndex: 'owner_name',
          key: 'owner_name',
          scopedSlots: { customRender: 'owner_name' },
          width: 150
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: 100
        },
        {
          title: '加入方式',
          dataIndex: 'join_ype',
          key: 'join_ype',
          width: 100
        },
        {
          title: '任务',
          dataIndex: 'user_task',
          key: 'user_task',
          sorter: true,
          scopedSlots: { customRender: 'user_task' },
          width: 100
        },
        {
          title: '群',
          dataIndex: 'user_group',
          key: 'user_group',
          sorter: true,
          scopedSlots: { customRender: 'group' },
          width: 100
        },
        {
          title: '注册时间',
          dataIndex: 'register_time',
          key: 'register_time',
          sorter: true,
          width: 200
        },
        {
          title: '加入时间',
          dataIndex: 'join_time',
          key: 'join_time',
          sorter: true,
          width: 200
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' }
        }
      ],
      selectedRowKeys: [], // 表格复选框的id数组
      card3Bol: false,
      data2: [
        // 日志列表
        {
          id: '10',
          operaTime: '2020-10-01 12:00:00',
          module: '任务中心/任务群',
          operaPeople: '用户昵称(姓名)',
          operaType: '加入任务群',
          operaExplain: '二维码加入群“群名称'
        },
        {
          id: '10',
          operaTime: '2020-10-01 12:00:00',
          module: '任务中心/任务群',
          operaPeople: '用户昵称(姓名)',
          operaType: '加入任务群',
          operaExplain: '二维码加入群“群名称'
        },
        {
          id: '10',
          operaTime: '2020-10-01 12:00:00',
          module: '任务中心/任务群',
          operaPeople: '用户昵称(姓名)',
          operaType: '加入任务群',
          operaExplain: '二维码加入群“群名称'
        }
      ],
      columns2: [
        // 日志列表
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: 100
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '操作时间',
          dataIndex: 'operaTime',
          key: 'operaTime',
          width: 150
        },
        {
          title: '模块',
          dataIndex: 'module',
          key: ' module',
          width: 150
        },
        {
          title: '操作员',
          dataIndex: 'operaPeople',
          key: 'operaPeople',
          width: 150
        },
        {
          title: '操作类型',
          dataIndex: 'operaType',
          key: 'operaType',
          width: 150
        },
        {
          title: '操作说明',
          dataIndex: 'operaExplain',
          key: 'operaExplain'
        }
      ],
      id: '', // 群id
      baseInfo: '', // 群基础信息
      setOwnerBol: true,
      order_field: '', // 排序字段
      sort_value: '', // 排序值
      projectList: [], // 所有项目列表
      join_type: '', // 加入方式
      user_search: '', // 用户搜索
      owner: '' // 群主搜索
    }
  },
  mounted () {
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
    // 获取群基础信息
   async getGroupBase () {
       if (this.id != '') {
      // 群详情-基础信息
      const res = await toGetGroupBaseInfo({
        group_id: this.id
      })
      this.baseInfo = res.data
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
        sort_value: this.sort_value
      })
      this.tableData = res.list
      this.pagination.total = res.data.total
      console.log('获取群成员', res)
    },
    // 设为群主
   async setGroupOwner () {
     if (this.selectedRowKeys[0] === 0) {
       this.$message.error('该用户无法设置为群主')
       this.selectedRowKeys = []
       return
     }
 await toSetGroupOwner({
       uid: this.selectedRowKeys[0],
       group_id: this.id
     })
      this.$message.success('设置群主成功')
    },
    // 删除群成员
     async  del (record) {
       console.log('record', record)
       if (record.uid === 0) {
         this.$message.error('该用户无法删除')
         return
       }
      const idArr = []
      idArr.push(record.uid)
    await toDelGroupUser({
       uids: idArr,
       group_id: this.id
     })
     this.getData()
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
      setTimeout(() => {
        this.card3Bol = false
      }, 100)
      this.$refs.card3.style.height = '128px'
    },
    // 收起card3
    close2 () {
      this.card3Bol = true
      this.$refs.card3.style.height = '64px'
    },
    // 操作时间
    onChange2 (dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1])
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    },
    // 清空复选框
    clear () {
      this.selectedRowKeys = []
    },
    // 复选框选择事件
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      this.selectedRowKeys = selectedRowKeys
    },
    // 页码改变事件
    onChangePage (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    // 页容量改变事件
    sizeChange (current, size) {
      console.log('size: ', size)
    },
    // 页码改变事件
    onChangePage2 (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    // 页容量改变事件
    sizeChange2 (current, size) {
      console.log('size: ', size)
    },
    // 展开
    open () {
      setTimeout(() => {
        this.card2Bol = false
      }, 200)
      this.$refs.card2.$el.style.height = '178px'
    },
    // 收起
    close () {
      this.card2Bol = true
      this.$refs.card2.$el.style.height = '80px'
    },
    moment,
    onChange (dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1])
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    }
  },
  async created () {
    // console.log('id', this.$route.query.id)
    this.id = this.$route.query.id
    this.getGroupBase()
    // 获取所有项目
    const res2 = await toGetProject()
    this.projectList = res2.data
    console.log('获取所有项目', res2)
  }
}
</script>

<style lang="less" scoped>
.groupDetail {
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
    .btns {
      margin-left: 162px;
      button {
        margin-right: 10px;
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
      .pagination {
        margin-top: 10px;
        /deep/ .ant-pagination {
          padding: 10px;
        }
        /deep/ .ant-pagination-total-text {
          margin-left: 20px;
          margin-right: 300px;
        }
        /deep/ .ant-pagination-item-active {
          background-color: #1890ff;
          a {
            color: white;
          }
        }
      }
    }
  }
  .card3 {
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
    .top {
      margin-top: 20px;
      .btns {
        margin-left: 158px;
        button {
          margin-right: 10px;
        }
      }
    }
    .table {
      padding: 0 32px;
      margin-top: 20px;
      .pagination {
        margin-top: 10px;
        /deep/ .ant-pagination {
          padding: 10px;
        }
        /deep/ .ant-pagination-total-text {
          margin-left: 20px;
          margin-right: 300px;
        }
        /deep/ .ant-pagination-item-active {
          background-color: #1890ff;
          a {
            color: white;
          }
        }
      }
    }
  }
}
</style>

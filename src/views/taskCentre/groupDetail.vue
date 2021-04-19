<template>
  <div class="groupDetail">
    <page-header-wrapper></page-header-wrapper>
    <a-card class="card">
      <div class="title">基础信息</div>
      <div class="content">
        <a-row>
          <a-col :span="8">
            <div class="item">
              <span>群ID：</span>
              <span>000000</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="item">
              <span>群名称：</span>
              <span>名称名称名称</span>
              <a-icon type="edit" style="color:#1890ff" @click="editGroup" />
            </div>
          </a-col>
          <a-col :span="8">
            <div class="item">
              <span>群主：</span>
              <span style="color:#1890ff;marginRight:10px">昵称(王小明)</span>
              <span style="color:#1890ff">1500000000</span>
            </div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col :span="8">
            <div class="item">
              <span>成员：</span>
              <span>100人</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="item">
              <span>允许加入：</span>
              <a-switch default-checked />
            </div>
          </a-col>
          <a-col :span="8">
            <div class="item">
              <span>创建时间：</span>
              <span>2020-11-20 08:50:08</span>
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
              <a-form-model-item label="用户">
                <a-input
                  placeholder="手机号、昵称/ID、备注"
                  style="width:264px"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="所属项目" v-if="!card2Bol">
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
        <a-button @click="importUser">导入用户 <a-icon type="vertical-align-bottom"/></a-button>
        <a-button>批量操作 <a-icon type="down"/></a-button>
        <a-button @click="setGroupOwner">设为群主</a-button>
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
          :columns="columns"
          :data-source="data"
          :pagination="false"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
        >
          <template #user>
            <div class="user">
              <div class="t1">用户昵称(姓名)</div>
              <div class="t2">项目名称</div>
            </div>
          </template>
          <template #task>
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
          <template #opera>
            <div class="opera">
              <a-button type="link" @click="del">删除</a-button>
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
                `共 ${total} 条记录 第${pagination.currentPage}/80页`
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
          <a-table :columns="columns2" :data-source="data2" :pagination='false'>
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
    <addGroup ref="addGroup"></addGroup>
    <addUserModel ref="addUserModel"></addUserModel>
    <importFile ref="importFile"></importFile>
  </div>
</template>

<script>
import moment from 'moment'
import addGroup from './addGroup'
import addUserModel from './adduserModel'
import importFile from './importFile'
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
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 1 // 默认页容量
      },
      pagination2: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 1 // 默认页容量
      },
      data: [
        {
          id: '000000',
          phone: '1500000000',
          remark: '备注',
          joinType: '二维码',
          registerTime: '2020-11-20  08:50:08',
          joinTime: '2020-11-20  08:50:08'
        },
        {
          id: '000000',
          phone: '1500000000',
          remark: '备注',
          joinType: '二维码',
          registerTime: '2020-11-20  08:50:08',
          joinTime: '2020-11-20  08:50:08'
        },
        {
          id: '000000',
          phone: '1500000000',
          remark: '备注',
          joinType: '二维码',
          registerTime: '2020-11-20  08:50:08',
          joinTime: '2020-11-20  08:50:08'
        }
      ],
      columns: [
        {
          title: '用户ID',
          dataIndex: 'id',
          key: 'id',
          width: 100
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          width: 150
        },
        {
          title: '用户',
          dataIndex: 'user',
          key: 'user',
          scopedSlots: { customRender: 'user' },
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
          dataIndex: 'joinType',
          key: 'joinType',
          width: 100
        },
        {
          title: '任务',
          dataIndex: 'task',
          key: 'task',
          sorter: true,
          scopedSlots: { customRender: 'task' },
          width: 100
        },
        {
          title: '群',
          dataIndex: 'group',
          key: 'group',
          sorter: true,
          scopedSlots: { customRender: 'group' },
          width: 100
        },
        {
          title: '注册时间',
          dataIndex: 'registerTime',
          key: 'registerTime',
          sorter: true,
          width: 200
        },
        {
          title: '加入时间',
          dataIndex: 'joinTime',
          key: 'joinTime',
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
      selectedRowKeys: [],
      card3Bol: false,
      data2: [
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
      ]
    }
  },
  mounted () {
    console.log(this.$refs.card3.offsetHeight) // 128
  },
  methods: {
    // 设为群主
    setGroupOwner () {
      this.$message.success('设置群主成功')
    },
    // 删除
    del () {
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
    .table{
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

<template>
  <page-header-wrapper>
    <div>
      <a-card class="search-card" :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="模块">
                  <a-select v-model="queryParam.module_id" placeholder="请选择">
                    <a-select-option v-for="item in moduleList" :key="item.id" :value="item.id">
                      {{ item.value }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="操作员">
                  <a-input v-model="queryParam.opt_user" placeholder="姓名" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="操作时间" prop="releaseDate">
                    <a-range-picker
                      showTime
                      class="piker-time"
                      :value="publicTime"
                      :placeholder="['开始时间', '结束时间']"
                      format="YYYY-MM-DD"
                      @change="getTime"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="操作类型">
                    <a-input v-model="queryParam.opt_type" placeholder="关键字" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="操作说明">
                    <a-input v-model="queryParam.opt_desc" placeholder="关键字" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
              </template>
              <a-col :md="!advanced && 8 || 8" :sm="24">
                <span class="table-page-search-submitButtons" style="float: right; overflow: hidden">
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button style="margin-left: 8px" @click="reSet">重置</a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'"/>
                  </a>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-card>
      <a-card>
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadTableData"
        >
        </s-table>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import { getLogList, getLogModuleList } from '@/api/property'
const columns = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '操作时间',
    dataIndex: 'ctime'
  },
  {
    title: '模块',
    dataIndex: 'module_type'
  },
  {
    title: '操作员',
    dataIndex: 'username'
  },
  {
    title: '操作类型',
    dataIndex: 'opt_type'
  },
  {
    title: '操作说明',
    dataIndex: 'content'
  }
]
export default {
  name: 'logs',
  components: {
    STable
  },
  data () {
    this.columns = columns
    return {
      advanced: true, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      moduleList: [],
      publicTime: ['', '']
    }
  },
  mounted () {
    this.getLogModuleList()
  },
  created () {
  },
  methods: {
    // 操作日志模块
    getLogModuleList () {
      getLogModuleList().then(res => {
        this.moduleList = res.list
      })
    },
    // 时间
    getTime (dates, dateStrings) {
      console.log(dates, dateStrings)
      this.publicTime = dates
      this.queryParam.opt_time = dateStrings[0] + '~' + dateStrings[1]
    },
    // 搜索收起/展开
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 重置
    reSet () {
      this.queryParam = {}
      this.publicTime = []
    },
    // 刷新表格数据
    loadAllData () {
      this.$refs.table.refresh(true)
    },
    // 刷新表格数据
    loadTableData (page) {
      if (page.sortOrder && page.sortField) {

      }
      const requestParameters = Object.assign({}, this.queryParam, page)
      console.log('loadData request parameters:', requestParameters)
      return getLogList(requestParameters)
        .then(res => {
          return res
        })
    }
  }
}
</script>

<style scoped lang="less">
.table-page-search-wrapper {
  /deep/ .ant-form-item-label {
    min-width: 88px;
  }
  .piker-time {
    width: 100% !important;
  }
}
.ant-card {
  margin-bottom: 24px;
}
</style>

<template>
  <div>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :showPagination="true"
      :scroll="{ y: 270 }"
    >
      <span class="table-action" slot="action" slot-scope="text, record">
        <a v-if="+record.is_sh_btn && +projectId === +info.project_id" @click="handleEdit(record, 0)">审核</a>
        <a v-if="+record.is_xg_btn && +projectId === +info.project_id" @click="handleEdit(record, 1)">修改</a>
      </span>
    </s-table>
    <check-form
      v-model="checkVisible"
      ref="checkForm"
      :data="checkData"
      :showUser="false"
      :type="checkType"
      @submit="refreshTable"
    ></check-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import CheckForm from '@/views/businessManage/components/CheckForm'
import { getShopAttestationList } from '@/api/userManage'
export default {
  name: 'auditTable',
  components: {
    CheckForm,
    STable
  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      columns: [
        {
          title: '提交时间',
          dataIndex: 'ctime'
        },
        {
          title: '审核时间',
          dataIndex: 'atime'
        },
        {
          title: '审核状态',
          dataIndex: 'a_state_text'
        },
        {
          title: '审核人',
          dataIndex: 'admin_text'
        },
        {
          title: '操作说明',
          dataIndex: 'explain'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '100px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return getShopAttestationList(
          Object.assign(parameter, {
            uid: this.info.uid,
            shops_id: this.info.shops_id
          })
        )
      },
      checkType: 0,
      checkVisible: false,
      checkData: []
    }
  },
  computed: {
    ...mapGetters(['projectId'])
  },
  methods: {
    refreshTable (bool = false) {
      this.$refs.table && this.$refs.table.refresh(bool)
    },
    handleEdit (data, type) {
      const info = {
        ...this.info,
        logId: data.id,
        id: data.shops_id
      }
      this.checkData = [info]
      this.checkType = type
      this.$refs.checkForm && this.$refs.checkForm.resetFields()
      this.checkVisible = true
    }
  }
}
</script>

<style></style>

<template>
  <s-table
    ref="table"
    size="default"
    rowKey="id"
    :columns="columns"
    :data="loadData"
    :showPagination="true"
  >
    <span class="table-action" slot="action" slot-scope="text, record">
      <a v-if="+record.is_sh_btn" @click="handleEdit(record)">编辑</a>
      <a v-if="+record.is_xg_btn" @click="handleEdit(record)">修改</a>
    </span>
  </s-table>
</template>

<script>
import { STable } from '@/components'
import { getShopAttestationList } from '@/api/userManage'
export default {
  name: 'auditTable',
  components: {
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
      }
    }
  },
  methods: {
    refreshTable (bool = false) {
      this.$refs.table && this.$refs.table.refresh(bool)
    }
  }
}
</script>

<style></style>

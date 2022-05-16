import moment from 'moment'

export default {
  data () {
    return {
      advanced: false,
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      useStatus: [
        {
          label: '未使用',
          value: '1'
        },
        {
          label: '已使用',
          value: '2'
        },
        {
          label: '已过期',
          value: '3'
        }
      ],
      couponStatus: [
        {
          label: '未发布',
          value: '1'
        },
        {
          label: '领取中',
          value: '2'
        },
        {
          label: '已结束',
          value: '3'
        }
      ],
      pickupTypes: [
        {
          label: '免费领取',
          value: '1'
        },
        {
          label: '付费领取',
          value: '2'
        }
        // {
        //   label: '系统发放',
        //   value: '3'
        // }
      ],
      sourceStatus: [
        {
          label: '页面领取',
          value: '2'
        },
        {
          label: '系统发放',
          value: '1'
        },
        {
          label: '抽奖获得',
          value: '3'
        }
      ],
      queryParam: {}
    }
  },
  methods: {
    refreshTable (bool = false) {
      this.$refs.table.refresh(bool)
    },
    resetTable () {
      this.queryParam = {}
      this.refreshTable(true)
    }
  }
}

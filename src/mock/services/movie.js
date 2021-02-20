import Mock from 'mockjs'
import {
  builder,
  getBody
} from '../util'
const getOrderList = (option) => {
  const {
    pageindex
  } = getBody(option)
  return builder({
    pageindex: pageindex,
    pagesize: 10,
    total: 156,
    list: [{
      name: '189'
    },
    {
      name: '3333'
    }
    ]
  }, '', 200)
}

Mock.mock(/\/movie\/getOrderList/, 'post', getOrderList)

const totalCount = 100
const getRefundList = (option) => {
  // const {
  //   pageindex
  // } = getBody(option)
  const pageindex = 1
  const result = []
  const pageSize = parseInt(10)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageindex - 1) * pageSize
  const next = (pageindex >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: 'No ' + tmpKey,
      description: '这是一段描述',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageindex: pageindex,
    total: totalCount,
    list: result
  })
}

Mock.mock(/\/movie\/getRefundList/, 'post', getRefundList)

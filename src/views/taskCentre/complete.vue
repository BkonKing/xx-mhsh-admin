<template>
  <div class="complete">
    <page-header-wrapper></page-header-wrapper>
    <a-card class="card1">
      <div class="title">流程进度</div>
      <div class="steps">
        <a-steps progress-dot :current="current">
          <a-step title="创建任务" description="2021-01-01 00:00" />
          <a-step title="审核通过" description="" />
          <a-step title="接单" description="" />
          <a-step title="任务完成" description="" />
          <a-step title="完成" description="" />
        </a-steps>
      </div>
    </a-card>
    <a-card class="card2">
      <div class="title">基础信息</div>
      <div class="content">
        <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row>
            <a-col :span="8">
              <a-form-model-item label="任务标题">
                标题标题标题标题标题
              </a-form-model-item>
              <a-form-model-item label="任务奖励">
                10000币（2000币/人）| 已奖励8000币
              </a-form-model-item>
              <a-form-model-item label="需要人数">4/5</a-form-model-item>
              <a-form-model-item
label="完成时间"
                >2021-03-01 08:50 ~ 2021-03-10 08:50</a-form-model-item
              >
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="任务类型">类型</a-form-model-item>
              <a-form-model-item label="创建者">
                <span style="color:#1890FF">昵称(姓名) </span>
                项目名称
              </a-form-model-item>
              <a-form-model-item label="任务标签">
                标签 | 标签标签 | 标签
              </a-form-model-item>
              <a-form-model-item
label="完成地点"
                >不限/省市区详细地址</a-form-model-item
              >
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="任务编号">
                000000000
                <img
                  style="marginLeft:10px"
                  @click="previewImg"
                  src="@/assets/imgs/task_ma.png"
                  alt=""
                />
              </a-form-model-item>
              <a-form-model-item label="手机号">1500000000</a-form-model-item>
              <a-form-model-item label="联系电话">1500000000</a-form-model-item>
              <a-form-model-item
label="可见范围"
                >全部/福建省福州市/新乡美好生活家园/XXX群</a-form-model-item
              >
            </a-col>
          </a-row>
        </a-form-model>
        <div class="explain">
          <div class="left">任务说明：</div>
          <div class="right">
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
          </div>
        </div>
        <div class="otherBtn">
          <a-button
type="link"
v-if="!btnBol"
@click="open"
            >展开 <a-icon
type="down"
          /></a-button>
          <a-button
type="link"
v-else
@click="close"
            >收起 <a-icon
type="up"
          /></a-button>
        </div>
      </div>
      <div class="imgcon">
        <div class="img" v-for="item in 3" :key="item" @click="previewImg">
          <img
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=380567600,1510886462&fm=26&gp=0.jpg"
            alt=""
          />
        </div>
      </div>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </a-card>
    <a-card class="card3">
      <a-row>
        <a-col :span="8">
          <div class="t1">提问</div>
          <div class="t2">10个</div>
          <div class="t3">
            <span>10个提问</span>
            <span>2个回复</span>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="t1">投诉</div>
          <div class="t2">7个</div>
          <div class="t3">
            <span>任务方收到2个</span>
            <span>投诉接单方5个</span>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="t1">评价</div>
          <div class="t2">4.5星</div>
          <div class="t3">已评3人</div>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="card4">
      <div class="top">
        <div
          class="item"
          :class="{ active: currentIndex === index }"
          @click="selectCard4Title(index)"
          v-for="(item, index) in titleArr"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div class="form">
        <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row>
            <a-col :span="8">
              <a-form-model-item label="进度状态">
                <a-select style="width: 264px">
                  <a-select-option value="jack">
                    Jack
                  </a-select-option>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                  <a-select-option value="disabled">
                    Disabled
                  </a-select-option>
                  <a-select-option value="Yiminghe">
                    yiminghe
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="接单方">
                <a-input
                  style="width: 264px"
                  placeholder="手机号、用户昵称/ID"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="所属项目" v-if="!card4Bol">
                <a-select style="width: 264px">
                  <a-select-option value="jack">
                    Jack
                  </a-select-option>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                  <a-select-option value="disabled">
                    Disabled
                  </a-select-option>
                  <a-select-option value="Yiminghe">
                    yiminghe
                  </a-select-option>
                </a-select>
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
          <div class="btns" v-if="!card4Bol">
            <a-button type="primary">查询</a-button>
            <a-button>重置</a-button>
            <a-button
type="link"
@click="close2"
              >收起 <a-icon
type="up"
            /></a-button>
          </div>
        </a-form-model>
      </div>
      <div class="content">
        <div class="btns">
          <a-button>下架任务</a-button>
          <a-button>终止任务</a-button>
          <a-button>停止接单</a-button>
          <a-button>批量操作 <a-icon type="down"/></a-button>
        </div>
        <div class="selected" v-if="selectedRowKeys.length > 0">
          <a-icon class="icon" type="info-circle" />
          已选择 <span class="span1">{{ selectedRowKeys.length }}</span> 项
          <span class="span2" @click="clear">清空</span>
        </div>
        <div class="table">
          <a-table
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange
            }"
            :columns="columns"
            :data-source="data"
            :pagination="false"
          >
            <template #takeOrderSide>
              <div class="takeOrderSide">
                <div class="t1">昵称(姓名)</div>
                <div class="t2">项目名称</div>
              </div>
            </template>
            <template #appraise>
              <span style="color:#1890FF;cursor: pointer;" @click="openAppraise">3星</span>
            </template>
            <template #opera>
              <div class="btns">
                <a-button type="link" @click="check">查看</a-button>
                <a-button type="link" @click="award">奖励</a-button>
                <a-popconfirm
                v-if="false"
                  title="你确定要淘汰这个用户吗?"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="confirm"
                  @cancel="cancel"
                >
                  <a href="#">淘汰</a>
                </a-popconfirm>
              </div>
            </template>
          </a-table>
        </div>
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
            @change="onChange"
            @showSizeChange="sizeChange"
          />
        </div>
      </div>
    </a-card>
    <a-card class="card5">
      <div class="title">
        审核信息
      </div>
      <div class="c1">
        <div class="t1">
          审核通过：未通过
        </div>
        <div class="t2">审核人：姓名</div>
        <div class="t3">审核时间：2020-11-20 08:50:08</div>
      </div>
      <div class="c2">违规原因：原因原因</div>
      <div class="c3">
        <div class="t1">处理回复：</div>
        <div class="t2">
          回复内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </div>
      </div>
      <div class="imgcon">
        <div class="img" v-for="item in 3" :key="item" @click="previewImg">
          <img
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=380567600,1510886462&fm=26&gp=0.jpg"
            alt=""
          />
        </div>
      </div>
    </a-card>
    <a-card class="card6">
      <div class="title">操作日志</div>
      <div class="form">
        <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row>
            <a-col :span="8">
              <a-form-model-item label="操作员">
                <a-input placeholder="姓名" style="width:264px"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="操作时间">
                <a-range-picker
                  style="width:264px"
                  :ranges="{
                    Today: [moment(), moment()],
                    'This Month': [moment(), moment().endOf('month')]
                  }"
                  show-time
                  format="YYYY/MM/DD HH:mm:ss"
                  @change="onChange2"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="操作类型" v-if="!card6Bol">
                <a-input placeholder="关键字" style="width:264px"></a-input>
              </a-form-model-item>
              <div class="btns" v-else>
                <a-button type="primary">查询</a-button>
                <a-button>重置</a-button>
                <a-button
type="link"
@click="open3"
                  >展开 <a-icon
type="down"
                /></a-button>
              </div>
            </a-col>
          </a-row>
          <a-row v-if="!card6Bol">
            <a-col :span="8">
              <a-form-model-item label="操作说明">
                <a-input placeholder="关键字" style="width:264px"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="8"></a-col>
            <a-col :span="8">
              <div class="btns">
                <a-button type="primary">查询</a-button>
                <a-button>重置</a-button>
                <a-button
type="link"
@click="close3"
                  >收起 <a-icon
type="up"
                /></a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
      <div class="table">
        <a-table :pagination='false' :columns="columns2" :data-source="data2">
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
            @change="onChange3"
            @showSizeChange="sizeChange3"
          />
        </div>
      </div>
    </a-card>
    <checkModel ref="checkModel"></checkModel>
    <awardModel ref="awardModel"></awardModel>
    <appraiseModel ref="appraiseModel"></appraiseModel>
  </div>
</template>

<script>
import moment from 'moment'
import checkModel from './checkModel'
import awardModel from './awardModel'
import appraiseModel from './appraiseModel'
export default {
  components: {
    checkModel,
    awardModel,
    appraiseModel
  },
  data () {
    return {
      current: 2, // 当前进度条位置
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      previewVisible: false, // 是否预览图片
      previewImage: '', // 预览图片链接
      btnBol: false,
      titleArr: ['任务进度', '投诉', '评价', '提问'],
      currentIndex: 0,
      card4Bol: false,
      data: [
        // 表格一数据
        {
          id: '11223344',
          planStatus: '已接单',
          phone: '15000000000',
          award: '2000',
          complain: '0',
          newestPlan: '•接单成功',
          takeOrderTime: '2020-11-20  08:50:08'
        },
        {
          id: '11223344',
          planStatus: '已接单',
          phone: '15000000000',
          award: '2000',
          complain: '0',
          newestPlan: '•接单成功',
          takeOrderTime: '2020-11-20  08:50:08'
        },
        {
          id: '11223344',
          planStatus: '已接单',
          phone: '15000000000',
          award: '2000',
          complain: '0',
          newestPlan: '•接单成功',
          takeOrderTime: '2020-11-20  08:50:08'
        }
      ],
      columns: [
        // 表格一数据
        {
          title: '进度ID',
          dataIndex: 'id',
          key: 'id',
          width: 100
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '进度状态',
          dataIndex: 'planStatus',
          key: 'planStatus',
          width: 150
        },
        {
          title: '接单方',
          dataIndex: 'takeOrderSide',
          key: 'takeOrderSide',
          scopedSlots: { customRender: 'takeOrderSide' },
          width: 150
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          width: 150
        },
        {
          title: '奖励(币)',
          dataIndex: 'award',
          key: 'award',
          width: 150,
          sorter: true
        },
        {
          title: '投诉',
          dataIndex: 'complain',
          key: 'complain',
          width: 150,
          sorter: true
        },
        {
          title: '评价',
          dataIndex: 'appraise ',
          key: 'appraise ',
          width: 150,
          sorter: true,
          scopedSlots: { customRender: 'appraise' }
        },
        {
          title: '最新进度',
          dataIndex: 'newestPlan',
          key: 'newestPlan',
          width: 150
        },
        {
          title: '接单时间',
          dataIndex: 'takeOrderTime',
          key: 'takeOrderTime',
          width: 200,
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' }
        }
      ],
      selectedRowKeys: [], // 表格复选框数组
      pagination: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 1 // 默认页容量
      },
      card6Bol: false,
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
          dataIndex: 'opreaTime',
          key: 'opreaTime',
          width: 200
        },
        {
          title: '模块',
          dataIndex: 'module',
          key: 'module',
          width: 150
        },
        {
          title: '操作员',
          dataIndex: 'opreaPeople',
          key: 'opreaPeople',
          width: 200
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
      data2: [
        {
          id: '1',
          opreaTime: '2020-10-01 12:00:00',
          module: '任务中心/任务',
          opreaPeople: '用户昵称(姓名)',
          operaType: '延期任务',
          operaExplain: '延期任务至2021-03-20  00:00'
        },
        {
          id: '1',
          opreaTime: '2020-10-01 12:00:00',
          module: '任务中心/任务',
          opreaPeople: '用户昵称(姓名)',
         operaType: '延期任务',
         operaExplain: '延期任务至2021-03-20  00:00'
        },
        {
          id: '1',
          opreaTime: '2020-10-01 12:00:00',
          module: '任务中心/任务',
          opreaPeople: '用户昵称(姓名)',
          operaType: '延期任务',
          operaExplain: '延期任务至2021-03-20  00:00'
        }
      ],
       pagination2: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 1 // 默认页容量
      }
    }
  },
  mounted () {
    console.log(document.querySelector('.card6 .form').offsetHeight) // 128
    // document.querySelector('.card6 .form').style.height = '74px'
    // document.querySelector('.explain').style.height = '210px'
    // document.querySelector('.explain').style.overflow = 'hidden'
    // 设置文本超出隐藏
    document.querySelector('.explain').style.display = '-webkit-box'
    document.querySelector('.explain').style.webkitBoxOrient = 'vertical'
    document.querySelector('.explain').style.webkitLineClamp = '10'
    document.querySelector('.explain').style.overflow = 'hidden'
  },
  methods: {
    // 打开评价
    openAppraise () {
      this.$refs.appraiseModel.isShow = true
    },
    // 奖励
    award () {
      this.$refs.awardModel.isShow = true
    },
    // 查看
    check () {
      this.$refs.checkModel.isShow = true
    },
      // 页码改变事件
    onChange3 (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    // 页容量改变事件
    sizeChange3 (current, size) {
      console.log('size: ', size)
    },
    // 展开3
    open3 () {
      this.card6Bol = false
      document.querySelector('.card6 .form').style.height = '128px'
    },
    // 收起3
    close3 () {
      this.card6Bol = true
      document.querySelector('.card6 .form').style.height = '74px'
    },
    moment,
    // 操作时间改变
    onChange2 (dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1])
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    },
    // 清空表格复选框数组
    clear () {
      this.selectedRowKeys = []
    },
    // 页码改变事件
    onChange (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    // 页容量改变事件
    sizeChange (current, size) {
      console.log('size: ', size)
    },
    // 确定
    confirm (e) {
      console.log(e)
      this.$message.success('Click on Yes')
    },
    // 取消
    cancel (e) {
      console.log(e)
      this.$message.error('Click on No')
    },
    // 表格复选框选择事件
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      this.selectedRowKeys = selectedRowKeys
    },
    // 展开2
    open2 () {
      document.querySelector('.card4 .form').style.height = '116px'
      this.card4Bol = false
    },
    // 收起2
    close2 () {
      document.querySelector('.card4 .form').style.height = '60px'
      this.card4Bol = true
    },
    // 切换标题
    selectCard4Title (index) {
      this.currentIndex = index
    },
    // 收起
    close () {
      this.btnBol = false
      document.querySelector('.explain').style.display = '-webkit-box'
      document.querySelector('.explain').style.webkitBoxOrient = 'vertical'
      document.querySelector('.explain').style.webkitLineClamp = '10'
      document.querySelector('.explain').style.overflow = 'hidden'
    },
    // 展开
    open () {
      this.btnBol = true
      document.querySelector('.explain').style.display = ''
      document.querySelector('.explain').style.webkitBoxOrient = ''
      document.querySelector('.explain').style.webkitLineClamp = ''
      document.querySelector('.explain').style.overflow = ''
    },
    // 预览图片
    previewImg (e) {
      console.log(e.target.src)
      this.previewVisible = true
      this.previewImage = e.target.src
    },
    // 关闭预览图片
    handleCancel () {
      this.previewVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.complete {
  /deep/ .ant-card-body {
    padding: 0;
  }
  .card1 {
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .steps {
      padding: 30px;
    }
  }
  .card2 {
    /deep/ .ant-card-body {
      padding-bottom: 20px;
    }

    margin-top: 20px;
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .explain {
      padding: 0 38px;
      display: flex;
      .left {
        width: 70px;
      }
      .right {
        flex: 1;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 10;
        // overflow: hidden;
      }
    }
    .otherBtn {
      padding: 0 38px;
      text-align: right;
    }
    .imgcon {
      display: flex;
      .img {
        cursor: pointer;
        margin-left: 38px;
        margin-top: 10px;
        width: 104px;
        height: 104px;
        padding: 10px;
        border: 2px dashed #dedede;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .card3 {
    /deep/ .ant-card-body {
      padding-left: 30px;
      padding-right: 30px;
    }
    margin-top: 20px;
    .ant-col {
      height: 144px;
      text-align: center;
      &:nth-child(2) {
        border-left: 1px solid rgba(233, 233, 233, 1);
        border-right: 1px solid rgba(233, 233, 233, 1);
      }
      .t1 {
        margin-top: 30px;
      }
      .t2 {
        font-size: 24px;
        font-family: "MicrosoftYaHei", "Microsoft YaHei";
        font-weight: 600;
        font-style: normal;
        line-height: 32px;
        margin: 10px 0;
      }
      .t3 {
        span {
          padding: 0 10px;
        }
      }
    }
  }
  .card4 {
    margin-top: 20px;
    .top {
      display: flex;
      height: 51px;
      line-height: 51px;
      padding: 0 15px;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
      .item {
        padding: 0 10px;
        margin: 0 15px;
        cursor: pointer;
      }
      .active {
        color: #1890ff;
        border-bottom: 2px solid #1890ff;
      }
    }
    .form {
      padding-top: 20px;
      .btns {
        text-align: right;
        margin-right: 200px;
        button {
          margin-right: 10px;
        }
      }
    }
    .content {
      padding-top: 20px;
      padding-left: 30px;
      padding-right: 30px;
      .btns {
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
        .takeOrderSide {
          .t2 {
            color: rgba(0, 0, 0, 0.349019607843137);
          }
        }
      }
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
.card5 {
  margin-top: 20px;
  padding-bottom: 20px;
  .title {
    padding-left: 30px;
    height: 55px;
    line-height: 55px;
    font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
    font-weight: 650;
    font-style: normal;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.847058823529412);
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }
  .c1 {
    margin-top: 20px;
    padding: 0 30px;
    display: flex;
    .t1,
    .t2,
    .t3 {
      flex: 1;
    }
  }
  .c2 {
    margin-top: 20px;
    padding: 0 30px;
  }
  .c3 {
    margin-top: 20px;
    padding: 0 30px;
    display: flex;
    .t1 {
      width: 70px;
    }
    .t2 {
      flex: 1;
    }
  }
  .imgcon {
    display: flex;
    .img {
      cursor: pointer;
      margin-left: 38px;
      margin-top: 10px;
      width: 104px;
      height: 104px;
      padding: 10px;
      border: 2px dashed #dedede;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
.card6 {
  margin-top: 20px;
  .title {
    padding-left: 30px;
    height: 55px;
    line-height: 55px;
    font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
    font-weight: 650;
    font-style: normal;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.847058823529412);
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }
  .form {
    margin-top: 20px;
    .btns {
      margin-left: 162px;
      button {
        margin-right: 10px;
      }
    }
  }
  .table {
    padding: 0 30px;
  }
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

/deep/ .ant-modal-body {
  padding: 44px !important;
}
</style>

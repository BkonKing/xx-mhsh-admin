<template>
  <div
    class="ant-page-header has-breadcrumb ant-page-header-ghost"
    style="background-color: rgb(255, 255, 255);"
  >
    <a-breadcrumb :routes="routes" v-bind="$attrs">
      <template slot="itemRender" slot-scope="{ route, routes }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <a v-else @click="jump(route)">
          {{ route.breadcrumbName }}
        </a>
      </template>
    </a-breadcrumb>
    <div class="ant-page-header-heading">
      <span class="ant-page-header-heading-title">{{titleT}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: ''
    },
    routes: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    titleT () {
      return this.title || (this.routes.length && this.routes[this.routes.length - 1].breadcrumbName) || ''
    }
  },
  methods: {
    jump ({ path, isTop }) {
      if (isTop) {
        top.location.href = path
      } else if (path) {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style></style>

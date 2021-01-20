<template>
  <a-config-provider>
    <div id="app">
      <a-locale-provider :locale="locale">
        <router-view />
      </a-locale-provider>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>

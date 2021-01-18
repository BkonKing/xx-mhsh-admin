<template>
  <div class="msgDetail">
    <page-header-wrapper> </page-header-wrapper>
    <toSubmit v-if="step===1"></toSubmit>
    <toCheck v-else-if="step===2"></toCheck>
    <toPush v-else-if="step===3"></toPush>
    <pushInfo v-else></pushInfo>
  </div>
</template>

<script>
import toSubmit from './toSubmit'
import toCheck from './toCheck'
import toPush from './toPush'
import pushInfo from './pushInfo'
export default {
  components: {
    toSubmit,
    toCheck,
    toPush,
    pushInfo
  },
  data () {
    return {
      step: 4
    }
  }
}
</script>

<style>
</style>

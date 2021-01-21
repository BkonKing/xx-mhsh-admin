<template>
  <div class="noteDetail">
    <page-header-wrapper></page-header-wrapper>
    <toSubmit v-if="step===1"></toSubmit>
    <toCheck v-else-if="step===2"></toCheck>
    <toPush v-else-if="step==3"></toPush>
    <successPush v-else-if="step===4"></successPush>
    <cancelPush v-else></cancelPush>
  </div>
</template>

<script>
import toSubmit from './toSubmit'
import toCheck from './toCheck'
import toPush from './toPush'
import successPush from './successPush'
import cancelPush from './cancelPush'
export default {
  components: {
    toSubmit,
    toCheck,
    toPush,
    successPush,
    cancelPush
  },
  data () {
    return {
      step: 5
    }
  }

}
</script>

<style>
</style>

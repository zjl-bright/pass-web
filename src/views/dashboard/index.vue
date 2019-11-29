<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <FlipClock />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FlipClock from '@/components/common/FlipClock'

export default {
  name: 'Dashboard',
  components: {
    FlipClock
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

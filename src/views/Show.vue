<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  components: {

  },
  mounted () {
    this.$store.commit('hideTabbar')
  },
  beforeDestroy () {
    this.$store.commit('showTabbar')
  }
}
</script>

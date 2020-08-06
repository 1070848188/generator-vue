<template>
  <div>
    <el-button @click="outLgoin" >退出登录</el-button>
      <!-- <keep-alive :include="includeCom"> -->
          <router-view />
      <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  methods: {
    outLgoin () {
      this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style>

</style>

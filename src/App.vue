<template>
  <div id="app">
    <router-view />
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'app',
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  created() {
    this.interceptorRequest()
    this.interceptorResponse()
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>

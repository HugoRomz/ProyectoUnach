<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (token && userData) {
      this.$store.dispatch("setToken", token);
      this.$store.dispatch("setUser", userData);
    }
  },
};
</script>

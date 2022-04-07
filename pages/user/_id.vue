<template>
  <div>
    <p>User Id : {{ $route.params.id}}</p>
  </div>
</template>

<script>
  export default {
    name: "UserId",
    layout: 'navBar',
    created() {
      console.log(this.$route.params.id);
    }
  }
</script>

<style scoped>

</style>

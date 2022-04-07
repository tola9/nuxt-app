<template>
  <div class="body">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/user">User</NuxtLink>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          <b-nav-item-dropdown right>
            <template #button-content>
              <em v-if="$store.getters.getProfile">{{ $store.getters.getProfile.name }}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="$auth.logout()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt />
    <div style="flex: 1 1 0;"></div>
    <Footer />
  </div>
</template>

<script>
  import Footer from "~/components/footer";
  export default {
    name: "default",
    components: {Footer},
    methods: {
      logout() {
        this.$store.dispatch('logout');
      }
    }
  }
</script>

<style scoped>
  .body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    line-height: 1.6;
    word-break: break-all;
    color: rgb(51, 51, 51);
    font-size: 14px;
    padding: 0px;
    margin: 0px;
  }
  a {
    color: white;
    text-decoration: none;
    background-color: transparent;
    margin-right: 20px;
  }
  a:hover {
    text-decoration: none;
    color: #000;
  }
</style>

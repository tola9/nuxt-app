<template>
  <div>
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
            <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt />
  </div>
</template>

<script>
  export default {
    name: "navBar",
    layout: 'navBar',
    methods: {
      logout() {
        this.$store.dispatch('logout');
      }
    }
  }
</script>

<style scoped>
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

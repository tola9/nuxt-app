<template>
  <div class="body">
    <b-navbar toggleable="lg" type="dark" variant="secondary">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <NuxtLink class="link" active-class="active" exact to="/">Home</NuxtLink>
          <NuxtLink class="link" active-class="active" exact to="/user">User</NuxtLink>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div class="text-center">
            <b-button variant="secondary" @click="cart">
              Cart
              <b-badge variant="light">{{ $store.getters.countCarts }} <span class="sr-only">unread messages</span></b-badge>
            </b-button>
          </div>
          <b-avatar badge badge-variant="success" src="https://placekitten.com/300/300" v-if="$auth.loggedIn"></b-avatar>
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
      cart() {
        this.$router.push('/cart');
      },
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
  .navbar {
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;
    z-index: 999;
    padding: 0px;
  }
  a {
    color: white;
    text-decoration: none;
    background-color: transparent;
  }
  .bg-secondary {
    background-color: rgba(0, 0, 0, 0.05);
  }
  a:hover {
    text-decoration: none;
    color: #000;
  }
  .link {
    display: block;
    color: white;
    text-align: center;
    padding: 12px 60px;
    text-decoration: none;
    font-size: 12px;
  }
  .link:hover {
    background-color: dodgerblue;
    color: white;
    text-decoration: none;
  }
  .active {
    color:white;
    background-color: dodgerblue;
  }

  .exact-active-link {
    color: white;
  }
</style>

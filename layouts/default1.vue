<template>
  <div
    class="
      font-sora
      text-gray-500
      h-screen
      w-screen
      overflow-hidden
      antialiased
    "
  >
    <SideBar class="absolute" />

    <NavBar class="" />
    <main class="">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import NavBar from "./components/navbar/navbar.vue";
import SideBar from "./components/sidebar/sidebar.vue";
export default {
  components: { NavBar, SideBar },
};
</script>


<template>
  <v-app>
    <InfoBar></InfoBar>
    <NavBar></NavBar>

    <!-- Contenu principal -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>

    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import InfoBar from './components/InfoBar.vue';
</script>

<style>
@import "@/assets/styles/colors.scss";
@import "@/assets/styles/title.scss";
@import "@/assets/styles/button.scss";

#app {
  padding: 0;
  margin: 0px;
}
</style>
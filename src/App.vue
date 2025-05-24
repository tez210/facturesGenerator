<template>
  <v-app>
    <InfoBar></InfoBar>
    <NavBarComponent></NavBarComponent>

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
import NavBarComponent from '@/components/NavBarComponent.vue'
import InfoBar from './components/InfoBar.vue';
</script>

<style>
@import "@/assets/styles/colors.scss";

#app {
  padding: 0;
  margin: 0px;
}
</style>
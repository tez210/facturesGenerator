<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <v-app>
    <!-- Barre de navigation -->
    <v-app-bar color="primary" app>
      <!-- <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <img alt="Vue logo" class="logo mr-4" src="@/assets/logo.svg" width="40" height="40" />
          <span class="text-h6 font-weight-medium">My Vuetify App</span>
        </div>
        <div>
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </div>
      </v-container> -->
    </v-app-bar>

    <!-- Contenu principal -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>

    </v-main>
  </v-app>
</template>

<style>
body {
  background: rgb(var(--v-theme-background));
}

.v-application {
  background: rgb(var(--v-theme-background))
}

#app {
  padding: 0;
  margin: 0px;
}
</style>
<template>
  <v-app-bar color="primary" app v-if="userConnected">
    <template v-slot:prepend>
      <v-app-bar-title class="ml-5 mr-8">
        Factures Generator
      </v-app-bar-title>

      <v-btn to="/factures" router flat>Factures</v-btn>
      <v-btn to="/contacts" router flat>Contacts</v-btn>
    </template>

    <v-spacer />
    <v-btn flat>{{ userStore.user ? `${userStore.user.prenom} ${userStore.user.nom}` : '' }}</v-btn>
    <v-btn icon="mdi-power" @click="logout"></v-btn>
  </v-app-bar>
</template>


<script setup>
import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const { userConnected } = storeToRefs(userStore)

async function logout() {
  await userStore.disconnect()
  router.push('/Login')
}
</script>

<style scoped></style>

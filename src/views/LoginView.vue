<template>
  <v-card variant="tonal">
    <v-card-title>
      Factures generator
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <p>Connexion avec votre login et votre mot de passe :</p>
      <v-form>
        <v-text-field outline label="Nom d'utilisateur" type="text" v-model="username"></v-text-field>
        <v-text-field outline hide-details label="Mot de passe" type="password" v-model="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="loginUser">
        Login
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue'

const userStore = useUserStore()

const username = ref('')
const password = ref('')

function loginUser() {
  // Logique de validation ici
  userStore.username  = username;
  userStore.password = password;
  userStore.connect()
  console.log('Utilisateur connecté :', username.value)
}
</script>

<style></style>

<template>
  <v-card color="primary" class="connect-card">
    <v-card-title>
      Factures generator
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <p>Connexion avec votre login et votre mot de passe :</p>
      <v-form>
        <v-text-field variant="underlined" label="Nom d'utilisateur" type="text" v-model="username"></v-text-field>
        <v-text-field variant="underlined" hide-details label="Mot de passe" type="password" v-model="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block variant="flat" color="background" @click="loginUser">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')

function loginUser() {
  // Logique de validation ici
  userStore.username  = username;
  userStore.password = password;
  userStore.connect()
  console.log('Utilisateur connecté :', username.value)
  router.push('/Factures')
}
</script>

<style scoped>
.connect-card {
  max-width: 500px;
  min-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

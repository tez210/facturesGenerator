<template>
  <v-card color="primary" class="connect-card">
    <v-card-title>
      Factures generator
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <p>Connexion avec votre e-mail et votre mot de passe :</p>
      <v-form>
        <v-text-field variant="underlined" label="E-mail" type="text" v-model="mail"></v-text-field>
        <v-text-field variant="underlined" hide-details label="Mot de passe" type="password"
          v-model="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block variant="flat" color="background" @click="loginUser" :disabled="mail == '' || password == ''">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { useUserStore } from '@/stores/UserStore'
import { useInfobarStore } from '@/stores/InfoBarStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

const router = useRouter()
const userStore = useUserStore()
const snackbar = useInfobarStore()

const mail = ref('')
const password = ref('')
const errorMessage = ref('')

async function loginUser() {
  errorMessage.value = ''

  const { data, error } = await supabase.auth.signInWithPassword({
    email: mail.value,
    password: password.value
  })

  if (error) {
    snackbar.showInfobar('Connexion échouée : ' + error.message, 'error')
    return
  }

  const { user } = data

  userStore.session = data.session
  console.log('Connecté :', user)


  const { data: userInfo, errorget } = await supabase
    .from('user')
    .select('*')
    .eq('id_auth', user.id)
    .single()

  if (errorget) {
    snackbar.showInfobar('Connexion échouée : ' + errorget, 'error')
    return
  }

  snackbar.showInfobar('Utilisateur ' + user?.email + " connecté", 'success')

  userStore.connect({
    id: userInfo.id,
    nom: userInfo?.nom ?? '',
    prenom: userInfo?.prenom ?? '',
    adresse: userInfo?.adresse ?? '',
    mail: user.email ?? '',
    rpps: userInfo?.rpps ?? '',
    siret: userInfo?.siret ?? '',
  })

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

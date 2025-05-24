import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { User } from '@/types/User'
import { supabase } from '@/lib/supabaseClient'
import { useInfobarStore } from '@/stores/InfoBarStore'
import { useRouter } from 'vue-router'



export const useUserStore = defineStore('user', () => {
  const userConnected = ref(false)
  const user = ref<User | null>(null)
  const session = ref(null)

  function connect(userData: any) {
    user.value = new User(
      userData.id,
      userData.nom,
      userData.prenom,
      userData.adresse,
      userData.mail,
      userData.rpps,
      userData.siret
    )
    userConnected.value = true
  }
  async function disconnect() {
    const snackbar = useInfobarStore()
    const { error } = await supabase.auth.signOut()
    if (error) {
      snackbar.showInfobar('Déconnexion échouée : ' + error.message, 'error')
      return
    }
    snackbar.showInfobar('Déconnexion réussi', 'success')
    userConnected.value = false
    user.value = null
    session.value = null
  }


  return { userConnected, connect, disconnect, user, session }
})

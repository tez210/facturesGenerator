import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userConnected = ref(false)
  const username = ref("")
  const password = ref("")
  function connect() {
    userConnected.value = true
  }
  function disconnect() {
    userConnected.value = false
  }

  return { userConnected, connect, disconnect, username, password }
})

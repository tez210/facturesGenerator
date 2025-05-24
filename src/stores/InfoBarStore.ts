import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInfobarStore = defineStore('Infobar', () => {
    const visible = ref(false)
    const message = ref('')
    const color = ref('success')

    function showInfobar(msg: string, clr: string = 'success') {
        message.value = msg
        color.value = clr
        visible.value = true
    }

    function hideInfobar() {
        visible.value = false
    }

    return { visible, message, color, showInfobar, hideInfobar }
})

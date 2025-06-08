// src/main.ts
import 'vuetify/styles' // Styles Vuetify
import '@mdi/font/css/materialdesignicons.css'
import { VDateInput } from 'vuetify/labs/VDateInput'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  components: {
    VDateInput,
  },
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: true,
        colors: {
          background: '#E1EEBC',
          surface: '#245D4A',
          primary: '#328E6E',
          secondary: '#90C67C',
          light: '#E1EEBC',
          error: '#D7263D',
          info: '#1D7F7F',
          success: '#2BB673',
          warning: '#F5A623',
          onPrimary: '#FFFFFF',
          onSecondary: '#1F3B2C',
          onBackground: '#1F3B2C',
          onSurface: '#FFFFFF',
          color_a: '#E1EEBC',
          color_b: '#90C67C',
          color_c: '#67AE6E',
          color_d: '#328E6E',
          color_e: '#245D4A',
          color_f: '#1F3B2C',
          disabled: '#C9D5C2'
        }
      }
    }
  }
})


/*utilisation des couleurs :

<v-btn color="primary">Bouton primaire</v-btn>

import { useTheme } from 'vuetify'
const theme = useTheme()
console.log(theme.current.value.colors.primary)

background-color: var(--v-theme-primary);
*/


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')

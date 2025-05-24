// src/main.ts
import 'vuetify/styles' // Styles Vuetify
import '@mdi/font/css/materialdesignicons.css' // Icônes (optionnel)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: true,
        colors: {
          background: '#E1EEBC',
          surface: '#C78880',
          primary: '#328E6E',
          secondary: '#DDF6D2',
          light: '#FFFBDE',
          error: '#CB0404',
          info: '#096B68',
          success: '#2abe17',
          warning: '#FF9F00',
          onPrimary: '#096B68',
          onSecondary: '#096B68',
          onBackground: '#096B68',
          onSurface: '#096B68',
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

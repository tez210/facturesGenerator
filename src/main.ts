// src/main.ts
import 'vuetify/styles' // Styles Vuetify
import '@mdi/font/css/materialdesignicons.css' // Icônes (optionnel)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: true,
        colors: {
          background: '#096B68',
          surface: '#129990',
          primary: '#129990',
          secondary: '#90D1CA',
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

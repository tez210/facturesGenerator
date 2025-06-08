<template>
  <div class="contacts">
    <v-dialog v-model="dialogNewContact" width="auto" scrim="rgba(0, 0, 0, 0.9)">
      <NewContact :contacts="contacts" @contactCreated="loadContacts()" @closeDialog="dialogNewContact = false">
      </NewContact>
    </v-dialog>

    <v-row class="pl-3 pb-5 pr-4">
      <v-icon class="mt-2 mr-2" size="x-large" color="color_f">mdi-account-supervisor-circle</v-icon>
      <h1>Contacts</h1>
      <v-text-field v-model="search" density="compact" color="color_e" label="Rechercher"
        prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line class="search"
        clearable></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-refresh" size="large" density="compact" variant="outlined" @click="loadContacts()"
        class="basic_btn mt-2 ml-2 mr-2"></v-btn>
      <v-btn icon="mdi-plus" size="large" density="compact" variant="outlined" @click="addContact()"
        class="basic_btn mt-2"></v-btn>
    </v-row>

    <v-data-table :headers="headers" :items="contacts" class="custom-data-table" density="compact" item-value="id"
      hide-default-footer hover :loading="loading_tab" v-model:sort-by="sortBy" :search="search">
      <template v-slot:item="{ item }">
        <tr class="text-no-wrap">
          <td>{{ item.nom }}</td>
          <td>{{ item.prenom }}</td>
          <td>{{ item.adresse }}</td>
          <td>{{ item.mail }}</td>
          <td>{{ item.telephone }}</td>
          <td>{{ item.rpps }}</td>
          <td>{{ item.siret }}</td>
          <td class="text-end">
            <v-btn icon variant="text" @click="openContact(item)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useInfobarStore } from '@/stores/InfoBarStore'
import { supabase } from '@/lib/supabaseClient'
import NewContact from '@/components/NewContact.vue';

const search = ref('')
const loading_tab = ref(false)
const snackbar = useInfobarStore()
const dialogNewContact = ref(false)
const contacts = ref([])
const sortBy = ref([{ key: 'nom', order: 'asc' }])
const headers = [
  { title: 'Nom', key: 'nom', align: 'start' },
  { title: 'Prénom', key: 'prenom' },
  { title: 'Adresse', key: 'adresse' },
  { title: 'E-mail', key: 'mail' },
  { title: 'Téléphone', key: 'telephone' },
  { title: 'RPPS', key: 'rpps' },
  { title: 'Siret', key: 'siret' },
  { title: 'Actions', key: 'open', align: 'end' },
]

onMounted(() => {
  loadContacts();
})

async function loadContacts() {
  loading_tab.value = true;
  const { data, error } = await supabase
    .from('contact')
    .select('*')

  if (error) {
    snackbar.showInfobar('Erreur récupération contacts :', error.message, 'error')
  } else {
    contacts.value = data
  }
  loading_tab.value = false;
}

function addContact() {
  dialogNewContact.value = true
}

</script>

<style scoped>
.custom-data-table {
  background-color: var(--color-primary);
  color: white;
}

.custom-data-table :deep(thead) {
  background-color: var(--color_e);
}

.search {
  margin-top: 5px;
  margin-left: 10px;
  max-height: 15px !important;
  max-width: 400px;
}
</style>
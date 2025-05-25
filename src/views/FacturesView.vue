<template>
  <div class="factures">
    <v-dialog v-model="dialogNewFacture" width="auto" scrim="rgba(0, 0, 0, 0.9)">
      <NewFacture :contacts="contacts" @factureCreated="loadFactures()" @closeDialog="dialogNewFacture = false">
      </NewFacture>
    </v-dialog>

    <v-row class="pl-3 pb-5 pr-4">
      <h1>Factures</h1>
      <v-text-field v-model="search" density="compact" color="color_e" label="Rechercher"
        prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line class="search"
        clearable></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-refresh" size="large" density="compact" variant="outlined" @click="loadFactures()"
        class="basic_btn mt-2 ml-2 mr-2"></v-btn>
      <v-btn icon="mdi-plus" size="large" density="compact" variant="outlined" @click="addFacture()"
        class="basic_btn mt-2"></v-btn>
    </v-row>

    <v-data-table :headers="headers" :items="factures" class="custom-data-table" density="compact" item-value="id"
      hide-default-footer hover :loading="loading_tab" v-model:sort-by="sortBy" :sort-desc="[true]" :search="search">
      <template v-slot:item="{ item }">
        <tr class="text-no-wrap">
          <td>{{ item.numero }}</td>
          <td>{{ item.date_facture }}</td>
          <td>{{ getNomPrenom(item.titulaire) }}</td>
          <td>{{ item.somme_brut.toLocaleString() }}€</td>
          <td>
            <v-progress-linear :model-value="item.taux" height="20" rounded color="color_e" class="elevation-1">
              <strong>{{ item.taux }}%</strong>
            </v-progress-linear>
          </td>
          <td>{{ item.somme_recu.toLocaleString() }}€</td>
          <td>{{ item.date_debut_rempla }}</td>
          <td>{{ item.date_fin_rempla }}</td>
          <td class="text-end">
            <v-btn icon variant="text" @click="openPdf(item.open)">
              <v-icon>mdi-file-pdf-box</v-icon>
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
import NewFacture from '@/components/NewFacture.vue';

const search = ref('')
const loading_tab = ref(false)
const snackbar = useInfobarStore()
const dialogNewFacture = ref(false)
const factures = ref([])
const contacts = ref([])
const sortBy = ref([{ key: 'numero', order: 'dsc' }])
const headers = [
  { title: 'Facture  n°', key: 'numero', align: 'start' },
  { title: 'Date facture', key: 'date_facture' },
  { title: 'Titulaire', key: 'titulaire' },
  { title: 'Montant brut', key: 'somme_brut' },
  { title: 'Taux', key: 'taux' },
  { title: 'Montant reversé', key: 'somme_recu' },
  { title: 'Date début', key: 'date_debut_rempla' },
  { title: 'Date fin', key: 'date_fin_rempla' },
  { title: 'Actions', key: 'open', align: 'end' },
]

onMounted(() => {
  loadFactures();
  fetchContacts();
})

async function loadFactures() {
  loading_tab.value = true;
  const { data, error } = await supabase
    .from('facture')
    .select('*')

  if (error) {
    snackbar.showInfobar('Erreur récupération factures :', error.message, 'error')
  } else {
    factures.value = data
  }
  loading_tab.value = false;
}

function addFacture() {
  dialogNewFacture.value = true
}

async function fetchContacts() {
  loading_tab.value = true;
  const { data, error } = await supabase
    .from('contact')
    .select('*')

  if (error) {
    snackbar.showInfobar('Erreur chargement contacts : ' + error.message, 'error')
  } else {
    contacts.value = data
  }

  loading_tab.value = false;
}

function getNomPrenom(titulaireId) {
  const contact = contacts.value.find(c => c.id === titulaireId)
  return contact ? `${contact.prenom}  ${contact.nom}` : '—'
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
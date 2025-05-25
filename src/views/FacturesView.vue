<template>
  <div class="factures">
    <v-dialog v-model="dialogNewFacture" width="auto" scrim="rgba(0, 0, 0, 0.9)">
      <NewFacture></NewFacture>
    </v-dialog>

    <v-row class="pl-3 pb-5 pr-4">
      <h1>Factures</h1>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-refresh" size="large" density="compact" variant="outlined" @click="loadFactures()"
        class="basic_btn mt-2 ml-2 mr-2"></v-btn>
      <v-btn icon="mdi-plus" size="large" density="compact" variant="outlined" @click="addFacture()"
        class="basic_btn mt-2"></v-btn>
    </v-row>

    <v-data-table :headers="headers" :items="factures" class="custom-data-table" density="compact" item-value="id"
      hide-default-footer hover>
      <template v-slot:item="{ item }">
        <tr class="text-no-wrap">
          <td>{{ item.numero }}</td>
          <td>{{ item.date_facture }}</td>
          <td>{{ item.titulaire }}</td>
          <td>{{ item.somme_brut.toLocaleString() }}€</td>
          <td>{{ item.taux }}</td>
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
import { selectFromTable } from '@/services/supabaseService'
import NewFacture from '@/components/NewFacture.vue';
const dialogNewFacture = ref(false)
const factures = ref([])
const headers = [
  { title: 'Facture  n°', key: 'numero', align: 'start' },
  { title: 'Date facture', key: 'date_facture' },
  { title: 'Titulaire', key: 'titulaire' },
  { title: 'Montant brut', key: 'somme_brut' },
  { title: 'Taux', key: 'taux' },
  { title: 'Montant reversé', key: 'somme_recu' },
  { title: 'Date début', key: 'date_debut_rempla' },
  { title: 'Date fin', key: 'date_fin_rempla' },
  { title: 'Ouvrir', key: 'open', align: 'end' },
]

onMounted(() => {
  loadFactures()
})

async function loadFactures() {
  const data = await selectFromTable('facture', '*')
  if (data) {
    factures.value = data
  }
}

function addFacture() {
  dialogNewFacture.value = true
}

</script>

<style scoped>
.custom-data-table {
  background-color: var(--color-primary);
  color: white;
}
</style>
<template>
  <div class="factures">
    <h1>Factures</h1>
    <v-data-table :headers="headers" :items="factures" class="text-caption custom-data-table" density="compact"
      item-value="id" hide-default-footer hover>
      <template v-slot:item="{ item }">
        <tr class="text-no-wrap">
          <td>{{ item.id }}</td>
          <td>{{ item.dateFacture }}</td>
          <td>{{ item.titulaire }}</td>
          <td>{{ item.sommeBrut.toLocaleString() }}€</td>
          <td>{{ item.taux }}</td>
          <td>{{ item.sommeRecu.toLocaleString() }}€</td>
          <td>{{ item.dateDebutRempla }}</td>
          <td>{{ item.dateFinRempla }}</td>
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
const headers = [
  { title: 'Facture  n°', key: 'id', align: 'start' },
  { title: 'Date facture', key: 'dateFacture' },
  { title: 'Titulaire', key: 'titulaire' },
  { title: 'Montant brut', key: 'sommeBrut' },
  { title: 'Taux', key: 'taux' },
  { title: 'Montant reversé', key: 'sommeRecu' },
  { title: 'Date début', key: 'dateDebutRempla' },
  { title: 'Date fin', key: 'dateDebutRempla' },
  { title: 'Ouvrir', key: 'open', align: 'end' },
]
const factures = [
  {
    id: 'F001',
    dateFacture: '2025-01-05',
    titulaire: 'Alice Dupont',
    sommeBrut: 2800.00,
    taux: '20%',
    sommeRecu: 2240.00,
    dateDebutRempla: '2024-12-01',
    dateFinRempla: '2024-12-31',
    open: 'factures/F001.pdf'
  },
  {
    id: 'F002',
    dateFacture: '2025-02-10',
    titulaire: 'Marc Lambert',
    sommeBrut: 3000.00,
    taux: '15%',
    sommeRecu: 2550.00,
    dateDebutRempla: '2025-01-01',
    dateFinRempla: '2025-01-31',
    open: 'factures/F002.pdf'
  },
  {
    id: 'F003',
    dateFacture: '2025-03-03',
    titulaire: 'Sophie Martin',
    sommeBrut: 3200.00,
    taux: '10%',
    sommeRecu: 2880.00,
    dateDebutRempla: '2025-02-01',
    dateFinRempla: '2025-02-28',
    open: 'factures/F003.pdf'
  },
  {
    id: 'F004',
    dateFacture: '2025-04-01',
    titulaire: 'Julien Moreau',
    sommeBrut: 2700.00,
    taux: '5%',
    sommeRecu: 2565.00,
    dateDebutRempla: '2025-03-01',
    dateFinRempla: '2025-03-31',
    open: 'factures/F004.pdf'
  }
]
</script>

<style scoped>
.custom-data-table {
  background-color: var(--color-primary);
  color: white;
}
</style>
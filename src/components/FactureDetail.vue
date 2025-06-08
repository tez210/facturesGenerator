<template>
    <v-card color="primary" class="facture-card card_all">
        <v-card-title class="card_header" style="background-color: blue;">
            <v-icon size="small">mdi-invoice-text</v-icon>
            Facture n°
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="500px" style="border: none;"></iframe>
        </v-card-text>
        <v-card-actions>
            <v-btn block variant="flat" color="color_e" @click="downloadPDF()">
                Télécharger en PDF
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useInfobarStore } from '@/stores/InfoBarStore'
import jsPDF from 'jspdf'

const props = defineProps({
    facture: Object
})

const pdfUrl = ref(null)

onMounted(() => {
    generatePdfBlob()
})


function generatePdfBlob() {
    const facture = props.facture

    const doc = new jsPDF()
    const dateFacture = new Date(facture.date_facture).toLocaleDateString()
    const dateDebut = new Date(facture.date_debut_rempla).toLocaleDateString()
    const dateFin = new Date(facture.date_fin_rempla).toLocaleDateString()

    const contenu = `
Facture de rétrocession d’honoraires
Date : ${dateFacture}
Facture n° : ${facture.numero}

Docteur Ton Nom
Adresse
RPPS : xxxxxx
SIRET : xxxxxx

À l’attention du Docteur Titulaire ${facture.titulaire}
Adresse du cabinet

Objet : Rétrocession d’honoraires pour la période du ${dateDebut} au ${dateFin}

Montant brut des honoraires encaissés par le cabinet : ${facture.somme_brut} €
Taux de rétrocession : ${facture.taux} %
Montant reversé au remplaçant : ${facture.somme_recu.toFixed(2)} €

La présente rétrocession ne comprend pas de TVA, conformément à l’article 261-4-1° du CGI.

⸻

📌 Mentions finales :
• Facture établie en franchise de TVA, article 261-4-1° du CGI
• Paiement à réception
• Signature
`

    doc.setFontSize(12)
    const lines = doc.splitTextToSize(contenu, 180)
    doc.text(lines, 10, 20)

    const blob = doc.output('blob')
    pdfUrl.value = URL.createObjectURL(blob)
}


async function downloadPDF() {
    const link = document.createElement('a')
    link.href = pdfUrl.value
    link.download = `facture-${props.facture.numero}.pdf`
    link.click()
}


</script>

<style scoped>
.facture-card {
    min-width: 800px;
}
</style>
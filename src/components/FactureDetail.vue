<template>
    <v-card color="primary" class="facture-card card_all">
        <v-card-title class="card_header" style="background-color: blue;">
            <v-icon size="small">mdi-invoice-text</v-icon>
            Facture n° {{ facture.numero }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="600px" style="border: none;"></iframe>
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
import { useUserStore } from '@/stores/UserStore'
const userStore = useUserStore()
import jsPDF from 'jspdf'

const props = defineProps({
    facture: Object,
    titulaire: Object
})

const pdfUrl = ref(null)

onMounted(() => {
    generatePdfBlob()
})


async function generatePdfBlob() {
    const facture = props.facture
    const titulaire = props.titulaire

    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()

    let y = 20
    const lineSpacing = 8

    // Logo en haut
    // const logoResponse = await fetch('/public/signature.jpg')
    // const logoBlob = await logoResponse.blob()
    // const logoBase64 = await blobToBase64(logoBlob)
    // doc.addImage(logoBase64, 'JPG', 10, y, 30, 30)

    // Titre centré
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('Facture de rétrocession d’honoraires', pageWidth / 2, y + 10, { align: 'center' })

    y += 40

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)

    doc.text(`Date : ${new Date(facture.date_facture).toLocaleDateString()}`, 10, y)
    y += lineSpacing
    doc.text(`Facture n° : ${facture.numero}`, 10, y)
    y += lineSpacing * 2

    doc.setFont('helvetica', 'bold')
    doc.text('Émis par :', 10, y)
    y += lineSpacing
    doc.setFont('helvetica', 'normal')
    doc.text(`Dr ${userStore.user.nom.toUpperCase()} ${userStore.user.prenom}`, 10, y)
    y += lineSpacing
    doc.text(userStore.user.adresse, 10, y)
    y += lineSpacing
    doc.text(`RPPS : ${userStore.user.rpps}`, 10, y)
    y += lineSpacing
    doc.text(`SIRET : ${userStore.user.siret}`, 10, y)
    y += lineSpacing * 2

    doc.setFont('helvetica', 'bold')
    doc.text('Destinataire :', 10, y)
    y += lineSpacing
    doc.setFont('helvetica', 'normal')
    doc.text(`Dr ${titulaire.nom.toUpperCase()} ${titulaire.prenom}`, 10, y)
    y += lineSpacing
    doc.text(titulaire.adresse, 10, y)
    y += lineSpacing * 2

    doc.setFont('helvetica', 'bold')
    doc.text('Objet :', 10, y)
    y += lineSpacing
    doc.setFont('helvetica', 'normal')
    doc.text(`Rétrocession d’honoraires du ${new Date(facture.date_debut_rempla).toLocaleDateString()} au ${new Date(facture.date_fin_rempla).toLocaleDateString()}`, 10, y)
    y += lineSpacing * 2

    doc.text(`Montant brut encaissé : ${facture.somme_brut} €`, 10, y)
    y += lineSpacing
    doc.text(`Taux de rétrocession : ${facture.taux} %`, 10, y)
    y += lineSpacing
    doc.text(`Montant reversé au remplaçant : ${facture.somme_recu.toFixed(2)} €`, 10, y)
    y += lineSpacing * 2

    doc.setFont('helvetica', 'italic')
    doc.text('Facture sans TVA – article 261-4-1° du CGI.', 10, y)
    y += lineSpacing * 2

    doc.setFont('helvetica', 'bold')
    doc.text('Mentions légales :', 10, y)
    y += lineSpacing
    doc.setFont('helvetica', 'normal')
    doc.text('• Facture établie en franchise de TVA', 10, y)
    y += lineSpacing
    doc.text('• Paiement à réception', 10, y)
    y += lineSpacing

    doc.text('• Signature :', 10, y)
    y += lineSpacing

    // Signature image
    const sigResponse = await fetch('/public/signature.jpg')
    const sigBlob = await sigResponse.blob()
    const sigBase64 = await blobToBase64(sigBlob)
    doc.addImage(sigBase64, 'JPEG', 40, y - 15, 30, 30)

    // Génération du PDF
    const blob = doc.output('blob')
    pdfUrl.value = URL.createObjectURL(blob)
}

// Utilitaire : convertir Blob en base64
function blobToBase64(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
    })
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
    /* width: 800px; */
}
</style>
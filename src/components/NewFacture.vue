<template>
    <v-card color="primary" class="new-facture-card card_all">
        <v-card-title class="card_header" style="background-color: blue;">
            <v-icon size="small">mdi-plus</v-icon>
            Nouvelle facture
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-form>
                <v-text-field variant="underlined" label="N° Facture" type="text" v-model="numero"
                    :loading="loading_numero">
                </v-text-field>
                <v-select v-model="titulaire" :items="contacts" variant="underlined" label="Titulaire"
                    :item-title="formatContact" item-value="id" :loading="loading_contacts"></v-select>
                <v-number-input v-model="somme_brut" control-variant="white" density="compact" controlVariant="stacked"
                    label="Somme brut (€)" variant="outlined" :min="0" :step="100"></v-number-input>
                <v-slider label="Taux" v-model="taux" thumb-label="always" min="0" max="100" always-dirty step="5"
                    class="ml-0 mt-5">
                    <template v-slot:thumb-label="{ modelValue }">
                        {{ modelValue }}%
                    </template>
                </v-slider>
                <v-number-input v-model="somme_recu" control-variant="white" density="compact" controlVariant="stacked"
                    label="Somme reçue (€)" variant="outlined" :min="0" :step="100">
                    <template v-slot:append>
                        <v-btn icon="mdi-calculator" size="large" density="compact" variant="outlined"
                            @click="updateSommeRecu()" class="white_btn"></v-btn>
                    </template>
                </v-number-input>
                <v-date-input v-model="dates_rempla" prepend-icon="" label="Dates de remplacement" variant="underlined"
                    multiple="range">
                </v-date-input>

            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn block variant="flat" color="color_e" @click="createFacture()">
                créer
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useInfobarStore } from '@/stores/InfoBarStore'
import { useUserStore } from '@/stores/UserStore'

defineProps({
    contacts: Array
})

const snackbar = useInfobarStore()
const userStore = useUserStore()

const numero = ref('')
const titulaire = ref(null)
const taux = ref(50)
const somme_brut = ref(500)
const somme_recu = ref(250)
const dates_rempla = ref(null)
const loading_numero = ref(true);
const loading_contacts = ref(false)
const emit = defineEmits(['factureCreated', 'closeDialog'])


function updateSommeRecu() {
    somme_recu.value = Math.round(somme_brut.value * (taux.value / 100))
}

onMounted(() => {
    setLastNumeroFacture();
})

async function setLastNumeroFacture() {
    const { data, error } = await supabase
        .from('facture')
        .select('numero, date_facture')
        .order('numero', { ascending: false })
        .limit(1)
        .maybeSingle()

    if (error) {
        snackbar.showInfobar('Erreur récupération dernière facture : ' + error.message, 'error')
        loading_numero.value = false;
        return
    }

    const currentYear = new Date().getFullYear()
    let nextNumber = 1

    if (data && data.numero) {
        const [lastYearStr, lastNumStr] = data.numero.split('_')
        const lastYear = parseInt(lastYearStr)
        const lastNum = parseInt(lastNumStr)

        if (lastYear === currentYear) {
            nextNumber = lastNum + 1
        }
    }

    const padded = String(nextNumber).padStart(4, '0')
    numero.value = `${currentYear}_${padded}`
    loading_numero.value = false;
}

function formatContact(contact) {
    return `${contact.prenom} ${contact.nom}`
}

async function createFacture() {
    if (!isFieldsOK()) {
        snackbar.showInfobar("Veillez remplir tous les champs", "error")
        return
    }
    const { error } = await supabase.from('facture').insert({
        numero: numero.value,
        id_auteur: userStore.user.id,
        date_facture: new Date().toISOString().split('T')[0],
        titulaire: titulaire.value,
        somme_brut: parseFloat(somme_brut.value),
        taux: parseInt(taux.value),
        somme_recu: parseFloat(somme_recu.value),
        date_debut_rempla: dates_rempla.value?.[0] || null,
        date_fin_rempla: dates_rempla.value?.[1] || null,
    })

    if (error) {
        snackbar.showInfobar("Erreur lors de la création de la facture : " + error.message, "error")
        return
    }

    snackbar.showInfobar("Facture créée avec succès", "success")
    emit('factureCreated')
    emit('closeDialog')
}

function isFieldsOK() {
    if (numero.value == '' || titulaire.value == null || dates_rempla == null) {
        return false
    }
    return true
}


</script>

<style scoped>
.new-facture-card {
    min-width: 400px;
    max-width: 500px;
}
</style>
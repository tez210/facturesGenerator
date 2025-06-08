<template>
    <v-card color="primary" class="new-contact-card card_all">
        <v-card-title class="card_header" style="background-color: blue;">
            <v-icon size="small">mdi-plus</v-icon>
            Nouveau contact
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-form>
                <v-text-field variant="underlined" label="Nom*" type="text" v-model="nom"></v-text-field>
                <v-text-field variant="underlined" label="Prénom*" type="text" v-model="prenom"></v-text-field>
                <v-text-field variant="underlined" label="Adresse" type="text" v-model="adresse"></v-text-field>
                <v-text-field variant="underlined" label="E-mail" type="text" v-model="mail"></v-text-field>
                <v-text-field variant="underlined" label="Téléphone" type="text" v-model="telephone"></v-text-field>
                <v-text-field variant="underlined" label="RPPS" type="text" v-model="rpps"></v-text-field>
                <v-text-field variant="underlined" label="Siret" type="text" v-model="siret"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn block variant="flat" color="color_e" @click="createContact()">
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

const nom = ref('')
const prenom = ref('')
const adresse = ref('')
const mail = ref('')
const telephone = ref('')
const rpps = ref('')
const siret = ref('')

const emit = defineEmits(['contactCreated', 'closeDialog'])

async function createContact() {
    if (!isFieldsOK()) {
        snackbar.showInfobar("Veillez remplir tous les champs obligatoires (*)", "error")
        return
    }
    const { error } = await supabase.from('contact').insert({
        nom: nom.value,
        prenom: prenom.value,
        adresse: adresse.value || null,
        mail: mail.value || null,
        telephone: telephone.value || null,
        rpps: rpps.value || null,
        siret: siret.value || null,
    })

    if (error) {
        snackbar.showInfobar("Erreur lors de la création du contact : " + error.message, "error")
        return
    }

    snackbar.showInfobar("Contact créé avec succès", "success")
    emit('contactCreated')
    emit('closeDialog')
}

function isFieldsOK() {
    if (nom.value == '' || prenom.value == null) {
        return false
    }
    return true
}


</script>

<style scoped>
.new-contact-card {
    min-width: 400px;
    max-width: 500px;
}
</style>
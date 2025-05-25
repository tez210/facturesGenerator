<template>
    <v-card color="primary" prepend-icon="mdi-plus" title="Nouvelle facture" class="new-facture-card">

        <v-divider></v-divider>
        <v-card-text>
            <v-form>
                <v-text-field variant="underlined" label="N° Facture" type="text" v-model="numero"></v-text-field>
                <v-select v-model="titulaire" variant="underlined" label="Titulaire"></v-select>
                <v-number-input v-model="somme_brut" control-variant="white" density="compact" controlVariant="stacked"
                    label="Somme brut (€)" variant="outlined" :min="0" :step="100"></v-number-input>
                <v-slider label="Taux" v-model="taux" thumb-label="always" min="1" max="100" always-dirty step="1"
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
                <v-date-input v-model="dates_rempla" prepend-icon="" label="Dates de remplassement" variant="underlined"
                    multiple="range">
                </v-date-input>

            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn block variant="flat" color="color_e" @click="loginUser">
                créer
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { selectFromTable } from '@/services/supabaseService'

const numero = ref('')
const titulaire = ref(null)
const taux = ref(50)
const somme_brut = ref(500)
const somme_recu = ref(250)
const dates_rempla = ref(null)


function updateSommeRecu() {
    somme_recu.value = Math.round(somme_brut.value * (taux.value / 100))
}

onMounted(() => {

})

</script>

<style scoped>
.new-facture-card {
    min-width: 400px;
    max-width: 500px;
}
</style>
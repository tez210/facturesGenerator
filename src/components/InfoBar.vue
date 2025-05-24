<template>
    <v-snackbar v-model="snackbar.visible" :timeout="4000" :color="snackbar.color" location="top">
        {{ snackbar.message }}
    </v-snackbar>
</template>


<script setup>
import { useInfobarStore } from '@/stores/InfoBarStore'
const snackbar = useInfobarStore()
</script>

<style scoped></style>

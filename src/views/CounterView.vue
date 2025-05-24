<template>
    <div>
        <h1 v-if="counter%2 == 1">Valeur : {{ counter }} (impair)
        </h1>
        
        <h1 v-else>Valeur : {{ counter }} (pair)</h1>
        <h1 v-else>toto : {{ counter }} (pair)</h1>
        <button @click="increment()">+</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const counter = ref(100);

function increment() {
    counter.value++;
}

</script>

<style scoped>
</style>



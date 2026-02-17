<template>
    <div>
        <v-app-bar :elevation="13">
            <template v-slot:prepend>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>Application Bar</v-app-bar-title>
            <LoginReg/>
        </v-app-bar>
    </div>
</template>

<script setup>
import { NuxtLink } from '#components';
import { ref } from 'vue'
import LoginReg from './LoginReg.vue';
const drawer = ref(false)
</script>

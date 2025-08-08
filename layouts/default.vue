<template>
  <v-layout>
    <!-- Include the hamburger drawer -->
    <Navbar />

    <!-- Page content will appear here -->
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import LayoutNavbar from '#components'
import Navbar from '~/components/Layout/Navbar.vue';
</script>

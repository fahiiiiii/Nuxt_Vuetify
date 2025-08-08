<template>
  <v-card class="mx-auto" max-width="344" title="User Registration">
    <v-container>
      <v-text-field v-model="first" color="primary" label="First name" variant="underlined"></v-text-field>

      <v-text-field v-model="last" color="primary" label="Last name" variant="underlined"></v-text-field>

      <v-text-field v-model="email" color="primary" label="Email" variant="underlined"></v-text-field>

      <v-text-field v-model="password" color="primary" label="Password" placeholder="Enter your password"
        variant="underlined"></v-text-field>

      <v-checkbox v-model="terms" color="secondary" label="I agree to site terms and conditions"></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" @click="handleRegister">
        Complete Registration
        <v-icon end>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>


  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const first = ref('')
const last = ref('')
const email = ref('')
const password = ref('')
const terms = ref(false)

const handleRegister = async () => {
  if (!terms.value) {
    alert('You must agree to the terms.') // ✅ alert instead of toast
    return
  }

  try {
    const response = await $fetch('/api/register', {
      method: 'POST',
      body: {
        fname: first.value,
        lname: last.value,
        email: email.value,
        password: password.value,
      },
    })

    alert(response.message || 'Registration successful!') // ✅ success alert
    console.log('✅ Registered user:', response.user)

  } catch (err) {
    console.error('❌ Registration failed:', err)
    alert(err?.data?.statusMessage || 'Registration failed!') // ❌ error alert
  }
}
</script>


<style lang="scss" scoped></style>
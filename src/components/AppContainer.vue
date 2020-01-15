<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-toolbar-title>App Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="signOut">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <template #extension v-if="hasExtension">
        <slot name="extension"></slot>
      </template>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <slot name="default"></slot>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { signOut } from '../api/auth'

export default {
  name: 'app-container',
  data: () => ({
  }),
  computed: {
    hasExtension() {
      return !!this.$slots.extension
    }
  },
  methods: {
    signOut() {
      signOut().then(() => {
        this.$router.push({ name: 'login' })
      })
    }
  },
  created() {
  },
  destroyed() {
  }
}
</script>

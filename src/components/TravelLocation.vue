<template>
  <v-row>
    <v-col cols="3">
      <v-text-field v-model="value.name" label="name"></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field v-model="value.time" label="time"></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field v-model="value.memo" label="memo"></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-btn icon @click="deleteLocation">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'travel-location',
  props: ['value'],
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.$emit('input', this.value)
      }
    }
  },
  methods: {
    deleteLocation() {
      this.$emit('delete', this.$vnode.key)
    }
  }
}
</script>
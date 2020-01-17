<template>
  <v-row>
    <v-col cols="1">
      {{ value.time }}
    </v-col>
    <v-col cols="3">
      <!-- <v-text-field v-model="value.name" label="name"></v-text-field> -->
      {{ value.name }}
    </v-col>
    <v-col cols="2">
      <!-- <v-text-field v-model="value.time" label="time"></v-text-field> -->
      <v-menu
        ref="menu"
        v-model="timePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="value.time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="value.time"
            label="Time"
            prepend-icon="access_time"
            readonly
            v-on="on"
            clearable
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="timePicker"
          v-model="value.time"
          full-width
          @click:minute="$refs.menu.save(value.time)"
        ></v-time-picker>
      </v-menu>
    </v-col>
    <v-col cols="3">
      <!-- <v-text-field v-model="value.memo" label="memo"></v-text-field> -->
    </v-col>
    <v-col cols="3" v-if="editable">
      <v-icon class="handle">mdi-menu-swap</v-icon>
      <v-icon @click="deleteLocation">delete</v-icon>
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('travel')

export default {
  name: 'travel-location',
  props: ['value'],
  data: () => ({
    timePicker: false
  }),
  computed: {
    ...mapState(['editable'])
  },
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

<style scoped>
.handle {
  cursor: move
}
</style>
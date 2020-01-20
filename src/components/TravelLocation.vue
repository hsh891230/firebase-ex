<template>
  <v-row class="elevation-2" @click="editLocation" v-ripple>
    <v-col cols="2">
      <strong>{{ value.time }}</strong>
    </v-col>
    <v-col>
      <v-row no-gutters>
        <v-col cols="12">
          <div class="title">{{ value.name }}</div>
        </v-col>
        <v-col>
          {{ value.memo }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" v-if="editable">
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
  // watch: {
  //   value: {
  //     deep: true,
  //     immediate: true,
  //     handler() {
  //       this.$emit('input', this.value)
  //     }
  //   }
  // },
  methods: {
    deleteLocation() {
      this.$emit('delete', this.$vnode.key)
    },
    editLocation() {
      console.log(1)
    }
  }
}
</script>

<style scoped >
.handle {
  cursor: move
}
</style>
<template>
  <v-card
    class="elevation-2"
  >
    <v-card-title class="headline">{{ title }} {{ value.date }} {{ value.title }}</v-card-title>
    <v-card-text>
      <v-timeline dense>
        <draggable class="list-group" :list="value.locations" group="schedule" @change="log">
          <v-timeline-item
            v-for="(location, index) in value.locations"
            :key="index"
          >
            <travel-location :key="index" v-model="value.locations[index]" @delete="deleteLocation"></travel-location>
          </v-timeline-item>
        </draggable>
      </v-timeline>
      <v-btn @click="addLocation()" outlined block>Add Location</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import TravelLocation from './TravelLocation'
import {  getDefaultLocation } from '../api/travels'
import draggable from 'vuedraggable'

export default {
  name: 'travel-schedule',
  props: ['value'],
  components: { TravelLocation, draggable },
  computed: {
    title() {
      return `Day ${this.$vnode.key + 1}`
    }
  },
  methods: {
    addLocation() {
      this.value.locations.push(getDefaultLocation())
    },
    deleteLocation(index) {
      this.value.locations.splice(index, 1)
    },
    log(event) {
      console.log(event)
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.$emit('input', this.value)
      }
    }
  }
}
</script>
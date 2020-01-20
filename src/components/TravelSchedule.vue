<template>
  <v-card
    class="elevation-2"
  >
    <v-card-title class="headline">{{ title }}</v-card-title>
    <v-card-subtitle>{{ value.date | date }}</v-card-subtitle>
    <v-card-text>
      <v-timeline
        dense
      >
        <draggable
          class="list-group"
          group="schedule"
          @change="log"
          v-bind="dragOptions"
        >
          <v-timeline-item
            small
            fill-dot
            right
            class="list-group-item"
            v-for="(location, index) in value.locations"
            :key="`time-${index}`"
          >
            <template #icon>
              <span class="white--text">{{ index + 1 }}</span>
            </template>
            <travel-location :key="index" v-model="value.locations[index]" @delete="deleteLocation"></travel-location>
          </v-timeline-item>
        </draggable>
      </v-timeline>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="addLocation()" outlined block>Add Location</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TravelLocation from './TravelLocation'
import { getDefaultLocation } from '../api/travels'
import draggable from 'vuedraggable'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('travel')

export default {
  name: 'travel-schedule',
  props: ['value'],
  components: { TravelLocation, draggable },
  data: () => ({
  }),
  computed: {
    ...mapState(['editable']),
    title() {
      return `Day ${this.$vnode.key + 1}`
    },
    dragOptions() {
      return {
        animation: 200,
        handle: '.handle',
        list: this.value.locations,
        disabled: !this.editable
      }
    }
  },
  methods: {
    addLocation() {
      this.value.locations.push(getDefaultLocation())
      this.$emit('update')
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
      // immediate: true,
      handler() {
        this.$emit('input', this.value)
      }
    }
  }
}
</script>
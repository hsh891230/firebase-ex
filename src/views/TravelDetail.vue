<template>
  <app-container>
    <template #extension>
      <v-tabs
        align-with-title
        background-color="transparent"
      >
        <v-tab>Tab 1</v-tab>
        <v-tab>Tab 2</v-tab>
        <v-tab>Tab 3</v-tab>
      </v-tabs>
    </template>
    <template #default>
      <v-btn @click="goList">List</v-btn>
      <v-btn @click="updateTravel">Update</v-btn>
      <travel-schedule v-for="(schedule, index) in travel.schedules"
          :key="index" v-model="travel.schedules[index]"></travel-schedule>
    </template>
  </app-container>
</template>

<script>
import { onTravel, getDefaultTravel, getDefaultLocation, updateTravel } from '../api/travels'
import AppContainer from '../components/AppContainer'
import TravelSchedule from '../components/TravelSchedule'
// import draggable from 'vuedraggable'

export default {
  name: 'travel-detail',
  props: ['uid', 'id'],
  components: { AppContainer, TravelSchedule },
  data: () => ({
    travel: getDefaultTravel(),
    unsubscribe: null,
  }),
  methods: {
    goList() {
      this.$router.push({ name: 'main', params: { uid: this.uid }})
    },
    addLocation(index) {
      this.travel.schedules[index].locations.push(getDefaultLocation())
    },
    updateTravel() {
      updateTravel(this.uid, this.id, this.travel)
    },
  },
  created() {
    this.unsubscribe = onTravel(this.uid, this.id, (doc) => this.travel = doc.data)
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
}
</script>
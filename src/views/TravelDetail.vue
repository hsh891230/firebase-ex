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
      Travel
      uid: {{ uid }} / id: {{ id }}
      {{ travel }}
      <v-list>
        <v-list-item
          v-for="day in days"
          :key="day"
        >
          {{ day }}
        </v-list-item>
      </v-list>
    </template>
  </app-container>
</template>

<script>
import moment from 'moment'
import { onTravel } from '../api/travels'
import AppContainer from '../components/AppContainer'

export default {
  name: 'travel-detail',
  props: ['uid', 'id'],
  components: { AppContainer },
  data: () => ({
    travel: {
    },
    unsubscribe: null,
  }),
  computed: {
    days() {
      const range = []
      if (this.travel.from && this.travel.to) {
        const from = moment(this.travel.from)
        const to = moment(this.travel.to)
        const diff = to.diff(from, 'days')
        for (let i = 0; i <= diff; i++) {
            range.push(from.clone().add(i, 'day').format(moment.HTML5_FMT.DATE))
        }
      }
      return range
    }
  },
  methods: {
    goList() {
      this.$router.push({ name: 'main', params: { uid: this.uid }})
    }
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
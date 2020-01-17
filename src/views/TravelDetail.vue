<template>
  <v-app>
    <v-app-bar
      app
      dark
      shrink-on-scroll
      prominent
    >
      <v-btn icon @click="goList">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span class="headline mr-2">{{ travel.title }}</span>
        <span class="caption mr-2">{{ travel.from | date }} - {{ travel.to | date }}</span>
        <v-icon small>mdi-pencil</v-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="signOut">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <template #extension>
        <v-tabs
          align-with-title
          background-color="transparent"
        >
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>

        <v-speed-dial
          v-model="fab"
          absolute
          bottom
          right
          direction="bottom"
          style="bottom: -20px"
        >
          <template v-slot:activator>
            <v-btn
              v-if="fab"
              v-model="fab"
              color="red"
              dark
              small
              fab
              @click="cancelOrder"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              v-else
              v-model="fab"
              color="pink"
              dark
              small
              fab
              @click="editOrder"
            >
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
          </template>
          <v-btn
            fab
            dark
            small
            color="green"
            @click="saveOrder"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-speed-dial>
      </template>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <travel-schedule
          v-for="(schedule, index) in travel.schedules"
          :key="index" v-model="travel.schedules[index]"
        ></travel-schedule>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { signOut } from '../api/auth'
import { onTravel, getDefaultTravel, getDefaultLocation, updateTravel } from '../api/travels'
import TravelSchedule from '../components/TravelSchedule'
import { createNamespacedHelpers } from 'vuex'
import _ from 'lodash'
const { mapState, mapActions } = createNamespacedHelpers('travel')

export default {
  name: 'travel-detail',
  props: ['uid', 'id'],
  components: { TravelSchedule },
  data: () => ({
    travel: getDefaultTravel(),
    unsubscribe: null,
    tempSchedules: [],
    fab: false
  }),
  computed: {
    ...mapState(['editable'])
  },
  methods: {
    ...mapActions(['setEditable']),
    goList() {
      this.$router.push({ name: 'main', params: { uid: this.uid }})
    },
    addLocation(index) {
      this.travel.schedules[index].locations.push(getDefaultLocation())
    },
    updateTravel() {
      // TODO
      updateTravel(this.uid, this.id, this.travel)
    },
    editOrder() {
      this.tempSchedules = _.cloneDeep(this.travel.schedules)
      this.setEditable(true)
    },
    cancelOrder() {
      this.travel.schedules = _.cloneDeep(this.tempSchedules)
      this.tempSchedules = []
      this.setEditable(false)
    },
    async saveOrder() {
      await updateTravel(this.uid, this.id, this.travel)
      this.setEditable(false)
    },
    signOut() {
      signOut().then(() => {
        this.$router.push({ name: 'login' })
      })
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
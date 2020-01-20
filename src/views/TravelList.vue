<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-toolbar-title>App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="signOut">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-btn
          fab
          bottom
          right
          absolute
          small
          @click.stop="openDialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-list two-line>
          <v-subheader>Travels</v-subheader>
          <template v-for="({ id, data }, index) in travels">
            <v-divider
              v-if="index !== 0"
              :key="index"
            ></v-divider>
            <v-list-item :key="id" :to="{ name: 'travel', params: { uid, id }}">
              <v-list-item-content>
                <v-list-item-title>{{ data.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ data.from }} ~ {{ data.to }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <v-dialog v-model="dialog" eager fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar>
              <v-btn icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>New Travel</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn text @click="addTravel">Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-form lazy-validation ref="form">
              <travel-form v-model="travel"></travel-form>
            </v-form>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { signOut } from '../api/auth'
import { getTravels, addTravel, getDefaultTravel } from '../api/travels'
import TravelForm from '../components/TravelForm'

const addHash = '#add'

export default {
  name: 'travel-list',
  props: ['uid'],
  components: { TravelForm },
  data: () => ({
    dialog: false,
    travels: [],
    travel: getDefaultTravel()
  }),
  computed: {
    isOpened() {
      return this.$route.hash === addHash
    },
    form() {
      return this.$refs.form
    }
  },
  methods: {
    async addTravel(travel) {
      if (!this.form.validate()) return

      const id = await addTravel(this.uid, travel)
      this.$router.push({
        name: 'travel',
        params: {
          uid: this.uid,
          id
        }
      })
    },
    signOut() {
      signOut().then(() => {
        this.$router.push({ name: 'login' })
      })
    },
    openDialog() {
      this.dialog = true
      this.form.resetValidation()
      this.$router.push({
        ...this.$route,
        hash: addHash
      })
    },
    closeDialog() {
      this.travel = getDefaultTravel()
      if (this.isOpened) {
        this.$router.back()
      }
    },
  },
  watch: {
    dialog(val) {
      val || this.closeDialog()
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.dialog = to.hash === addHash
    next()
  },
  async created() {
    if (this.$route.hash === addHash) { 
      this.$router.replace({
        ...this.$route,
        hash: ''
      })
    }
    this.travels = await getTravels(this.uid)
  }
}
</script>
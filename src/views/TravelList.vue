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
          @click="openDialog"
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
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
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
              <v-list three-line subheader>
                <v-list-item>
                  <v-text-field
                    label="Title"
                    v-model="travel.title"
                    required
                    :rules="[v => !!v || 'Title is required']"
                  ></v-text-field>
                </v-list-item>
                <v-list-item>
                  <v-date-picker
                    v-model="dates"
                    range
                    scrollable
                    landscape
                    full-width
                  ></v-date-picker>
                </v-list-item>
                <v-list-item>
                  <v-text-field
                    label="From"
                    v-model="travel.from"
                    readonly
                    required
                    :rules="[v => !!v || 'From date is required']"
                  ></v-text-field>
                </v-list-item>
                <v-list-item>
                  <v-text-field
                    label="To"
                    v-model="travel.to"
                    readonly
                    required
                    :rules="[v => !!v || 'To date is required']"
                  ></v-text-field>
                </v-list-item>
              </v-list>
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

const addHash = '#add'

export default {
  name: 'travel-list',
  props: ['uid'],
  data: () => ({
    dialog: false,
    travels: [],
    travel: getDefaultTravel()
  }),
  computed: {
    dates: {
      get() {
        return [this.travel.from, this.travel.to].filter(date => !!date)
      },
      set(dates) {
        this.travel.from = dates[0] || null
        this.travel.to = dates[1] || null
      }
    },
    isOpened() {
      return this.$route.hash === addHash
    },
    form() {
      return this.$refs.form
    }
  },
  methods: {
    async addTravel() {
      if (!this.form.validate()) return

      const id = await addTravel(this.uid, this.travel)
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
      this.$router.push({
        ...this.$route,
        hash: addHash
      })
    },
    closeDialog() {
      if (this.isOpened) {
        this.$router.replace({
          ...this.$route,
          hash: ''
        })
      }
      this.travel = getDefaultTravel()
      this.form.resetValidation()
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
    this.dialog = this.isOpened
    this.travels = await getTravels(this.uid)
  }
}
</script>
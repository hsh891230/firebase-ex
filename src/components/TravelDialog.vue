<template>
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
</template>

<script>
export default {
  name: 'travel-dialog',
  props: ['value', 'travel']
}
</script>
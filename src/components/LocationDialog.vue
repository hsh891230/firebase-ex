<template>
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
</template>

<script>
export default {
  name: 'location-dialog'
}
</script>
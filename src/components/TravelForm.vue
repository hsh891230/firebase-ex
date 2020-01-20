<template>
  <v-list three-line subheader>
    <v-list-item>
      <v-text-field
        label="Title"
        v-model="value.title"
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
        v-model="value.from"
        readonly
        required
        :rules="[v => !!v || 'From date is required']"
      ></v-text-field>
    </v-list-item>
    <v-list-item>
      <v-text-field
        label="To"
        v-model="value.to"
        readonly
        required
        :rules="[v => !!v || 'To date is required']"
      ></v-text-field>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'travel-form',
  props: ['value'],
  computed: {
    dates: {
      get() {
        return [this.value.from, this.value.to].filter(date => !!date)
      },
      set(dates) {
        this.value.from = dates[0] || null
        this.value.to = dates[1] || null
      }
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
<template>
  <v-container>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-text-field
        v-model="editedItem.name"
        label="Name"
        :rules="[v => !!v || 'Name is required']"
        @keydown.enter="addItem()"
      >
        <template v-slot:append-outer>
          <v-btn
            icon
            @click="addItem()"
            small
          >
            <v-icon>add</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <input type="text" style="display: none">
    </v-form>
    <v-data-table
      :headers="headers"
      :items="items"
    >
      <template v-slot:item.data.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.data.name"
          @save="updateItem(props.item.id, props.item.data)"
        > {{ props.item.data.name }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.data.name"
              :rules="[v => !!v || 'Name is required']"
              label="Edit"
              single-line
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import _ from 'lodash'
import firebase from 'firebase'
const db = firebase.firestore()

export default {
  name: 'test',
  data: () => ({
    headers: [
      { text: 'Id', value: 'id' },
      { text: 'Name', value: 'data.name' },
      { text: 'Actions', value: 'actions' }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      name: null
    }
  }),
  methods: {
    async addItem() {
      if (!this.$refs.form.validate()) return
      db.collection('users').add(this.editedItem)
      this.reset()
    },
    async deleteItem(item) {
      await db.collection('users').doc(item.id).delete()
    },
    async updateItem(id, data) {
      console.log(id, data)
      await db.collection('users').doc(id).update(data)
    },
    reset() {
      this.editedItem = _.cloneDeep(this.defaultItem)
      this.$refs.form.resetValidation()
    }
  },
  created() {
    db.collection('users').onSnapshot(querySnapshot => {
      this.items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      // this.ids = querySnapshot.docs.map(doc => doc.id)
    })
  }
}

</script>
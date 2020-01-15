import firebase from 'firebase'
import { toObject } from './firesbase-util'

const db = firebase.firestore()

export const getTravels = async (uid) => {
  return db.collection(`travelers/${uid}/travels`)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(toObject))
}

export const addTravel = async (uid, travel) => {
  return db.collection(`travelers/${uid}/travels`)
    .add({
      ...travel,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(docRef => docRef.id)
}

export const onTravel = (uid, id, callback) => {
  return db.doc(`travelers/${uid}/travels/${id}`).onSnapshot(doc => {
    callback(toObject(doc))
  })
}
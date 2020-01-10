import firebase from 'firebase'

const db = firebase.firestore()

export const test = () => {
  db.collection('users').onSnapshot(querySnapshot => {
    // querySnapshot.forEach(doc => {
    //   console.log(doc.data())
      // });
    console.log(querySnapshot.docs.map(doc => doc.data()))
  })
}
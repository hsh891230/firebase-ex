export const toObject = (docSnapshot) => ({
  id: docSnapshot.id,
  data: docSnapshot.data()
})

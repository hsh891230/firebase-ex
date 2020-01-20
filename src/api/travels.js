import firebase from 'firebase'
import { toObject } from './firesbase-util'
import _ from 'lodash'
import moment from 'moment'

const db = firebase.firestore()

const defaultTravel = {
  title: null,
  from: null,
  to: null,
  schedules: []
}

const defaultSchedule = {
  date: null,
  locations: []
}

const defaultLocation = {
  name: null,
  time: null,
  geoname: null, // ?
  geopoint: null,
  memo: null
}

export const getDefaultTravel = () => _.cloneDeep(defaultTravel)
export const getDefaultSchedule = () => _.cloneDeep(defaultSchedule)
export const getDefaultLocation = () => _.cloneDeep(defaultLocation)

export const dateRange = (fromDate, toDate) => {
  const range = []
  const from = moment(fromDate)
  const to = moment(toDate)
  const diff = to.diff(from, 'days')
  for (let i = 0; i <= diff; i++) {
      range.push(from.clone().add(i, 'day').format(moment.HTML5_FMT.DATE))
  }
  return range
}

export const getTravels = async (uid) => {
  return db.collection(`travelers/${uid}/travels`)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(toObject))
}

export const addTravel = async (uid, travel) => {
  return db.collection(`travelers/${uid}/travels`)
    .add({
      ...travel,
      schedules: dateRange(travel.from, travel.to).map(date => ({ ...getDefaultSchedule(), date })),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(docRef => docRef.id)
}

export const updateTravel = async (uid, id, travel) => {
  return db.doc(`travelers/${uid}/travels/${id}`).update(travel)
}

export const onTravel = (uid, id, callback) => {
  return db.doc(`travelers/${uid}/travels/${id}`).onSnapshot(doc => {
    callback(toObject(doc))
  })
}
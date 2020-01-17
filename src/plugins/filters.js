import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', (value) => !value ? '' : moment(value).format('M.D'))
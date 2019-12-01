import moment from 'moment'

export default {
  hasBirthday(elem) {
    if (elem.dob_year !== 0 || elem.dob_month !== 0) {
      return true
    }
    if (elem.dob_month !== 0 && elem.dob_day !== 0) {
      return true
    }
    return false
  },

  formatBirthdayDate(elem) {
    let format = 'MMMM'
    let year = elem.dob_year
    let day = elem.dob_day
    if (day !== 0) {
      format = 'Do ' + format
    } else {
      day = '01'
    }
    if (year !== 0) {
      format += ', YYYY'
    } else {
      year = moment().year()
    }

    const dateString = year + '-' + elem.dob_month + '-' + day
    return moment(dateString).format(format)
  }
}

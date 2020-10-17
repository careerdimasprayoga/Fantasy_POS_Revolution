export default {
  data() {
    return {
      urlApi: process.env.VUE_APP_URL,
      alertSuccess: false,
      alertSuccessMessage: '',
      alertError: false,
      alertErrorMessage: '',
      modalTitle: '',
      selectOptionStatus: [
        { value: '1', text: 'Available' },
        { value: '0', text: 'Not Available' }
      ],
      currentPage: 1,
      textSort: 'sort'
    }
  }
}

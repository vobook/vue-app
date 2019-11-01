export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.headers.common['X-Client'] = '1'
  })

  $axios.onError((error) => {
    console.log(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}

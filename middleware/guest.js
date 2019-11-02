export default function({ store, redirect }) {
  // If the user is authenticated redirect to home page
  console.log('Guest MW: ' + store.state.auth)
  if (store.state.auth) {
    return redirect('/')
  }
}

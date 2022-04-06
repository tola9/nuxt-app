export default function auth({redirect, store}) {
  let isAuthenticate = store.state.user ? true : false;
  if(!isAuthenticate) {
    redirect({name: 'login'});
  }
}

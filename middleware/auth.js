export default function ({ app, route, redirect }) {
  // ログインページでない場合
  if (route.path !== '/auth/login') {

    if (!app.$fire.auth.currentUser) {
      return redirect('/auth/login')
    }

    // ログインページの場合
  } else if (route.path === '/auth/login') {
    if (!app.$fire.auth.currentUser) {

    } else {
      return redirect('/')
    }
  }
}
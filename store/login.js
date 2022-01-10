export const state = () => ({
  user: {
    uid: '',
    email: '',
    name: '',
    login: false,
  },
});

export const getters = {
  user: state => {
    return state.user
  }
}

export const actions = {
  login({ dispatch }, payload) {
    $fire.auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        console.log('成功！')
        dispatch('checkLogin')
        $router.push('/')
      }).catch((error) => {
        alert(error)
      })
  },
  loginGoogle({ dispatch }) {
    var provider = new firebase.auth.GoogleAuthProvider()
    $fire.auth.signInWithPopup(provider).then(function (result) {
      dispatch('checkLogin')
    }).catch(function (error) {
      console.log(error)
    })
  },
  checkLogin({ commit }) {
    $fire.auth.onAuthStateChanged(function (user) {
      if (user) {
        commit('getData', { uid: user.uid, email: user.email })
        commit('switchLogin')
      }
    })
  },
}

export const mutations = {
  getData(state, payload) {
    state.user.uid = payload.uid
    state.user.email = payload.email
  },
  switchLogin(state) {
    state.user.login = true
  },
}
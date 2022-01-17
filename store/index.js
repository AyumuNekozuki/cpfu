export const state = () => ({
  user: '',
  // email: '',
  // displayName: '',
  // uid: ''
});


export const mutations = {
  // setEmail(state, email){
  //   state.email = email;
  // },
  // setDisplayName(state, displayName){
  //   state.displayName = displayName;
  // },
  // setUid(state, uid){
  //   state.uid = uid;
  // }
  SET_USER(state, user) {
    state.user = user;
  }
};

// const mutations = {
//   SET_USER(state, user) {
//     state.user = user
//   }
// }



export const actions = {
  async onAuthStateChangedAction(state, { authUser, claims }) {
    if (!authUser) {
      // authされていない場合
      state.commit('SET_USER', null);
      console.log("setuser null");

      // リダイレクトの設定
      this.$router.push({
        path: '/auth/login',
      });
    } else {
      // authされている場合
      console.log("authUser");
      console.log(authUser);

      const { uid, email, displayName } = authUser;
      state.commit('SET_USER', {
        uid,
        email,
        displayName
      });
    }
  }
}

// const getters = {
//   getUser(state) {
//     return state.user
//   }
// }

export const getters = {
  isLogin: state => {
    return !!state.user;
  },
  user: state => {
    return state.user;
  },
}

// export default {
//   state,
//   mutations,
//   actions,
//   getters,
// }
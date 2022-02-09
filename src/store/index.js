export const state = () => ({
  user: '',
});


export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  }
};


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
      const { uid, email, displayName } = authUser;
      state.commit('SET_USER', {
        uid,
        email,
        displayName
      });

      this.$router.push({
        path: '/my',
      });
    }
  }
}


export const getters = {
  isLogin: state => {
    return !!state.user;
  },
  user: state => {
    return state.user;
  },
}

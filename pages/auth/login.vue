<template>
  <div>
    <h2>login</h2>
    <p>{{ user }}</p>
    <button @click="login()">ろぐいん</button>
  </div>
</template>

<script>
export default {
  layout: "signin",
  data() {
    return {
      snackbar: false,
      snackbarText: "エラーはありません",
      auth: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      let that = this;

      var provider = new this.$fireModule.auth.GoogleAuthProvider();
      this.$fire.auth
        .signInWithRedirect(provider)
        .catch(function (error) {
          that.snackbarText = error.message;
          that.snackbar = true;
        })
        .then((user) => {
          $nuxt.$router.push("/");
        });
    },
  },
};
</script>
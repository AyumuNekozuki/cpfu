<template>
  <div class="login">
    <h2>ログイン</h2>

    <b-button variant="success" @click="demouser_login()"
      >就プレ用デモアカウントでログインする</b-button
    >
    <b-button variant="primary" @click="google_login()"
      >Googleアカウントでログインする</b-button
    >

    <b-card
      border-variant="warning"
      header="デモアカウントと通常アカウントの違い"
      align="center"
    >
      <b-card-text>
        <p>当サービスを利用するには、直近半年以内にニコニコ・YouTube双方に動画を投稿し、<br>1本以上の動画が公開状態にある必要があります。</p>
        <p>
          デモアカウントでは、事前設定を全て終えた状態のアカウントを設定済みです。<br>
          各種設定変更は行えませんが、閲覧のみであれば問題なく利用できます。
        </p>
        <p>尚、現在、就プレ用DEMOモードで実行中のため、<br>
        Googleアカウントログイン時の一部機能が利用できません。</p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
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
    google_login() {
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
    demouser_login() {
      let that = this;

      this.$fire.auth
        .signInWithEmailAndPassword(
          'cropura_demo_user@nekozuki.me',
          'Hq_ctCzjuLp99KVMBaMnH2tg'
        )
        .then((user) => {
          $nuxt.$router.push("/");
        })
        .catch((error) => {
          that.snackbarText = error.message;
          that.snackbar = true;
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin: 2rem 2rem 1rem;
  font-family: "M PLUS Rounded 1c", sans-serif;
  text-align: center;
}
button {
  margin: 1rem;
}
.card {
  margin: 1rem;
}
</style>
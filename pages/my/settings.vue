<template>
  <div class="settings">
    <header>
      <b-navbar toggleable="lg">
        <b-navbar-brand>ユーザー設定</b-navbar-brand>
      </b-navbar>
    </header>
    <div class="settings_body">
      <div class="settings_item">
        <div class="title">
          <h3>メールアドレス</h3>
        </div>
        <div class="body">
          <p>{{ user.email }}</p>
          <b-badge variant="secondary">この項目は変更できません</b-badge>
        </div>
      </div>

      <div class="settings_item">
        <div class="title">
          <h3>ユーザーネーム</h3>
        </div>
        <div class="body" v-if="user.email != 'cropura_demo_user@nekozuki.me'">
          <b-form-input
            v-model="displayName"
            :placeholder="user.displayName"
          ></b-form-input>
          <b-button variant="primary" @click="update_username()">更新</b-button>
        </div>

        <div class="body" v-if="user.email == 'cropura_demo_user@nekozuki.me'">
          <p>{{ user.displayName }}</p>
          <b-badge variant="secondary"
            >デモユーザーの為設定変更はできません</b-badge
          >
        </div>
      </div>

      <div class="settings_item">
        <div class="title">
          <h3>ニコニコID</h3>
        </div>
        <div class="body" v-if="user.email != 'cropura_demo_user@nekozuki.me'">
          <b-form-input v-model="nico_userid" v-if="!userdata"></b-form-input>
          <b-form-input
            v-model="nico_userid"
            v-if="userdata"
            :placeholder="userdata.nico_userid"
          ></b-form-input>
          <b-button variant="primary" @click="update_nicoid()">更新</b-button>
        </div>

        <div class="body" v-if="user.email == 'cropura_demo_user@nekozuki.me'">
          <p>{{ userdata.nico_userid }}</p>
          <b-badge variant="secondary"
            >デモユーザーの為設定変更はできません</b-badge
          >
        </div>
      </div>

      <div class="settings_item">
        <div class="title">
          <h3>動画を読み込む</h3>
        </div>
        <div class="body" v-if="user.email != 'cropura_demo_user@nekozuki.me'">
          <p class="secondary">直近30件の公開動画を取得します</p>
          <b-button variant="primary" @click="loaded_contents()">実行</b-button>
        </div>

        <div class="body" v-if="user.email == 'cropura_demo_user@nekozuki.me'">
          <p class="secondary">直近30件の公開動画を取得します</p>
          <b-badge variant="secondary">デモユーザーの為実行できません</b-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
  async asyncData({ $axios, store, $fire, context }) {
    let uid = await store.getters.user.uid;

    let Snapshot = await $fire.firestore.collection("users").doc(uid).get();
    let userdata = Snapshot.data();

    return {
      userdata,
    };
  },
  methods: {
    update_username() {
      this.$fire.auth.currentUser
        .updateProfile({
          displayName: this.displayName,
        })
        .then(() => {
          this.$bvToast.toast("ユーザーネームを変更しました。", {
            title: "成功しました",
            autoHideDelay: 3000,
            variant: "success",
          });
        })
        .catch((error) => {
          this.$bvToast.toast("ユーザーネームの変更に失敗しました。", {
            title: "失敗しました",
            autoHideDelay: 3000,
            variant: "danger",
          });
          console.error(error);
        });
    },
    update_nicoid() {
      try {
        let uid = this.user.uid;
        this.$fire.firestore
          .collection("users")
          .doc(uid)
          .set(
            {
              nico_userid: this.nico_userid,
            },
            { merge: true }
          )
          .then(() => {
            this.$bvToast.toast("ニコニコIDを変更しました。", {
              title: "成功しました",
              autoHideDelay: 3000,
              variant: "success",
            });
          })
          .catch((error) => {
            this.$bvToast.toast("ニコニコIDの変更に失敗しました。", {
              title: "失敗しました",
              autoHideDelay: 3000,
              variant: "danger",
            });
            console.error(error);
          });
      } catch (error) {
        this.$bvToast.toast("ニコニコIDの変更に失敗しました。", {
          title: "失敗しました",
          autoHideDelay: 3000,
          variant: "danger",
        });
        console.error(error);
      }
    },
    async loaded_contents() {
      try {
        const parseString = require("xml2js").parseString;
        let uid = this.user.uid;

        let Snapshot = await this.$fire.firestore
          .collection("users")
          .doc(uid)
          .get();
        let nicoid = Snapshot.data().nico_userid;

        let xml = await this.$axios.$get(
          `/api_nico/user/${nicoid}/video?rss=2.0`
        );

        let movielist = [];
        parseString(xml, (message, xmlres) => {
          xmlres.rss.channel[0].item.forEach((item) => {
            var url = item.link[0];
            var str = url.substring(url.indexOf("sm"));
            movielist.push(str.substring(0, str.indexOf("?")));
          });
        });

        this.$fire.firestore
          .collection("users")
          .doc(uid)
          .set(
            {
              movielist: movielist,
            },
            { merge: true }
          )
          .then(() => {
            this.$bvToast.toast("動画を読み込みました", {
              title: "成功しました",
              autoHideDelay: 3000,
              variant: "success",
            });
          })
          .catch((error) => {
            this.$bvToast.toast("動画の読み込みに失敗しました", {
              title: "失敗しました",
              autoHideDelay: 3000,
              variant: "danger",
            });
            console.error(error);
          });
      } catch (error) {
        this.$bvToast.toast("動画の読み込みに失敗しました", {
          title: "失敗しました",
          autoHideDelay: 3000,
          variant: "danger",
        });
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.settings {
  background-color: #fafafa;
  header {
    background-color: white;
    border-bottom: 1px solid #ccc;
  }
  .navbar-brand {
    font-weight: bold;
    font-family: "M PLUS Rounded 1c", sans-serif;
  }

  .settings_body {
    min-height: 75vh;
    width: 100%;

    .settings_item {
      display: flex;
      margin: 1rem 2rem;

      .title {
        width: 130px;
        margin: 1rem;
        display: flex;
        align-items: center;
        h3 {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }
      }
      .body {
        margin: 1rem;
        display: flex;
        align-items: center;
        p {
          margin: 0;
          min-width: 300px;
        }
        span.badge,
        button {
          margin: 0 2rem;
          min-width: 6rem;
        }
        input {
          min-width: 300px;
        }
      }
    }
  }
}
</style>
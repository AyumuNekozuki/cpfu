<template>
  <div class="mypage_top">
    <header>
      <b-navbar toggleable="lg">
        <div class="thumbnail">
          <img src="" alt="" srcset="" />
        </div>
        <b-navbar-brand>{{ user.displayName }} さんの動画一覧</b-navbar-brand>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto"> </b-navbar-nav>
      </b-navbar>
    </header>
    <div class="videolist">
      <a
        class="videoitem"
        v-for="video_item in nicovideolist.item"
        :key="nicovideolist.item"
        :href="'/my/video/' + video_item.link[0].substr( 31).replace( '?ref=rss_myvideo_rss2' , '' )"
      >
        <div class="thumbnail">
          <img
            :src="video_item['media:thumbnail'][0]['$']['url']"
            alt=""
            srcset=""
          />
        </div>
        <div class="title">
          {{ video_item.title[0] }}
        </div>
        <!-- {{ video_item }} -->
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
  async asyncData({ $axios, store, $fire }, callback) {
    // console.log(store.getters.user.displayName)

    let uid = await store.getters.user.uid;

    // TODO ログインユーザー指定処理
    const docref = $fire.firestore.collection('users').doc(uid);
    docref.get().then((doc) => {
      return nicouserid = doc.data().nico_userid;
    });

    // nicovideo gethumbinfo
    await $axios
      .$get(`https://www.nicovideo.jp/user/45048152/video?rss=2.0`)
      .then((res) => {
        var parseString = require("xml2js").parseString;
        var xml = res;

        parseString(xml, (message, xmlres) => {
          callback(null, {
            nicovideolist: xmlres.rss.channel[0],
          });
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.mypage_top {
  background-color: #fafafa;
  header {
    background-color: white;
    border-bottom: 1px solid #ccc;
  }
  .videolist {
    .videoitem {
      padding: 1rem;
      display: flex;
      align-items: center;

      .thumbnail {
        width: 150px;
        margin-right: 1rem;

        img {
          width: 100%;
          height: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          border-radius: 5px;
        }
      }
      .title{
        font-weight: bold;
        color: #252525;
        font-size: 14px;
      }

      &+.videoitem{
        border-top: 1px solid #eee;
      }

      &:hover{
        background-color: white;
      }
    }
  }
}
</style>
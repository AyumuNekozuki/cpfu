<template>
  <div class="mypage_top">
    <header>
      <b-navbar toggleable="lg">
        <div class="thumbnail">
          <img src="" alt="" srcset="" />
        </div>
        <b-navbar-brand>{{ user.displayName }} さんの動画一覧</b-navbar-brand>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto rightid" v-if="userdata">
          <i class="nico-tvchan"></i
          ><span>user/{{ userdata.nico_userid }}</span>
        </b-navbar-nav>
      </b-navbar>
    </header>
    <div class="videolist">
      <nuxt-link
        class="videoitem"
        v-for="video_item in sortedItemsByID"
        :key="video_item.video_id"
        :to="'/my/video/' + video_item.video_id[0]"
      >
        <div class="thumbnail">
          <img
            :src="video_item.thumbnail_url[0]"
            alt="video_item.title[0]"
            srcset=""
          />
        </div>
        <div class="text">
          <div class="title">
            <span class="id">{{ video_item.video_id[0] }}</span>
            {{ video_item.title[0] }}
          </div>
          <div class="description">
            {{ video_item.description[0] }}
          </div>
          <div class="counter">
            <span class="playcount">
              <i class="nico-play"></i>{{ video_item.view_counter[0] }}
            </span>
            <span class="commentcount">
              <i class="nico-comment"></i>{{ video_item.comment_num[0] }}
            </span>
            <span class="mylistcount">
              <i class="nico-mylist"></i>{{ video_item.mylist_counter[0] }}
            </span>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link to="/my/settings" class="videoitem" v-if="sortedItemsByID.length == 0">
        <div class="thumbnail"></div>
        <div class="text">
          <div class="title">
            動画がありません
          </div>
          <div class="description">
            初期設定が必要です。ここをクリックして「ニコニコID」の登録と「動画の読み込み」を行なってください。
          </div>
        </div>
      </nuxt-link>
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
    sortedItemsByID() {
      return this.moviedata.sort((a, b) => {
        let id_A = a.video_id[0].toUpperCase();
        let id_B = b.video_id[0].toUpperCase();
        return id_A < id_B ? 1 : id_A > id_B ? -1 : 0;
      });
    },
  },
  async asyncData({ $axios, store, $fire, context }) {
    const parseString = require("xml2js").parseString;

    let uid = await store.getters.user.uid;

    let moviedata = [];

    let Snapshot = await $fire.firestore.collection("users").doc(uid).get();
    let userdata = Snapshot.data();

    var moviepromise = [];
    if (userdata && userdata.movielist) {
      userdata.movielist.forEach((movieid) => {
        moviepromise.push(
          $axios.$get(`/api_extnico/getthumbinfo/${movieid}`).then((data) => {
            var xml = data;
            parseString(xml, (message, xmlres) => {
              moviedata.push(xmlres.nicovideo_thumb_response.thumb[0]);
            });
          })
        );
      });
    }

    await Promise.all[moviepromise];

    return {
      userdata,
      moviedata,
    };
  },
};
</script>

<style lang="scss" scoped>
.mypage_top {
  background-color: #fafafa;
  header {
    background-color: white;
    border-bottom: 1px solid #ccc;
    position: sticky;
    top: 0;
    z-index: 5;

    .rightid {
      align-items: center;
      i {
        margin: 0 3px;
      }
    }
  }
  .navbar-brand {
    font-weight: bold;
    font-family: "M PLUS Rounded 1c", sans-serif;
  }

  .videolist {
    min-height: 75vh;
    .videoitem {
      padding: 1rem;
      display: flex;
      align-items: center;

      .thumbnail {
        width: 150px;
        margin-right: 1rem;
        flex: none;

        img {
          width: 100%;
          height: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          border-radius: 5px;
        }
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        height: 70px;
        width: calc(100vw - 175px - 4rem);

        .title {
          font-weight: bold;
          color: #252525;
          font-size: 14px;

          span {
            font-size: 12px;
            color: #666;
            margin-right: 5px;
          }
        }
        .description {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 12px;
          color: #666;
        }
        .counter {
          font-size: 12px;
          color: #666;
          i {
            margin: 0 2px 0 0;
          }
          span {
            margin: 0 10px 0 0;
          }
        }
      }
      .buttonarea {
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #252525;
          z-index: 5;

          &:hover {
            text-decoration: none;
            background-color: #eee;
          }
        }
      }

      & + .videoitem {
        border-top: 1px solid #eee;
      }

      &:hover {
        background-color: white;
        text-decoration: none;
      }
    }
  }
}
</style>
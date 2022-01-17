<template>
  <div class="p_analitics_desc">
    <header>
      <b-navbar toggleable="lg">
        <div class="thumbnail">
          <img :src="nico_thumbdata.thumbnail_url[0]" alt="" srcset="" />
        </div>
        <b-navbar-brand>{{ nico_thumbdata.title[0] }}</b-navbar-brand>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right class="descmenu youtube">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <font-awesome-icon :icon="['fab', 'youtube']" />
            </template>
            <b-dropdown-item href="#"> YouTube Studio </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right class="descmenu nico">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <i class="nico-tvchan"></i>
            </template>
            <!-- <b-dropdown-item :href="nicomenu">
              <i class="nico-tvplay"></i>ニコニコ動画 ガレージ
            </b-dropdown-item> -->
            <!-- <b-dropdown-item :href="nicomenu[1]">
              <i class="nico-ads"></i>動画を広告する
            </b-dropdown-item>
            <b-dropdown-item :href="nicomenu[2]">
              <i class="nico-koken"></i>ニコニ貢献
            </b-dropdown-item>
            <b-dropdown-item :href="nicomenu[3]">
              <i class="nico-cps"></i>クリエイター奨励プログラム
            </b-dropdown-item>
            <b-dropdown-item :href="nicomenu[4]">
              <i class="nico-contents-tree"></i>コンテンツツリー
            </b-dropdown-item> -->
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </header>
    <div class="analitics">
      <div class="countdata">
        <div class="youtube">
          <div class="head">
            <h3>
              <font-awesome-icon :icon="['fab', 'youtube']" />
              YouTube
            </h3>
            <p></p>
          </div>
        </div>
        <div class="nico">
          <div class="head">
            <h3><i class="nico-tvchan"></i> ニコニコ動画</h3>
            <p>{{ nico_thumbdata.video_id[0] }}</p>
          </div>

          <div class="countbox">
            <div class="countbox_number playcount">
              <div class="head">
                <i class="nico-play"></i>
                再生数
              </div>
              <div class="body">
                {{ nico_thumbdata.view_counter[0] }}
              </div>
            </div>
            <div class="countbox_number commentcount">
              <div class="head">
                <i class="nico-comment"></i>
                コメント数
              </div>
              <div class="body">
                {{ nico_thumbdata.comment_num[0] }}
              </div>
            </div>
            <div class="countbox_number mylistcount">
              <div class="head">
                <i class="nico-mylist"></i>
                マイリスト数
              </div>
              <div class="body">
                {{ nico_thumbdata.mylist_counter[0] }}
              </div>
            </div>
            <div class="countbox_number likecount">
              <div class="head">
                <i class="nico-like"></i>
                いいね！数
              </div>
              <div class="body">
                <!-- {{ nico_thumbdata.mylist_counter[0] }} -->
              </div>
            </div>
            <div class="countbox_number adspoint">
              <div class="head">
                <i class="nico-nicoad"></i>
                ニコニ広告
              </div>
              <div class="body">
                {{ nico_adsdata }}
              </div>
            </div>
            <div class="countbox_number giftpoint">
              <div class="head">
                <i class="nico-gift"></i>
                ギフト
              </div>
              <div class="body">
                {{ nico_giftdata }}
              </div>
            </div>
          </div>
          <div class="playcount">{{ nico_thumbdata }}</div>
        </div>
      </div>
      <!-- todo なかみかんがえる -->
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }, callback) {
    let nicoid = params.id;

    //ギフトポイント取得
    let nico_giftdata = await $axios.$get(
      `https://api.nicoad.nicovideo.jp/v1/contents/nage_video/${nicoid}/totalGiftPoint`
    );

    //広告ポイント取得
    let nico_adsdata = await $axios.$get(
      `https://api.nicoad.nicovideo.jp/v1/contents/video/${nicoid}`
    );

    // nicovideo gethumbinfo
    await $axios
      .$get(`https://ext.nicovideo.jp/api/getthumbinfo/${nicoid}`)
      .then((res) => {
        var parseString = require("xml2js").parseString;
        var xml = res;

        parseString(xml, (message, xmlres) => {
          callback(null, {
            nico_adsdata: nico_adsdata.data.totalPoint,
            nico_giftdata: nico_giftdata.data.totalPoint,
            nico_thumbdata: xmlres.nicovideo_thumb_response.thumb[0],
          });
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.p_analitics_desc {
  background-color: #fafafa;
  header {
    background-color: white;
    border-bottom: 1px solid #ccc;

    .thumbnail {
      width: 100px;
      margin-right: 1rem;

      img {
        width: 100%;
        height: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 5px;
      }
    }

    .descmenu i {
      margin: 0 0.25rem;
    }
  }

  .analitics {
    margin: 1rem;

    .countdata {
      display: flex;

      .nico {
        padding: 1rem;
        width: 50%;
        margin: 0.5rem;
        background-color: white;
      }
      .youtube {
        padding: 1rem;
        width: 50%;
        margin: 0.5rem;
        background-color: white;
      }

      .nico > .head,
      .youtube > .head {
        display: flex;
        justify-content: space-between;

        h3 {
          font-size: 1.25rem;
          font-weight: bold;
        }
        p{
          font-size: 90%;
          color: #999;
        }
      }

      .countbox {
        display: flex;
        flex-wrap: wrap;

        .countbox_number {
          border-left: 4px solid rgb(238, 238, 238);
          padding: 8px 16px;
          width: calc(100% / 4);

          .head {
            font-size: 14px;
            color: #999;
            svg {
              margin-right: 0.5rem;
            }
            i {
              margin-right: 0.25rem;
            }
          }
        }
      }
    }
  }
}
</style>
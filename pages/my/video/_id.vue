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
            <b-dropdown-item
              :href="
                'https://www.upload.nicovideo.jp/garage/analytics/videos/' +
                nico_thumbdata.video_id[0]
              "
            >
              <i class="nico-tvplay"></i>ニコニコ動画 ガレージ
            </b-dropdown-item>
            <b-dropdown-item
              :href="
                'https://nicoad.nicovideo.jp/video/publish/' +
                nico_thumbdata.video_id[0] +
                '?frontend_id=6&frontend_version=0'
              "
            >
              <i class="nico-nicoad"></i>動画を広告する
            </b-dropdown-item>
            <b-dropdown-item
              :href="
                'https://koken.nicovideo.jp/creator/contents/video/' +
                nico_thumbdata.video_id[0]
              "
            >
              <i class="nico-koken"></i>ニコニ貢献
            </b-dropdown-item>
            <b-dropdown-item
              :href="
                'https://commons.nicovideo.jp/cpp/application/?site_id=nicovideo&creation_id=' +
                nico_thumbdata.video_id[0]
              "
            >
              <i class="nico-cps"></i>クリエイター奨励プログラム
            </b-dropdown-item>
            <b-dropdown-item
              :href="
                'https://commons.nicovideo.jp/tree/' +
                nico_thumbdata.video_id[0]
              "
            >
              <i class="nico-contents-tree"></i>コンテンツツリー
            </b-dropdown-item>
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
          {{nicohtml}}
        </div>
        <div class="nico">
          <div class="head">
            <h3><i class="nico-tvchan"></i> ニコニコ動画</h3>
            <p>{{ nico_thumbdata.video_id[0] }}</p>
          </div>
          <div class="iframearea">
            <iframe
              :src="
                'https://embed.nicovideo.jp/watch/' + nico_thumbdata.video_id[0]
              "
            ></iframe>
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
              <div class="body">undefined</div>
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

          <div class="tagbox">
            <div class="tagbox_body genre">
              <div class="head">
                <i class="nico-series"></i>
                ジャンル
              </div>
              <div class="body">
                {{ nico_thumbdata.genre[0] }}
              </div>
            </div>
            <div class="tagbox_body genre">
              <div class="head">
                <i class="nico-dic_hyaku"></i>
                タグ
              </div>
              <div class="body">
                <span class="nicotag" v-for="tag in nico_thumbdata.tags[0].tag" :key="tag">
                  <a class="taglink" :href="'https://www.nicovideo.jp/tag/'+tag['_']" target="_blank" rel="noopener noreferrer" v-if="tag['_']">
                    <span>{{ tag['_'] }}</span>
                  </a>
                  <a class="taglink" :href="'https://www.nicovideo.jp/tag/'+tag" target="_blank" rel="noopener noreferrer" v-if="!tag['_']">
                    <span>{{ tag }}</span>
                  </a>
                  <div class="pedia">
                    <a class="hyaku" :href="'https://dic.nicovideo.jp/a/'+tag['_']" target="_blank" rel="noopener noreferrer" v-if="tag['_']">
                      <i class="nico-dic_hyaku"></i>
                    </a>
                    <a class="hyaku" :href="'https://dic.nicovideo.jp/a/'+tag" target="_blank" rel="noopener noreferrer" v-if="!tag['_']">
                      <i class="nico-dic_hyaku"></i>
                    </a>
                  </div>

                </span>
              </div>
            </div>
          </div>

          <div class="playcount">{{ nico_thumbdata }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  async asyncData({ $axios, params }) {
    const parseString = require("xml2js").parseString;

    let nicoid = params.id;

    let [nico_giftdata, nico_adsdata, nico_thumbdata, nicohtml] = await Promise.all([
      $axios.$get(`/api_nicoad/nage_video/${nicoid}/totalGiftPoint`),
      $axios.$get(`/api_nicoad/video/${nicoid}`),
      $axios.$get(`/api_extnico/getthumbinfo/${nicoid}`),
    ]);

    var xml = nico_thumbdata;
    parseString(xml, (message, xmlres) => {
      nico_thumbdata = xmlres.nicovideo_thumb_response.thumb[0];
    });

    return {
      nico_giftdata: nico_giftdata.data.totalPoint,
      nico_adsdata: nico_adsdata.data.totalPoint,
      nico_thumbdata,
      nicohtml
    };
  },
};
</script>

<style lang="scss" scoped>
.p_analitics_desc {
  background-color: #fafafa;
  header {
    background-color: white;
    border-bottom: 1px solid #ccc;
    position: sticky;
    top: 0;
    z-index: 5;

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

  .iframearea {
    iframe {
      border: none;
      width: 100%;
      aspect-ratio: 16 / 9;
      padding: 0 1rem 0.75rem 1rem;
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
        p {
          font-size: 90%;
          color: #999;
        }
      }

      .countbox,
      .tagbox {
        display: flex;
        flex-wrap: wrap;
        margin: .5rem 0;

        .countbox_number{
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

        .tagbox_body{
          border-left: 4px solid rgb(238, 238, 238);
          padding: 8px 16px;
          width: 100%;

          .head {
            margin: 0 0 .25rem;
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

  .nicotag{
    background-color: #f4f4f4;
    border-radius: 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
    margin: 0 8px 8px 0;
    padding: 0 4px;
    position: relative;
    vertical-align: top;

    .taglink{
      display: block;
      padding: 0 4px 0 8px;
    }

    .hyaku{
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #8c0000;
      border: 0;
      border-radius: 50%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      cursor: pointer;
      height: 16px;
      margin: 4px;
      padding: 3px;
      position: relative;
      width: 16px;
      font-size: 10px;

      i{
        color: #fff;
        height: 100%;
        vertical-align: top;
        width: 100%;
        fill-rule: evenodd;
        clip-rule: evenodd;
        stroke-linejoin: round;
        stroke-miterlimit: 1.41421;
      }
    }
  }
}
</style>
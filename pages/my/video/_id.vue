<template>
  <div class="p_analitics_desc">
    <header>
      <b-navbar toggleable="lg">
        <div class="thumbnail">
          <img
            src="https://nicovideo.cdn.nimg.jp/thumbnails/39792406/39792406.32288273.M"
            alt=""
            srcset=""
          />
        </div>
        <b-navbar-brand>帝国少女 / 結月ゆかり (Cover)</b-navbar-brand>

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
            <b-dropdown-item href="#">
              <i class="nico-tvplay"></i>ニコニコ動画 ガレージ
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <i class="nico-koken"></i>ニコニ貢献
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <i class="nico-cps"></i>クリエイター奨励プログラム
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <i class="nico-contents-tree"></i>コンテンツツリー
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </header>
    <div class="analitics">
      <!-- todo なかみかんがえる -->
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.p_analitics_desc {
  header {
    border-bottom: 1px solid #ccc;

    .thumbnail {
      width: 100px;
      margin-right: 1rem;

      img {
        width: 100%;
        height: 100%;
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

    h3 {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }
}
</style>
<template>
  <header class="g_header">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand to="/">
        <svg class="header_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259.87 94.64"><defs><style>.cls-1{fill:none;stroke:#231815;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px;}.cls-2{font-size:54.2px;font-family:RoundedMplus1c-ExtraBold, "Rounded Mplus 1c";font-weight:800;}</style></defs><g id="レイヤー_2" data-name="レイヤー 2"><g id="レイヤー_1-2" data-name="レイヤー 1"><line class="cls-1" x1="18.44" y1="5" x2="18.44" y2="89.64"/><line class="cls-1" x1="5" y1="73.16" x2="254.87" y2="73.16"/><text class="cls-2" transform="translate(28.36 58.27)">くろぷら</text></g></g></svg>
      </b-navbar-brand>

      
      <b-navbar-nav>
        <b-nav-item to="/my">動画一覧</b-nav-item>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="!user" text="ログインしていません" right>
            <b-dropdown-item to="/auth/login">ログイン</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown v-if="user" :text="user.displayName" right>
            <b-dropdown-item to="/my/settings">設定</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item to="/auth/logout">ログアウト</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="infoarea">
      <p>DEMOモードで実行中です</p>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
};
</script>

<style lang="scss" scoped>
.g_header{
  background-color: #7f7fff;

  .header_logo{
    fill: white;
    width: 100px;
    *{
      fill: white;
      stroke: white;
    }
  }

  .infoarea{
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffbf7f;
    font-weight: bold;

    p{
      margin: 0;
    }
  }
}
</style>
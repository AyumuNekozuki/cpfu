<template>
  <header class="g_header">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">くろすぷらっとふぉーむあなりてぃくす</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="!user.displayName" text="Guest" right>
            <b-dropdown-item href="/auth/login">ログイン</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown v-if="user.displayName" :text="user.displayName" right>
            <b-dropdown-item href="/my">動画一覧</b-dropdown-item>
            <b-dropdown-item href="/my">設定</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="/auth/logout">ログアウト</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
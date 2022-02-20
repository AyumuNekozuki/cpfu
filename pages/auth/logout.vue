<template>
  <div class="logout">
    <h2>ログアウトしますか？</h2>

    <b-button variant="danger" @click="logout()">ログアウトする</b-button>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    logout(){
      this.$fire.auth.signOut();
    }
  }
};
</script>

<style lang="scss" scoped>
.logout{
  margin: 1rem;
  min-height: calc(100vh - 185px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2{
  margin: 2rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  text-align: center;
}


</style>
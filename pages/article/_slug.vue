<template>
  <div class="article">
    <h2 class="title">{{ article.title }}</h2>
    <div class="body" v-html="article.body"></div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    let article = await $axios.$get(
      `/api_microcms/v1/article/${params.slug}?limit=0`
    );

    return {
      article,
    };
  },
};
</script>

<style lang="scss" scoped>
.article{
  margin: 1rem auto;
  padding: 1rem;
  box-shadow: 0 0 3px #7f7fff;
  border-radius: 10px;
  width: 100%;
  max-width: 960px;

  h2.title{
    font-weight: bold;
    font-family: "M PLUS Rounded 1c", sans-serif;
    border-bottom: 2px solid #7f7fff;
  }
  .body{
    margin-top: 1rem;
    font-family: "M PLUS Rounded 1c", sans-serif;
    h2,h3,h4,h5{
      font-size: 80%;
    }
  }
}
</style>
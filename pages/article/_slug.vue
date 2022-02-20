<template>
  <div class="articlewrap">
    <div class="article">
      <h2 class="title">{{ article.title }}</h2>
      <div class="body" v-html="article.body"></div>
    </div>
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
.articlewrap{
  padding: 2rem;
  background: repeating-linear-gradient(90deg,#7F7FFF33,#7F7FFF33 1px,transparent 0,transparent 20px),repeating-linear-gradient(0deg,#7F7FFF33,#7F7FFF33 1px,#fff 0,#fff 20px);
  min-height: calc(100vh - 155px);
}

.article {
  background: white;
  margin: auto;
  padding: 1rem;
  line-height: 1.8;
  box-shadow: 0 0 3px #7f7fff;
  border-radius: 10px;
  width: 100%;
  max-width: 960px;

  h2.title {
    font-weight: bold;
    font-family: "M PLUS Rounded 1c", sans-serif;
    border-bottom: 2px solid #7f7fff;
  }
  .body {
    margin-top: 1rem;
    font-family: "M PLUS Rounded 1c", sans-serif;
    h2,
    h3,
    h4,
    h5 {
      font-size: 80%;
    }
  }
}
</style>
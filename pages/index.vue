<template>
  <div id="indextop">
    <div class="mainvisual">
      <div class="bg"></div>
    </div>
    <div class="news">
      <h2>NEWS</h2>
      <nuxt-link :to="'/article/'+article.id" v-for="article in articledata.contents" :key="article">
        <span>{{ $dateFns.format(new Date(article.updatedAt), 'yyyy/MM/dd') }}</span>
        <p>{{ article.title }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }){
    let [articledata] = await Promise.all([
      $axios.$get(`/api_microcms/v1/article?filters=category%5Bequals%5Dcropura&orders=updatedAt`)
    ]);

    return {
      articledata
    }
  }
}
</script>

<style lang="scss" scoped>
#indextop{
  margin: 0;
  padding: 1.5rem;
  min-height: calc(100vh - 155px);

  background: repeating-linear-gradient(90deg,#7F7FFF33,#7F7FFF33 1px,transparent 0,transparent 20px),repeating-linear-gradient(0deg,#7F7FFF33,#7F7FFF33 1px,#fff 0,#fff 20px);

  .mainvisual{
    margin: 0 auto;
    max-width: 960px;
    width: 100%;
    height: 400px;
    .bg{
      width: 100%;
      height: 100%;
      background-image: url(~/assets/img/bg.png);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  .news{
    background: white;
    border: #7F7FFF 5px solid;
    border-radius: 10px;
    margin: 2rem auto;
    padding: 1rem;
    max-width: 960px;

    h2{
      font-weight: 800;
      font-family: "M PLUS Rounded 1c", sans-serif;
      border-bottom: 2px solid #7F7FFF;
      padding: 0 .5rem;
    }

    a{
      display: flex;
      margin: 1rem 0 .5rem;
      padding: 0 .5rem;
      color: black;
      transition: color ease .1s;

      span{
        color: #333;
        margin-right: .5rem;
      }
      p{
        font-weight: bold;
        margin: 0;
      }

      &:hover{
        text-decoration: none;
        color: #0080ff;
      }
    }
  }
}
</style>
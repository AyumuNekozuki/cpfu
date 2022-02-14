<template>
  <div>
    <div class="mainvisual">
      <!-- todo -->
    </div>
    <div class="news">
      <!-- <nuxt-link :to="'/article/'+article.id" v-for="article in articledata.contents" :key="article">
        <span>{{ $dateFns.format(new Date(article.updatedAt), 'yyyy/MM/dd') }}</span>
        <p>{{ article.title }}</p>
      </nuxt-link> -->
    </div>
  </div>
</template>

<script>
export default {
  // async asyncData({ $axios }){
  //   let [articledata] = await Promise.all([
  //     $axios.$get(`/api_microcms/v1/article?filters=category%5Bequals%5Dcropura&orders=updatedAt`)
  //   ]);

  //   return {
  //     articledata
  //   }
  // }
}
</script>
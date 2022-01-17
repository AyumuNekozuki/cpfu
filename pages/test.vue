<template>
  <div>
    {{data}}
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }){
    let data = await $axios.$get("");

    return data;
  }
}
</script>
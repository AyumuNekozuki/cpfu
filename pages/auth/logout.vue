<template>
  <h2>TODO ろぐあうと</h2>
</template>

<script>
export default {
  asyncData({ $fire }) {
    $fire.auth.signOut();
  },
};
</script>
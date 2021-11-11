<template>
  <article>
    <h3>{{ post.City }}</h3>
    <p>{{post.State}}</p>
  </article>
</template>
<script>
export default {
  props: ["post"]
};
</script>
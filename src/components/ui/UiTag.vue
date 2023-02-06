<template>
  <span class="tag">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.tag {
  width: fit-content;
  display: inline-block;
  padding: .2rem .3rem;
  font-size: 12px;
  font-weight: 700;
  background-color: $light-green;
  color: $text-brown;
}
</style>

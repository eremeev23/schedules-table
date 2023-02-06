<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";

interface IProps {
  icon: string;
}

const props = defineProps<IProps>();

const IconComponent = defineAsyncComponent(
    () => import('../../assets/icons/' + props.icon + '.svg')
);
</script>

<template>
  <i>
    <IconComponent />
  </i>
</template>

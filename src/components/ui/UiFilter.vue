<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";

interface IProps {
  tabs: []
}
const props = defineProps<IProps>();

const { activeTab } = storeToRefs(useDataStore());
const { setActiveTab } = useDataStore();
const clickHandler = (value: string) => {
  setActiveTab(value);
}

const lineStyles = reactive({
  left: 0,
  width: 100
})
const buttons = ref<HTMLElement[]>([]);
const filter = ref<HTMLElement>();

onMounted(() => {
  const activeButton = buttons.value[0];
  lineStyles.width = activeButton.offsetWidth;
})
watch(
  () => activeTab.value,
  (newVal) => {
    const activeButton = buttons.value.find(btn => btn.id === newVal);
    //@ts-ignore
    const { width, left } = activeButton.getBoundingClientRect();
    const filterLeft = filter.value?.getBoundingClientRect().left;
    lineStyles.width = width;
    //@ts-ignore
    lineStyles.left = left - filterLeft;
  }
)
</script>
<template>
  <div class="filter" ref="filter">
    <div class="filter__inner-wrapper">
      <button
        ref="buttons"
        v-for="tab in tabs"
        :key="tab.value"
        :class="activeTab === tab.value ? 'filter__button active' : 'filter__button'"
        :id="tab.value"
        @click="clickHandler(tab.value)"
      >
        {{ tab.title }} ({{ tab.quantity }})
      </button>
      <div
        class="line"
        :style="{left: `${lineStyles.left}px`, width: `${lineStyles.width}px`}"
      ></div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.filter {
  border-bottom: 2px solid $border;

  &__inner-wrapper {
    position: relative;
    display: flex;
    gap: 1rem;

    .line {
      position: absolute;
      left: 0;
      bottom: -1px;
      height: 3px;
      width: 120px;
      border-radius: 60px;
      background-color: $light-text;
      transition: left .3s ease-in, width .3s ease-in;
    }
  }

  &__button {
    padding: .6rem 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: $gray;
    transition: color .3s ease-in-out;

    &.active {
      color: $light-text;
    }
  }
}
</style>

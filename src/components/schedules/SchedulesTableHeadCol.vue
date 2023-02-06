<script lang="ts" setup>
import { ref, watch } from "vue";
import {useDataStore} from "@/stores/data";

interface IProps {
  value: string,
  active: boolean
}

const props = defineProps<IProps>();
const emits = defineEmits(['sort']);

const { sortData } = useDataStore();
const sortDirection = ref<boolean>(true);
const sortHandler = (value: string) => {
  sortDirection.value = !sortDirection.value;
  emits('sort', props.value);
  sortData(value, sortDirection.value);
};
</script>

<template>
  <th class="schedules-table__col head-col">
    <button
      class="head-col__button"
      :class="{ active: active }"
      @click="sortHandler(value)"
    >
      <span class="head-col__title">
        <slot />
      </span>
      <span class="head-col__arrows">
        <svg :class="{ active: active && sortDirection }" width="9" height="4" viewBox="0 0 9 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 0L9 4H0L4.5 0Z" fill="currentColor"/>
        </svg>
        <svg :class="{ active: active && !sortDirection }" width="9" height="4" viewBox="0 0 9 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 0L9 4H0L4.5 0Z" fill="currentColor"/>
        </svg>
      </span>
    </button>
  </th>
</template>


<style lang="scss" scoped>
.head-col {
  &__arrows {
    display: flex;
    flex-direction: column;
    gap: 1px;

    svg {
      &:nth-child(2) {
        transform: rotate(180deg);
      }

      &.active {
        color: $purple;
      }
    }
  }

  &__button {
    display: flex;
    align-items: center;
    gap: 4px;
    text-transform: uppercase;
    font-weight: 600;
    color: lighten($gray, 10%);
    font-size: 15px;
    transition: color .2s ease-in-out;

    &.active {
      .head-col__title {
        color: $purple;
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { computed } from "vue";

interface IProps {
  input: {
    type: string;
    icon: string;
    id: string;
    modelValue: string;
    placeholder: string;
    label?: string;
  }
}

const props = defineProps<IProps>();
const emits = defineEmits(['update:modelValue']);

const inputValue = computed({
  get: () => props.input.modelValue,
  set: (value) => {
    emits('update:modelValue', value);
  }
})
</script>

<template>
  <div class="input-block">
    <i v-if="input.type === 'search'" class="input-block__icon">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.1667 7.33333C12.1667 10.0027 10.0027 12.1667 7.33333 12.1667C4.66396 12.1667 2.5 10.0027 2.5 7.33333C2.5 4.66396 4.66396 2.5 7.33333 2.5C10.0027 2.5 12.1667 4.66396 12.1667 7.33333Z" stroke="#AEB1C0" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 14.0001L11.1 11.1001" stroke="#AEB1C0" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </i>

    <input
      v-model="inputValue"
      class="input-block__input"
      :class="{ search: input.type === 'search' }"
      :type="input.type"
      :id="input.id"
      :name="input.id"
      :placeholder="input.placeholder"
    >
  </div>
</template>


<style lang="scss" scoped>
.input-block {
  position: relative;

  &__icon {
    position: absolute;
    top: 50%;
    left: 6px;
    transform: translateY(-50%);
    height: 16px;
  }

  &__input {
    width: 230px;
    padding: .4rem;
    font-size: 16px;
    font-weight: 500;
    border: 2px solid $border;
    border-radius: .25rem;

    &.search {
      padding-left: 1.5rem;
    }

    &::placeholder {
      color: $gray;
    }
  }
}
</style>

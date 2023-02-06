<script lang="ts" setup>
import { computed } from "vue";
import { useDate } from "@/composables/useDate";
import { useRecipients } from "@/composables/useRecipients";
import { useCreatorInitials } from "@/composables/useCreatorInitials";
import type { Schedule } from "@/types";
import UiTag from "@/components/ui/UiTag.vue";
import {useDataStore} from "@/stores/data";

interface IProps {
  row: Schedule,
  index: number
}
const props = defineProps<IProps>();

const maskedDate = computed(() => useDate(props.row.next_delivery));
const recipientsList = computed(() => useRecipients(props.row.recipients));
const creatorInitials = computed(() => useCreatorInitials(props.row.creator.name));

const { removeSchedule } = useDataStore();
</script>

<template>
<tr class="schedules-table__row">
  <td class="schedules-table__col">{{ row.title }}</td>
  <td class="schedules-table__col">
    <ui-tag class="creator-tag">
      {{ creatorInitials }}
    </ui-tag>
    <span>{{ row.creator.name }}</span>
  </td>
  <td class="schedules-table__col schedules-table__col_list">
    {{ recipientsList }}
  </td>
  <td class="schedules-table__col schedules-table__col_interval">
    <ui-tag>
      {{ row.interval }}
    </ui-tag>
  </td>
  <td class="schedules-table__col">{{ maskedDate }}</td>
  <td class="schedules-table__col">
    0

    <button
      @click="removeSchedule(index)"
      class="remove-button"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="2.12132" y1="2" x2="11.3137" y2="11.1924" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="2" y1="11.1924" x2="11.1924" y2="2.00001" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </td>
</tr>
</template>


<style lang="scss" scoped>
.schedules-table {
  &__col {
    &_list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    &-span {
      display: block;
    }
  }
}

.creator-tag {
  padding: .1rem .3rem;
  margin-right: 7px;
  background-color: $light-purple;
  color: $purple;
}

.remove-button {
  position: absolute;
  right: 20px;
  top: 50%;
  width: 1.6rem;
  height: 1.6rem;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: $red;
  background-color: $light-red;
  border: 1px solid $red;
  border-radius: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s ease-in-out;
}

.schedules-table__row:hover .remove-button {
  opacity: 1;
  pointer-events: all;
}
</style>

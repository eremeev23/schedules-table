<script lang="ts" setup>
import { computed } from "vue";
import { useDate } from "@/composables/useDate";
import { useRecipients } from "@/composables/useRecipients";
import { useCreatorInitials } from "@/composables/useCreatorInitials";
import type { Schedule } from "@/types";
import UiTag from "@/components/ui/UiTag.vue";

interface IProps {
  row: Schedule
}
const props = defineProps<IProps>();

const maskedDate = computed(() => useDate(props.row.next_delivery));
const recipientsList = computed(() => useRecipients(props.row.recipients));
const creatorInitials = computed(() => useCreatorInitials(props.row.creator.name))
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
  <td class="schedules-table__col">0</td>
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
</style>

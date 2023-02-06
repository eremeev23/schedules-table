<script lang="ts" setup>
import { ref } from "vue";
import type { Schedule } from "@/types";
import SchedulesTableRow from "@/components/schedules/SchedulesTableRow.vue";
import SchedulesTableHeadCol from "@/components/schedules/SchedulesTableHeadCol.vue";

interface IProps {
  tableData: Schedule[];
}

const props = defineProps<IProps>();
const sortCol = ref('');
</script>

<template>
  <table class="schedules-table">
    <thead>
      <tr class="schedules-table__row schedules-table__row_head">
        <schedules-table-head-col
          value="title"
          :active="sortCol === 'title'"
          @sort="sortCol = $event"
        >
          Title
        </schedules-table-head-col>
        <schedules-table-head-col
          value="creator"
          :active="sortCol === 'creator'"
          @sort="sortCol = $event"
        >
          Creator
        </schedules-table-head-col>
        <schedules-table-head-col
          value="recipients"
          :active="sortCol === 'recipients'"
          @sort="sortCol = $event"
        >
          Recipients
        </schedules-table-head-col>
        <schedules-table-head-col
          value="interval"
          :active="sortCol === 'interval'"
          @sort="sortCol = $event"
        >
          Interval
        </schedules-table-head-col>
        <schedules-table-head-col
          value="delivery"
          :active="sortCol === 'delivery'"
          @sort="sortCol = $event"
        >
          Next delivery
        </schedules-table-head-col>
        <schedules-table-head-col
          value="feedbacks"
          :active="sortCol === 'feedbacks'"
          @sort="sortCol = $event"
        >
          Feedback count
        </schedules-table-head-col>
      </tr>
    </thead>
    <tbody>
      <SchedulesTableRow
        v-for="(row, i) in tableData"
        :key="i"
        :row="row"
      />
    </tbody>
  </table>
</template>


<style lang="scss">
.schedules-table {
  width: 100%;
  font-weight: 600;
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;

  &__row {
    border-bottom: 2px solid $border;

    &:nth-child(even) {
      background-color: #fff;
    }

    &_head {
      background-color: #F7F8FB;
    }
  }

  &__col {
    padding: 20px;
    text-align: left;
  }
}
</style>

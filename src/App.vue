<script setup lang="ts">
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import UiInput from "@/components/ui/UiInput.vue";
import UiFilter from "@/components/ui/UiFilter.vue";
import SchedulesTable from "@/components/schedules/SchedulesTable.vue";

const { tabs, hashTable, filteredData } = storeToRefs(useDataStore());
const { getDataFromApi, setActiveTab, searchData } = useDataStore();
getDataFromApi();

const data = reactive({
  searchInput: {
    type: 'search',
    icon: 'search-icon',
    id: 'searchbar',
    modelValue: '',
    placeholder: 'Search',
  }
})
</script>

<template>
  <header class="header">
    <div class="container">
      <a class="header__link" href="#">
        HEADER
      </a>
    </div>
  </header>

  <main class="container main-page">
    <section class="main-page__header page-section">
      <h1 class="main-page__title page-title">
        Summaries and notifications
      </h1>
      <UiInput
        :input="data.searchInput"
        @update:modelValue="searchData($event)"
      />
    </section>
    <section v-if="hashTable" class="page-section">
      <UiFilter v-if="tabs.length" :tabs="tabs" />
      <SchedulesTable :table-data="filteredData" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.header {
  padding: 1rem 0;
  border-bottom: 2px solid $gray;

  &__link {
    font-size: 1.4rem;
    font-weight: 600;
    color: $light-text;
    transition: text-shadow .3s ease-in-out;

    &:hover {
      text-shadow: 0 0 8px lighten($light-text, 20%);
    }
  }
}

.main-page {
  padding: 2.5rem 0 4rem;

  &__header {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

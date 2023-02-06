import { defineStore } from 'pinia';
import axios from 'axios';
import type { HashTable, Schedule, Tab } from '@/types';

interface IState {
  tabs: Tab[];
  hashTable: HashTable;
  error: boolean;
  activeTabData: Schedule[];
  filteredData: Schedule[] | null;
  activeTab: string;
}

export const useDataStore = defineStore('data', {
  state: (): IState => ({
    tabs: [],
    hashTable: {},
    error: false,
    activeTabData: [],
    filteredData: null,
    activeTab: '',
  }),

  actions: {
    async getDataFromApi(phrase?: string, direction?: boolean) {
      try {
        axios
          .get('/api/mock-schedules.json', {
            params: {
              phrase,
              direction
            }
          })
          .then(({ data }) => {
            // Error reset
            this.error = false;
            // Adding trigger tabs
            for (let i = 0; i < data.length; i++) {
              if (!this.tabs.some(tab => tab.value === data[i].trigger)) {
                const tab = {} as Tab;
                // Adding title and value to new tab
                switch (data[i].trigger) {
                  case 'data':
                    tab.title = 'Data triggered';
                    tab.value = data[i].trigger;
                    break;
                  case 'time':
                    tab.title = 'Time triggered';
                    tab.value = data[i].trigger;
                    break;
                  case 'one-time':
                    tab.title = 'Sent once';
                    tab.value = data[i].trigger;
                    break;
                }

                this.tabs.push(tab);
              }
            }
            // Creating hash table for the filter
            for (let i = 0; i < this.tabs.length; i++) {
              this.hashTable[this.tabs[i].value] = data.filter(
                (item: Schedule) => item.trigger === this.tabs[i].value
              );
              this.tabs[i].quantity = this.hashTable[this.tabs[i].value].length;
            }

            this.activeTabData = !!this.activeTab ? this.hashTable[this.activeTab] : this.hashTable[this.tabs[0].value];
            this.filteredData = !!this.activeTab ? this.hashTable[this.activeTab] : this.hashTable[this.tabs[0].value];
            this.activeTab = !!this.activeTab ? this.activeTab :this.tabs[0].value;
          })
      } catch (e) {
        this.error = true;
        console.log(e);
      }
    },

    setActiveTab(value: string) {
      this.activeTab = value;
      this.activeTabData = this.hashTable[value];
      this.searchData();
    },

    searchData(phrase?: string) {
      if (!!phrase) {
        this.filteredData = this.activeTabData.filter((item) => {
          return item.title.includes(phrase)
            || item.creator.name.includes(phrase)
            || item.recipients.some(recipient => recipient.includes(phrase))
        })
      } else {
        this.filteredData = this.activeTabData;
      }
    },

    sortData(value: string, direction: boolean) {
      this.getDataFromApi(value, direction);
    }
  }
})

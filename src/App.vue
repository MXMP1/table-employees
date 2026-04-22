<template>
  <div id="app">
    <h1>Сотрудники компании</h1>



    <!-- Панель управления: поиск, фильтр, кнопка очистки -->
    <ControlsPanel
      v-model:searchQuery="searchQuery"
      v-model:selectedPosition="selectedPosition"
      @clear="clearAll"
    />

    <!-- Таблица сотрудников -->
    <EmployeeTable
      :employees="employees"
      :sort-key="sortKey"
      :sort-order="sortOrder"
      :search-query="searchQuery"
      :selected-position="selectedPosition"
      @update:sortKey="sortKey = $event"
      @update:sortOrder="sortOrder = $event"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ControlsPanel from './components/ControlsPanel.vue';
import EmployeeTable from './components/EmployeeTable.vue';
import employeesData from './data/employees.json';


// Исходные данные
const employees = ref(employeesData);

// Состояние фильтрации и сортировки
const searchQuery = ref('');
const selectedPosition = ref('');
const sortKey = ref('');
const sortOrder = ref('asc');


// Метод "Очистить всё"
const clearAll = () => {
  searchQuery.value = '';
  selectedPosition.value = '';
  sortKey.value = '';
};
</script>

<style>
#app {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-color);
  background-color: var(--bg-color);
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

h1 {
  text-align: center;
  color: var(--header-color);
  margin-bottom: 20px;
}
</style>
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
import { ref } from 'vue';
import ControlsPanel from './components/ControlsPanel.vue';
import EmployeeTable from './components/EmployeeTable.vue';

// Исходные данные
const employees = ref([
  { id: 1, firstName: "Иван", lastName: "Петров", position: "Разработчик", salary: 80000 },
  { id: 2, firstName: "Мария", lastName: "Сидорова", position: "Дизайнер", salary: 65000 },
  { id: 3, firstName: "Алексей", lastName: "Иванов", position: "Менеджер", salary: 75000 },
  { id: 4, firstName: "Елена", lastName: "Козлова", position: "Разработчик", salary: 82000 },
  { id: 5, firstName: "Дмитрий", lastName: "Смирнов", position: "Аналитик", salary: 70000 },
  { id: 6, firstName: "Ольга", lastName: "Васильева", position: "Дизайнер", salary: 68000 },
  { id: 7, firstName: "Сергей", lastName: "Николаев", position: "Разработчик", salary: 90000 },
  { id: 8, firstName: "Анна", lastName: "Павлова", position: "Менеджер", salary: 78000 },
  { id: 9, firstName: "Михаил", lastName: "Федоров", position: "Аналитик", salary: 72000 },
  { id: 10, firstName: "Наталья", lastName: "Морозова", position: "Разработчик", salary: 85000 }
]);

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
  margin: 40px auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>
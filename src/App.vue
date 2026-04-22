<template>
  <div id="app">
    <h1>Сотрудники компании</h1>

    <!-- Кнопка смены темы -->
    <button @click="toggleTheme" class="theme-toggle">
      {{ isDarkTheme ? '☀️ Светлая' : '🌙 Тёмная' }} тема
    </button>

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

//импорт данных из .json файла
import employeesData from './data/employees.json'; 

// Исходные данные
const employees = ref(employeesData);

// Состояние фильтрации и сортировки
const searchQuery = ref('');
const selectedPosition = ref('');
const sortKey = ref('');
const sortOrder = ref('asc');

//Смена темы
const isDarkTheme = ref(false); // по умолчанию светлая

// При монтировании: проверяем localStorage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDarkTheme.value = true;
    document.documentElement.classList.add('dark-theme');
  }
});

// Переключение темы
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  if (isDarkTheme.value) {
    document.documentElement.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
};

// Метод "Очистить всё"
const clearAll = () => {
  searchQuery.value = '';
  selectedPosition.value = '';
  sortKey.value = '';
};
</script>

<style>
/* Светлая тема */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --header-color: #2c3e50;
  --border-color: #ddd;
  --table-header-bg: #f5f5f5;
  --table-row-hover: #f9f9f9;
  --input-border: #ccc;
  --button-bg: #f44336;
  --button-hover: #d32f2f;
}

/* Тёмная тема */
.dark-theme {
  --bg-color: #1a1a1a;
  --text-color: #e0e0e0;
  --header-color: #bbdefb;
  --border-color: #444;
  --table-header-bg: #333;
  --table-row-hover: #2d2d2d;
  --input-border: #555;
  --button-bg: #d32f2f;
  --button-hover: #b71c1c;
}

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

.theme-toggle {
  display: block;
  margin: 0 auto 20px;
  padding: 8px 16px;
  background-color: var(--button-bg);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.theme-toggle:hover {
  background-color: var(--button-hover);
}
</style>
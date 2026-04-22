<template>
  <table class="employee-table">
    <thead>
      <tr>
        <th @click="sortBy('firstName')">Имя</th>
        <th @click="sortBy('lastName')">Фамилия</th>
        <th @click="sortBy('position')">Должность</th>
        <th @click="sortBy('salary')">Зарплата</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="employee in filteredAndSortedEmployees" :key="employee.id">
        <td>{{ employee.firstName }}</td>
        <td>{{ employee.lastName }}</td>
        <td>{{ employee.position }}</td>
        <td>{{ employee.salary.toLocaleString() }} руб.</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

// Пропсы
const props = defineProps({
  employees: {
    type: Array,
    required: true
  },
  sortKey: {
    type: String,
    default: ''
  },
  sortOrder: {
    type: String,
    default: 'asc'
  },
  searchQuery: {
    type: String,
    default: ''
  },
  selectedPosition: {
    type: String,
    default: ''
  }
});

// Эмиты для обновления состояния сортировки
const emit = defineEmits(['update:sortKey', 'update:sortOrder']);

// Вычисляемое свойство: фильтрация + сортировка
const filteredAndSortedEmployees = computed(() => {
  // Фильтрация по должности и поисковому запросу
  let filtered = props.employees.filter(employee => {
    const positionMatch = !props.selectedPosition || employee.position === props.selectedPosition;
    const searchMatch = !props.searchQuery ||
      Object.values(employee).some(value =>
        String(value).toLowerCase().includes(props.searchQuery.toLowerCase())
      );
    return positionMatch && searchMatch;
  });

  // Сортировка
  if (!props.sortKey) return filtered;

  return [...filtered].sort((a, b) => {
    let aValue = a[props.sortKey];
    let bValue = b[props.sortKey];

    // Числовая сортировка (для зарплаты)
    if (typeof aValue === 'number') {
      return props.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // Текстовая сортировка
    aValue = String(aValue).toLowerCase();
    bValue = String(bValue).toLowerCase();

    if (aValue < bValue) return props.sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return props.sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
});

// Метод сортировки
const sortBy = (key) => {
  if (props.sortKey === key) {
    // Переключаем направление сортировки
    emit('update:sortOrder', props.sortOrder === 'asc' ? 'desc' : 'asc');
  } else {
    // Устанавливаем новое поле и направление по умолчанию
    emit('update:sortKey', key);
    emit('update:sortOrder', 'asc');
  }
};
</script>

<style scoped>
.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 14px;
  color: var(--text-color);
}

.employee-table th,
.employee-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.employee-table th {
  background-color: var(--table-header-bg);
  cursor: pointer;
  user-select: none;
  font-weight: 600;
  color: var(--text-color);
}

.employee-table th:hover {
  background-color: var(--table-row-hover);
}

.employee-table tbody tr:hover {
  background-color: var(--table-row-hover);
}
</style>
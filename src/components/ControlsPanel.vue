<template>
  <div class="controls">
    <!-- Используем :value и @input вместо v-model -->
    <input
      :value="searchQuery"
      @input="$emit('update:searchQuery', $event.target.value)"
      type="text"
      placeholder="Поиск по имени, фамилии или должности..."
      class="search-input"
    />
    <!-- То же самое для select -->
    <select
      :value="selectedPosition"
      @change="$emit('update:selectedPosition', $event.target.value)"
      class="filter-select"
    >
      <option value="">Все должности</option>
      <option value="Разработчик">Разработчик</option>
      <option value="Дизайнер">Дизайнер</option>
      <option value="Менеджер">Менеджер</option>
      <option value="Аналитик">Аналитик</option>
    </select>
    <button @click="clearAll">Очистить</button>
  </div>
</template>

<script setup>
defineProps({
  searchQuery: String,
  selectedPosition: String
});

const emit = defineEmits([
  'update:searchQuery',
  'update:selectedPosition',
  'clear'
]);

const clearAll = () => {
  emit('update:searchQuery', '');
  emit('update:selectedPosition', '');
  emit('clear');
};
</script>

<style scoped>
.controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.search-input,
.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  font-size: 14px;
  background-color: var(--bg-color);
  color: var(--text-color);
}

button {
  padding: 8px 16px;
  background-color: var(--button-bg);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: var(--button-hover);
}
</style>
import { ref, onMounted } from 'vue';

export function useTheme() {
  const isDarkTheme = ref(false);

  // Проверяем localStorage при загрузке
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

  return {
    isDarkTheme,
    toggleTheme
  };
}
import { ref } from 'vue';
import ReactButton from './ReactButton';

export default {
  name: 'Layout',
  components: { ReactButton },
  setup() {
    const showButton = ref(true);
    const buttonText = ref('React button');
    const clickedCount = ref(0);
    const incrementCount = () => (clickedCount.value += 1);

    return { showButton, buttonText, clickedCount, incrementCount };
  },
  template: '© IBM Storage Insights, All rights reserved.',
};

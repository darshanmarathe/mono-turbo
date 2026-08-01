import type { Preview } from '@storybook/react-vite';
import '../src/tokens.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
};

export default preview;

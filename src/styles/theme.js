export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      900: '#1e3a8a'
    },
    secondary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      900: '#164e63'
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      900: '#581c87'
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712'
    }
  },
  gradients: {
    primary: 'from-blue-500 to-purple-500',
    secondary: 'from-cyan-500 to-blue-500',
    accent: 'from-purple-500 to-pink-400',
    text: 'from-blue-400 via-purple-400 to-pink-400',
    background: 'from-gray-900 via-gray-800 to-gray-900'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

export const animations = {
  durations: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    slower: '0.8s'
  },
  easings: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  }
};

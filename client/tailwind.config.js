/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React dosyalarını taramak için gerekli
  ],
  theme: {
    extend: {}, // Varsayılan tema üzerinde özelleştirmeler yapmak için kullanılır
  },
  plugins: [], // Tailwind eklentilerini buraya ekleyebilirsiniz
};

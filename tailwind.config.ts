import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#323437",
        textColor: "#d1d0c5",
        buttonColor: "#e2b714",
        secondary: "#646669",
      },
    },
  },
  plugins: [],
} satisfies Config;

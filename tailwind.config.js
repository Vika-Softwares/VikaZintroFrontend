/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        anakiwa: "rgba(165, 243, 252, 1)",
        "athens-gray": "rgba(249, 250, 251, 1)",
        beeswax: "rgba(254, 249, 195, 1)",
        black: "rgba(0, 0, 0, 1)",
        cinderella: "rgba(254, 226, 226, 1)",
        denim: "rgba(25, 118, 210, 1)",
        "dodger-blue": "rgba(59, 130, 246, 1)",
        ebony: "rgba(17, 24, 39, 1)",
        "ebony-clay": "rgba(31, 41, 55, 1)",
        flamingo: "rgba(239, 68, 68, 1)",
        froly: "rgba(248, 113, 113, 1)",
        "gray-chateau": "rgba(156, 163, 175, 1)",
        jewel: "rgba(22, 101, 52, 1)",
        korma: "rgba(133, 77, 14, 1)",
        malibu: "rgba(125, 211, 252, 1)",
        mischka: "rgba(209, 213, 219, 1)",
        "mountain-meadow": "rgba(34, 197, 94, 1)",
        "old-brick": "rgba(153, 27, 27, 1)",
        "pale-sky": "rgba(107, 114, 128, 1)",
        "pattens-blue": "rgba(219, 234, 254, 1)",
        "picton-blue": "rgba(66, 153, 225, 1)",
        "river-bed": "rgba(75, 85, 99, 1)",
        "royal-blue": "rgba(37, 99, 235, 1)",
        scandal: "rgba(219, 234, 254, 1)",
        white: "rgba(255, 255, 255, 1)",
        "white-athens-gray": "rgba(255, 255, 255, 1)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
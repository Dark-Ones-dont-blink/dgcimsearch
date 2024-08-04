import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)"],
        anton: ["var(--font-anton)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        theme: {
          primary: "#C50003",

          secondary: "#ffffff",

          accent: "#ffffff",

          neutral: "#ffffff",

          "base-100": "#000000",

          info: "#0000ff",

          success: "#008000",

          warning: "#ffff00",

          error: "#ff0000",

          "--rounded-box": "0", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0", // border radius rounded-badge utility class, used in badges and similar
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

export default config;

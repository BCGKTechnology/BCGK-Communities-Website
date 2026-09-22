/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.html"],
  safelist: [
    { pattern: /^(bg|text|border)-(brand-green|brand-greenDeep|brand-greenDeeper|brand-greenTint)$/ },
  ],
  theme: {
    extend: {
      colors: {
        ink: "#001E2B",
        brand: {
          green: "#12EB7F",
          greenDeep: "#0B914E",
          greenDeeper: "#086939",
          greenTint: "#E2FCEF",
        },
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          400: "#888888",
          500: "#666666",
          700: "#333333",
          900: "#0D0D0D",
        },
      },
      fontFamily: {
        sans: ["Figtree", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        serif: ['"Fraunces"', "Georgia", "ui-serif", "serif"],
        mono: ['"Source Code Pro"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: { xl2: "24px" },
      boxShadow: {
        card: "0 2px 4px rgba(0,30,43,0.05)",
        btn: "0 1px 2px rgba(0,30,43,0.08)",
        forest: "0 26px 44px rgba(0,30,43,0.12), 0 7px 13px rgba(0,0,0,0.13)",
      },
      maxWidth: { site: "1200px" },
    },
  },
  plugins: [],
};

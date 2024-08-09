# prettier.config.cjs 
- prettier.config.cjs not used 🚒

 `module.exports = {
  tailwindConfig: "./tailwind.config.cjs",
  plugins: [require("prettier-plugin-tailwindcss")],
};`

# jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
    },
  },
}

# hacer componente de alerta global con redux (?)
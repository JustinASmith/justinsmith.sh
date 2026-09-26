import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: [".next/**", ".contentlayer/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default config;

import { Config } from "tailwindcss";
import nextUIConfig from "@repo/tailwind-config";

/** @type {import('tailwindcss').Config} */
const config: Partial<Config> = {
	presets: [nextUIConfig as Config],
};

export default config;
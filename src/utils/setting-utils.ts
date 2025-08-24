import {
	AUTO_MODE,
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
} from "@constants/constants";
import { expressiveCodeConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";

export function getDefaultHue(): number {
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback);
}

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored) : getDefaultHue();
}

export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	// 添加防闪烁类，禁用所有过渡
	document.documentElement.classList.add('theme-changing');
	
	// 使用 requestAnimationFrame 确保 DOM 更新的时序
	requestAnimationFrame(() => {
		switch (theme) {
			case LIGHT_MODE:
				document.documentElement.classList.remove("dark");
				break;
			case DARK_MODE:
				document.documentElement.classList.add("dark");
				break;
			case AUTO_MODE:
				if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
				break;
		}

		// Set the theme for Expressive Code
		document.documentElement.setAttribute(
			"data-theme",
			expressiveCodeConfig.theme,
		);
		
		// 在下一帧移除防闪烁类，恢复过渡效果
		requestAnimationFrame(() => {
			document.documentElement.classList.remove('theme-changing');
		});
	});
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);
	applyThemeToDocument(theme);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (localStorage.getItem("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}

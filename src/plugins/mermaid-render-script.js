(() => {
	// 单例模式：检查是否已经初始化过
	if (window.mermaidInitialized) {
		return;
	}

	window.mermaidInitialized = true;

	// 记录当前主题状态，避免不必要的重新渲染
	let currentTheme = null;
	let isRendering = false; // 防止并发渲染

	// 检查主题是否真的发生了变化
	function hasThemeChanged() {
		const isDark = document.documentElement.classList.contains("dark");
		const newTheme = isDark ? "dark" : "default";

		if (currentTheme !== newTheme) {
			currentTheme = newTheme;
			return true;
		}
		return false;
	}

	// 设置 MutationObserver 监听 html 元素的 class 属性变化
	function setupMutationObserver() {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "class"
				) {
					// 检查是否是 dark 类的变化
					const target = mutation.target;
					const wasDark = mutation.oldValue
						? mutation.oldValue.includes("dark")
						: false;
					const isDark = target.classList.contains("dark");

					if (wasDark !== isDark) {
						if (hasThemeChanged()) {
							renderMermaidDiagrams();
						}
					}
				}
			});
		});

		// 开始观察 html 元素的 class 属性变化
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
			attributeOldValue: true,
		});
	}

	// 设置其他事件监听器
	function setupEventListeners() {
		// 监听页面切换
		document.addEventListener("astro:page-load", () => {
			// 重新初始化主题状态
			currentTheme = null;
			if (hasThemeChanged()) {
				renderMermaidDiagrams();
			}
		});
	}

	function initializeMermaid() {
		if (window.mermaid && typeof window.mermaid.initialize === "function") {
			// 初始化 Mermaid 配置
			window.mermaid.initialize({
				startOnLoad: false,
				theme: "default",
				themeVariables: {
					fontFamily: "inherit",
					fontSize: "16px",
				},
				securityLevel: "loose",
			});

			// 渲染所有 Mermaid 图表
			renderMermaidDiagrams();
		}
	}

	function renderMermaidDiagrams() {
		// 防止并发渲染
		if (isRendering) {
			return;
		}

		isRendering = true;

		const mermaidElements = document.querySelectorAll(
			".mermaid[data-mermaid-code]",
		);

		// 延迟检测主题，确保 DOM 已经更新
		setTimeout(() => {
			const htmlElement = document.documentElement;
			const isDark = htmlElement.classList.contains("dark");
			const theme = isDark ? "dark" : "default";

			// 更新 Mermaid 主题（只需要更新一次）
			window.mermaid.initialize({
				startOnLoad: false,
				theme: theme,
				themeVariables: {
					fontFamily: "inherit",
					fontSize: "16px",
					// 强制应用主题变量
					primaryColor: isDark ? "#ffffff" : "#000000",
					primaryTextColor: isDark ? "#ffffff" : "#000000",
					primaryBorderColor: isDark ? "#ffffff" : "#000000",
					lineColor: isDark ? "#ffffff" : "#000000",
					secondaryColor: isDark ? "#333333" : "#f0f0f0",
					tertiaryColor: isDark ? "#555555" : "#e0e0e0",
				},
				securityLevel: "loose",
			});

			// 批量渲染所有图表
			const renderPromises = Array.from(mermaidElements).map(
				async (element, index) => {
					try {
						const code = element.getAttribute("data-mermaid-code");

						if (code) {
							// 清空容器
							element.innerHTML = "";

							// 渲染图表
							const { svg } = await window.mermaid.render(
								"mermaid-" + Math.random().toString(36).slice(-6),
								code,
							);
							element.innerHTML = svg;

							// 添加响应式支持
							const svgElement = element.querySelector("svg");
							if (svgElement) {
								svgElement.setAttribute("width", "100%");
								svgElement.removeAttribute("height");
								svgElement.style.maxWidth = "100%";
								svgElement.style.height = "auto";

								// 强制应用样式
								if (isDark) {
									svgElement.style.filter = "brightness(0.9) contrast(1.1)";
								} else {
									svgElement.style.filter = "none";
								}
							}
						}
					} catch (error) {
						console.error("Mermaid rendering error:", error);
						element.innerHTML =
							'<div class="mermaid-error">Failed to render diagram. Please check the syntax.</div>';
					}
				},
			);

			// 等待所有渲染完成
			Promise.all(renderPromises)
				.then(() => {
					isRendering = false;
				})
				.catch((error) => {
					isRendering = false;
					console.error("Error rendering Mermaid diagrams:", error);
				});
		}, 100); // 延迟 100ms 确保 DOM 更新完成
	}

	// 初始化主题状态
	function initializeThemeState() {
		const isDark = document.documentElement.classList.contains("dark");
		currentTheme = isDark ? "dark" : "default";
	}

	if (typeof window.mermaid === "undefined") {
		// 动态加载 Mermaid 库 - 使用 CDN 链接
		const script = document.createElement("script");
		script.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
		script.onload = () => {
			initializeMermaid();
		};
		document.head.appendChild(script);
	} else {
		initializeMermaid();
	}

	// 设置监听器
	setupMutationObserver();
	setupEventListeners();

	// 初始化主题状态
	initializeThemeState();

	// 初始渲染
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			renderMermaidDiagrams();
		});
	} else {
		renderMermaidDiagrams();
	}
})();

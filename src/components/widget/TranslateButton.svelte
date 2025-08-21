<script lang="ts">
import Icon from "@iconify/svelte";
import { onDestroy, onMount } from "svelte";
import { siteConfig } from "@/config";
import { getTranslateLanguageFromConfig } from "@/utils/language-utils";

let isOpen = false;
let translatePanel: HTMLElement;
let currentLanguage = "";

// 支持的语言列表
const languages = [
	{ code: "chinese_simplified", name: "简体中文", icon: "🇨🇳" },
	{ code: "chinese_traditional", name: "繁體中文", icon: "🇹🇼" },
	{ code: "english", name: "English", icon: "🇺🇸" },
	{ code: "japanese", name: "日本語", icon: "🇯🇵" },
	{ code: "korean", name: "한국어", icon: "🇰🇷" },
	{ code: "french", name: "Français", icon: "🇫🇷" },
	{ code: "german", name: "Deutsch", icon: "🇩🇪" },
	{ code: "spanish", name: "Español", icon: "🇪🇸" },
	{ code: "russian", name: "Русский", icon: "🇷🇺" },
	{ code: "arabic", name: "العربية", icon: "🇸🇦" },
];

// 根据配置文件的语言设置获取默认翻译语言
const defaultTranslateLanguage = getTranslateLanguageFromConfig(siteConfig.lang);

function togglePanel() {
	isOpen = !isOpen;
	if (translatePanel) {
		translatePanel.classList.toggle("float-panel-closed", !isOpen);
	}
}

async function changeLanguage(languageCode: string) {
	try {
		// 懒加载翻译脚本
		if (typeof window.loadTranslateScript === 'function') {
			await window.loadTranslateScript();
		}
		
		if (typeof window.translate !== 'undefined' && window.translate.language && typeof window.translate.language.getLocal === 'function') {
			// 检查是否选择的是简体中文，且当前本地语言也是简体中文
			const localLang = window.translate.language.getLocal();
			
			if (languageCode === 'chinese_simplified' && localLang === 'chinese_simplified') {
				// 如果选择简体中文且本地语言也是简体中文，先重置翻译状态
				if (typeof window.translate.reset === 'function') {
					window.translate.reset();
				}
				// 强制设置允许翻译本地语种
				if (window.translate.language) {
					window.translate.language.translateLocal = true;
				}
			}
			
			// 设置目标语言并执行翻译
			window.translate.to = languageCode;
			if (typeof window.translate.execute === 'function') {
				window.translate.execute();
			}
			
			// 由于我们隐藏了默认的select选择框，不需要更新select.value
		} else {
			console.warn('translate.js is not fully loaded or language API is not available');
		}
		
		// 更新当前语言状态
		currentLanguage = languageCode;
	} catch (error) {
		console.error('Failed to load or execute translation:', error);
	}
	
	// 关闭面板
	isOpen = false;
	if (translatePanel) {
		translatePanel.classList.add("float-panel-closed");
	}
}

// 点击外部关闭面板
function handleClickOutside(event: MouseEvent) {
	const target = event.target as HTMLElement;
	if (
		translatePanel &&
		!translatePanel.contains(target) &&
		!target.closest("#translate-switch")
	) {
		isOpen = false;
		translatePanel.classList.add("float-panel-closed");
	}
}

// 组件挂载时添加事件监听和初始化默认语言
onMount(() => {
	document.addEventListener("click", handleClickOutside);
	
	// 初始化当前语言为默认翻译语言
	currentLanguage = defaultTranslateLanguage;
	
	// 如果翻译功能已加载，设置默认语言
	if (typeof window.translate !== 'undefined') {
		window.translate.to = defaultTranslateLanguage;
		// 由于我们隐藏了默认的select选择框，不需要设置select.value
	}
});

onDestroy(() => {
	document.removeEventListener("click", handleClickOutside);
});
</script>

{#if siteConfig.translate?.enable}
<div class="relative">
    <!-- 翻译按钮 -->
    <button 
        aria-label="Language Translation" 
        class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" 
        id="translate-switch"
        on:click={togglePanel}
    >
        <Icon icon="material-symbols:translate" class="text-[1.25rem] transition text-black/75 dark:text-white/75 hover:text-[var(--primary)]" />
    </button>

    <!-- 翻译面板 -->
    <div 
        bind:this={translatePanel}
        id="translate-panel" 
        class="float-panel-closed absolute top-[3.5rem] right-0 z-50 w-64 bg-[var(--float-panel-bg)] rounded-[var(--radius-large)] shadow-lg border border-[var(--line-divider)] p-4"
    >
        <div class="text-sm font-medium text-[var(--primary)] mb-3">
            选择语言 / Select Language
        </div>
        <div class="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
            {#each languages as lang}
                <button
                    class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--btn-plain-bg-hover)] transition-colors text-left w-full {currentLanguage === lang.code ? 'bg-[var(--btn-plain-bg-hover)] border-1 border-[var(--primary)]' : ''}"
                    on:click={() => changeLanguage(lang.code)}
                >
                    <span class="text-lg transition text-black/75 dark:text-white/75">{lang.icon}</span>
                    <span class="text-sm transition text-black/75 dark:text-white/75 {currentLanguage === lang.code ? 'font-medium text-[var(--primary)]' : ''}">{lang.name}</span>
                    {#if currentLanguage === lang.code}
                        <span class="ml-auto text-[var(--primary)]">✓</span>
                    {/if}
                </button>
            {/each}
        </div>
    </div>
</div>
{/if}

<style>
.float-panel-closed {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
}

.float-panel-closed:not(.float-panel-closed) {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

/* 滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: var(--scrollbar-bg);
    border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-bg-hover);
}
</style>
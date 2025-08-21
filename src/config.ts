import type {
	AnnouncementConfig,
	CommentConfig,
	ExpressiveCodeConfig,
	LicenseConfig,
	MusicPlayerConfig,
	NavBarConfig,
	ProfileConfig,
	SidebarLayoutConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";
import { getTranslateLanguageFromConfig } from "./utils/language-utils";

// Define site language
const SITE_LANG = "en"; // Language code, e.g., 'en', 'zh_CN', 'ja', etc.

export const siteConfig: SiteConfig = {
	title: "Mizuki",
	subtitle: "One demo website",

	lang: SITE_LANG,

	themeColor: {
		hue: 210, // Default hue for theme color, range from 0 to 360. e.g., red: 0, cyan: 200, teal: 250, pink: 345
		fixed: false, // Hide theme color picker for visitors
	},
	translate: {
		enable: true, // Enable translation feature
		service: "client.edge", // Use Edge browser translation service
		defaultLanguage: getTranslateLanguageFromConfig(SITE_LANG), // Automatically set default translation language based on site language
		showSelectTag: false, // Don't show default language selection dropdown, use custom button
		autoDiscriminate: true, // Automatically detect user language
		ignoreClasses: ["ignore", "banner-title", "banner-subtitle"], // CSS class names to ignore for translation
		ignoreTags: ["script", "style", "code", "pre"], // HTML tags to ignore for translation
	},
	banner: {
		enable: true, // Temporarily disable banner to improve loading speed

		// Support single image or image array, carousel is automatically enabled when array length > 1
		src: {
			desktop: [
				"assets/desktop-banner/1.webp",
				"assets/desktop-banner/2.webp",
				"assets/desktop-banner/3.webp",
				"assets/desktop-banner/4.webp",
				"assets/desktop-banner/5.webp",
				"assets/desktop-banner/6.webp",
				"assets/desktop-banner/7.webp",
			], // Desktop banner images
			mobile: [
				"assets/mobile-banner/1.webp",
				"assets/mobile-banner/2.webp",
				"assets/mobile-banner/3.webp",
				"assets/mobile-banner/4.webp",
				"assets/mobile-banner/5.webp",
				"assets/mobile-banner/6.webp",
				"assets/mobile-banner/7.webp",
			], // Mobile banner images
		}, // Use local banner images

		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. Default is 'center'

		carousel: {
			enable: true, // When true: enable carousel for multiple images. When false: randomly display one image from the array

			interval: 1, // Carousel interval time (seconds)
		},

		homeText: {
			enable: true, // Display custom text on homepage
			title: "Mizuki", // Homepage banner main title

			subtitle: [
				"One demo website",
				"Carousel Text1",
				"Carousel Text2",
				"Carousel Text3",
			], // Homepage banner subtitle, supports multiple texts
			typewriter: {
				enable: true, // Enable subtitle typewriter effect

				speed: 100, // Typing speed (milliseconds)
				deleteSpeed: 50, // Delete speed (milliseconds)
				pauseTime: 2000, // Pause time after complete display (milliseconds)
			},
		},

		credit: {
			enable: false, // Display banner image source text

			text: "Describe", // Source text to display
			url: "", // (Optional) URL link to original artwork or artist page
		},
	},
	toc: {
		enable: true, // Enable table of contents feature
		depth: 3, // TOC depth, 1-6, 1 means only show h1 headings, 2 means show h1 and h2 headings, and so on
	},
	favicon: [
		// Leave empty to use default favicon
		// {
		//   src: '/favicon/icon.png',    // Icon file path
		//   theme: 'light',              // Optional, specify theme 'light' | 'dark'
		//   sizes: '32x32',              // Optional, icon size
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Series, //增加系列
		LinkPreset.Archive,
		// 支持自定义导航栏链接,并且支持多级菜单,3.1版本新加
		{
			name: "Links",
			url: "/links/",
			children: [
				{
					name: "GitHub",
					url: "https://github.com/matsuzaka-yuki/Mizuki",
					external: true,
				},
				{
					name: "Bilibili",
					url: "https://space.bilibili.com/701864046",
					external: true,
				},
				{
					name: "Gitee",
					url: "https://gitee.com/matsuzakayuki/Mizuki",
					external: true,
				},
			],
		},
		{
			name: "My",
			url: "/content/",
			children: [LinkPreset.Anime, LinkPreset.Diary, LinkPreset.Gallery],
		},
		{
			name: "About",
			url: "/content/",
			children: [LinkPreset.About, LinkPreset.Friends],
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.jpg", // Relative to /src directory. If starts with '/', relative to /public directory
	name: "Mizuki",
	bio: "This is a description",
	links: [
		{
			name: "Bilibli",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/701864046",
		},
		{
			name: "Gitee",
			icon: "mdi:git",
			url: "https://gitee.com/matsuzakayuki",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/matsuzaka-yuki",
		},
	],
	// Umami统计部份，记得在layout插入Umami的脚本
	umami: {
		enable: false, // 是否显示umami统计
		shareId: "", //填入共享URL最后面那一串  比如：https://eu.umami.is/api/share/2dKQ5T0WrUn6AYtr 你就填入2dKQ5T0WrUn6AYtr
		region: "eu", //Umami有两个区域，按需选择即可  比如：https://eu.umami.is 你就填入eu
	},
	icp: "粤ICP备12345678号",
	icpEnable: false, // 是否启用ICP备案号
	gongan: "粤公网安备12345678号", //公安备案号
	gonganEnable: false, //是否启用公安备案号
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (like background color) have been overridden, see astro.config.mjs file.
	// Please choose a dark theme as this blog theme currently only supports dark backgrounds
	theme: "github-dark",
};

export const commentConfig: CommentConfig = {
	enable: false, // Enable the comment function. When it is set to false, the comment component will not be displayed in the article area.
	twikoo: {
		envId: "https://twikoo.vercel.app",
	},
};

export const announcementConfig: AnnouncementConfig = {
	title: "Announcement", // Announcement title
	content: "Welcome to my blog! This is a sample announcement.", // Announcement content
	closable: true, // Allow users to close the announcement
	link: {
		enable: true, // Enable link
		text: "Learn More", // Link text
		url: "/about/", // Link URL
		external: false, // Internal link
	},
};

export const musicPlayerConfig: MusicPlayerConfig = {
	enable: true, // Enable music player feature
};

/**
 * 侧边栏布局配置
 * 用于控制侧边栏组件的显示、排序、动画和响应式行为
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	// 是否启用侧边栏功能
	enable: true,

	// 侧边栏位置：左侧或右侧
	position: "left",

	// 侧边栏组件配置列表
	components: [
		{
			// 组件类型：用户资料组件
			type: "profile",
			// 是否启用该组件
			enable: true,
			// 组件显示顺序（数字越小越靠前）
			order: 1,
			// 组件位置："top" 表示固定在顶部
			position: "top",
			// CSS 类名，用于应用样式和动画
			class: "onload-animation",
			// 动画延迟时间（毫秒），用于错开动画效果
			animationDelay: 0,
		},
		{
			// 组件类型：公告组件
			type: "announcement",
			// 是否启用该组件（现在通过统一配置控制）
			enable: true,
			// 组件显示顺序
			order: 2,
			// 组件位置："top" 表示固定在顶部
			position: "top",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 50,
		},
		{
			// 组件类型：分类组件
			type: "categories",
			// 是否启用该组件
			enable: true,
			// 组件显示顺序
			order: 3,
			// 组件位置："sticky" 表示粘性定位，可滚动
			position: "sticky",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 150,
			// 响应式配置
			responsive: {
				// 折叠阈值：当分类数量超过5个时自动折叠
				collapseThreshold: 5,
			},
		},
		{
			// 组件类型：标签组件
			type: "tags",
			// 是否启用该组件
			enable: true,
			// 组件显示顺序
			order: 4,
			// 组件位置："sticky" 表示粘性定位
			position: "sticky",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 200,
			// 响应式配置
			responsive: {
				// 折叠阈值：当标签数量超过20个时自动折叠
				collapseThreshold: 20,
			},
		},
	],

	// 默认动画配置
	defaultAnimation: {
		// 是否启用默认动画
		enable: true,
		// 基础延迟时间（毫秒）
		baseDelay: 0,
		// 递增延迟时间（毫秒），每个组件依次增加的延迟
		increment: 50,
	},

	// 响应式布局配置
	responsive: {
		// 断点配置（像素值）
		breakpoints: {
			// 移动端断点：屏幕宽度小于768px
			mobile: 768,
			// 平板端断点：屏幕宽度小于1024px
			tablet: 1024,
			// 桌面端断点：屏幕宽度小于1280px
			desktop: 1280,
		},
		// 不同设备的布局模式
		//hidden:不显示侧边栏 sidebar:显示侧边栏
		layout: {
			// 移动端：抽屉模式
			mobile: "sidebar",
			// 平板端：显示侧边栏
			tablet: "sidebar",
			// 桌面端：显示侧边栏
			desktop: "sidebar",
		},
	},
};

// 导出所有配置的统一接口
export const widgetConfigs = {
	profile: profileConfig,
	announcement: announcementConfig,
	music: musicPlayerConfig,
	layout: sidebarLayoutConfig,
} as const;

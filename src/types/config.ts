import type { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "../constants/constants";

export type SiteConfig = {
	title: string;
	subtitle: string;

	lang:
		| "en"
		| "zh_CN"
		| "zh_TW"
		| "ja"
		| "ko"
		| "es"
		| "th"
		| "vi"
		| "tr"
		| "id";

	themeColor: {
		hue: number;
		fixed: boolean;
	};
	translate?: {
		enable: boolean; // 是否启用翻译功能
		service?: string; // 翻译服务类型，如 'client.edge'
		defaultLanguage?: string; // 默认语言
		showSelectTag?: boolean; // 是否显示语言选择下拉框
		autoDiscriminate?: boolean; // 是否自动识别用户语言
		ignoreClasses?: string[]; // 忽略翻译的CSS类名
		ignoreTags?: string[]; // 忽略翻译的HTML标签
	};
	banner: {
		enable: boolean;
		src:
			| string
			| string[]
			| {
					desktop?: string | string[];
					mobile?: string | string[];
			  }; // 支持单个图片、图片数组或分别设置桌面端和移动端图片
		position?: "top" | "center" | "bottom";
		carousel?: {
			enable: boolean; // 是否启用轮播
			interval: number; // 轮播间隔时间（秒）
		};
		homeText?: {
			enable: boolean; // 是否在首页显示自定义文字
			title?: string; // 主标题
			subtitle?: string | string[]; // 副标题，支持单个字符串或字符串数组
			typewriter?: {
				enable: boolean; // 是否启用打字机效果
				speed: number; // 打字速度（毫秒）
				deleteSpeed: number; // 删除速度（毫秒）
				pauseTime: number; // 完整显示后的暂停时间（毫秒）
			};
		};
		credit: {
			enable: boolean;
			text: string;
			url?: string;
		};
	};
	toc: {
		enable: boolean;
		depth: 1 | 2 | 3;
	};

	favicon: Favicon[];
};

export type Favicon = {
	src: string;
	theme?: "light" | "dark";
	sizes?: string;
};

export enum LinkPreset {
	Home = 0,
	Archive = 1,
	About = 2,
	Friends = 3,
	Anime = 4,
	Diary = 5,
	Gallery = 6,
	Series = 7,
}

export type NavBarLink = {
	name: string;
	url: string;
	external?: boolean;
	children?: (NavBarLink | LinkPreset)[]; // 支持子菜单，可以是NavBarLink或LinkPreset
};

export type NavBarConfig = {
	links: (NavBarLink | LinkPreset)[];
};

export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	links: {
		name: string;
		url: string;
		icon: string;
	}[];
	umami?: {
		enable?: boolean;
		shareId: string;
		region: string;
	};
	icp?: string;
	icpEnable?: boolean;
	gongan?: string;
	gonganEnable?: boolean;
};

export type LicenseConfig = {
	enable: boolean;
	name: string;
	url: string;
};
// 评论配置

export type CommentConfig = {
	enable: boolean; // 是否启用评论功能
	twikoo?: TwikooConfig;
};

type TwikooConfig = {
	envId: string;
	region?: string;
	lang?: string;
};

export type LIGHT_DARK_MODE =
	| typeof LIGHT_MODE
	| typeof DARK_MODE
	| typeof AUTO_MODE;

export type BlogPostData = {
	body: string;
	title: string;
	published: Date;
	description: string;
	tags: string[];
	draft?: boolean;
	image?: string;
	series?: string;
	category?: string;
	pinned?: boolean;
	prevTitle?: string;
	prevSlug?: string;
	nextTitle?: string;
	nextSlug?: string;
};

export type ExpressiveCodeConfig = {
	theme: string;
};

export type AnnouncementConfig = {
	// enable属性已移除，现在通过sidebarLayoutConfig统一控制
	title?: string; // 公告栏标题
	content: string; // 公告栏内容
	icon?: string; // 公告栏图标
	type?: "info" | "warning" | "success" | "error"; // 公告类型
	closable?: boolean; // 是否可关闭
	link?: {
		enable: boolean; // 是否启用链接
		text: string; // 链接文字
		url: string; // 链接地址
		external?: boolean; // 是否外部链接
	};
};

export type MusicPlayerConfig = {
	enable: boolean; // 是否启用音乐播放器功能
};

// 组件配置类型定义
export type WidgetComponentType =
	| "profile"
	| "announcement"
	| "categories"
	| "tags"
	| "toc"
	| "music-player"
	| "custom";

export type WidgetComponentConfig = {
	type: WidgetComponentType; // 组件类型
	enable: boolean; // 是否启用该组件
	order: number; // 显示顺序，数字越小越靠前
	position: "top" | "sticky"; // 组件位置：顶部固定区域或粘性区域
	class?: string; // 自定义CSS类名
	style?: string; // 自定义内联样式
	animationDelay?: number; // 动画延迟时间（毫秒）
	responsive?: {
		hidden?: ("mobile" | "tablet" | "desktop")[]; // 在指定设备上隐藏
		collapseThreshold?: number; // 折叠阈值
	};
	customProps?: Record<string, any>; // 自定义属性，用于扩展组件功能
};

export type SidebarLayoutConfig = {
	enable: boolean; // 是否启用侧边栏
	position: "left" | "right"; // 侧边栏位置：左侧或右侧
	components: WidgetComponentConfig[]; // 组件配置列表
	defaultAnimation: {
		enable: boolean; // 是否启用默认动画
		baseDelay: number; // 基础延迟时间（毫秒）
		increment: number; // 每个组件递增的延迟时间（毫秒）
	};
	responsive: {
		breakpoints: {
			mobile: number; // 移动端断点（px）
			tablet: number; // 平板端断点（px）
			desktop: number; // 桌面端断点（px）
		};
		layout: {
			mobile: "hidden" | "bottom" | "drawer"; // 移动端布局模式
			tablet: "sidebar" | "bottom" | "drawer"; // 平板端布局模式
			desktop: "sidebar"; // 桌面端布局模式
		};
	};
};

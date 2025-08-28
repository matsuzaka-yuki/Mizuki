// 相册配置数据结构
export interface Photo {
	id: string;
	src: string;
	thumbnail?: string;
	alt: string;
	title?: string;
	description?: string;
	tags?: string[];
	date?: string;
	location?: string;
	width?: number;
	height?: number;
	camera?: string;
	lens?: string;
	settings?: {
		aperture?: string;
		shutter?: string;
		iso?: string;
		focal?: string;
	};
}

export interface AlbumGroup {
	id: string;
	title: string;
	description?: string;
	cover: string;
	date: string;
	location?: string;
	tags?: string[];
	photos: Photo[];
	layout?: "grid" | "masonry";
	columns?: number;
}

// 相册数据
export const albumsData: AlbumGroup[] = [
	{
		id: "k-on-collection",
		title: "轻音少女 K-ON!",
		description: "可爱的轻音部女孩们的日常时光，青春与音乐的美好回忆",
		cover: "https://wallpapercave.com/wp/wp2535789.jpg",
		date: "2024-06-10",
		location: "樱丘高校",
		tags: ["K-ON", "轻音少女", "萌系", "日常"],
		layout: "grid",
		columns: 3,
		photos: [
			{
				id: "yui-hirasawa-1",
				src: "https://wallpapercave.com/wp/wp2535789.jpg",
				alt: "平泽唯 - 可爱的吉他手",
				width: 1920,
				height: 1080,
			},
			{
				id: "mio-akiyama-1",
				src: "https://wallpapercave.com/wp/wp2535790.jpg",
				alt: "秋山澪 - 害羞的贝斯手",
				width: 1920,
				height: 1080,
			},
			{
				id: "ritsu-tainaka-1",
				src: "https://wallpapercave.com/wp/wp2535791.jpg",
				alt: "田井中律 - 活泼的鼓手",
				width: 1920,
				height: 1080,
			},
			{
				id: "tsumugi-kotobuki-1",
				src: "https://wallpapercave.com/wp/wp2535792.jpg",
				alt: "琴吹紬 - 温柔的键盘手",
				width: 1920,
				height: 1080,
			},
			{
				id: "azusa-nakano-1",
				src: "https://wallpapercave.com/wp/wp2535793.jpg",
				alt: "中野梓 - 认真的后辈",
				width: 1920,
				height: 1080,
			},
			{
				id: "k-on-group-1",
				src: "https://wallpapercave.com/wp/wp2535794.jpg",
				alt: "轻音部全员合照",
				width: 1920,
				height: 1080,
			},
		],
	},
	{
		id: "clannad-collection",
		title: "CLANNAD",
		description: "感人至深的校园与家庭故事，温暖人心的治愈系动画",
		cover: "https://wallpapercave.com/wp/wp1810987.jpg",
		date: "2024-06-15",
		location: "光坂高校",
		tags: ["CLANNAD", "治愈", "校园", "感动"],
		layout: "grid",
		columns: 3,
		photos: [
			{
				id: "nagisa-furukawa",
				src: "https://wallpapercave.com/wp/wp1810987.jpg",
				alt: "古河渚 - 温柔的女主角",
				width: 1920,
				height: 1080,
			},
			{
				id: "tomoya-okazaki",
				src: "https://wallpapercave.com/wp/wp1810988.jpg",
				alt: "冈崎朋也 - 男主角",
				width: 1920,
				height: 1080,
			},
			{
				id: "kyou-fujibayashi",
				src: "https://wallpapercave.com/wp/wp1810989.jpg",
				alt: "藤林杏 - 活泼的双胞胎姐姐",
				width: 1920,
				height: 1080,
			},
			{
				id: "ryou-fujibayashi",
				src: "https://wallpapercave.com/wp/wp1810990.jpg",
				alt: "藤林椋 - 温柔的双胞胎妹妹",
				width: 1920,
				height: 1080,
			},
			{
				id: "kotomi-ichinose",
				src: "https://wallpapercave.com/wp/wp1810991.jpg",
				alt: "一之濑琴美 - 聪明的图书委员",
				width: 1920,
				height: 1080,
			},
			{
				id: "clannad-sakura",
				src: "https://wallpapercave.com/wp/wp1810992.jpg",
				alt: "樱花飞舞的校园",
				width: 1920,
				height: 1080,
			},
		],
	},
	{
		id: "lucky-star-collection",
		title: "幸运☆星",
		description: "四个女高中生的搞笑日常，充满欢声笑语的校园生活",
		cover: "https://wallpapercave.com/wp/wp1847234.jpg",
		date: "2024-06-20",
		location: "陵樱学园",
		tags: ["幸运星", "搞笑", "日常", "萌系"],
		layout: "grid",
		columns: 3,
		photos: [
			{
				id: "konata-izumi",
				src: "https://wallpapercave.com/wp/wp1847234.jpg",
				alt: "泉此方 - 御宅族女主角",
				width: 1920,
				height: 1080,
			},
			{
				id: "kagami-hiiragi",
				src: "https://wallpapercave.com/wp/wp1847235.jpg",
				alt: "柊镜 - 认真的班长",
				width: 1920,
				height: 1080,
			},
			{
				id: "tsukasa-hiiragi",
				src: "https://wallpapercave.com/wp/wp1847236.jpg",
				alt: "柊司 - 天然呆妹妹",
				width: 1920,
				height: 1080,
			},
			{
				id: "miyuki-takara",
				src: "https://wallpapercave.com/wp/wp1847237.jpg",
				alt: "高良美幸 - 温柔的眼镜娘",
				width: 1920,
				height: 1080,
			},
			{
				id: "lucky-star-group",
				src: "https://wallpapercave.com/wp/wp1847238.jpg",
				alt: "四人组合照",
				width: 1920,
				height: 1080,
			},
			{
				id: "lucky-star-classroom",
				src: "https://wallpapercave.com/wp/wp1847239.jpg",
				alt: "教室里的日常",
				width: 1920,
				height: 1080,
			},
		],
	},
	{
		id: "azumanga-daioh-collection",
		title: "阿兹漫画大王",
		description: "经典的四格漫画改编，充满童趣和幽默的校园故事",
		cover: "https://wallpapercave.com/wp/wp2089456.jpg",
		date: "2024-06-25",
		location: "高校",
		tags: ["阿兹漫画大王", "四格漫画", "搞笑", "经典"],
		layout: "grid",
		columns: 3,
		photos: [
			{
				id: "chiyo-mihama",
				src: "https://wallpapercave.com/wp/wp2089456.jpg",
				alt: "美浜千代 - 天才小学生",
				width: 1920,
				height: 1080,
			},
			{
				id: "osaka-kasuga",
				src: "https://wallpapercave.com/wp/wp2089457.jpg",
				alt: "春日步 - 大阪娘",
				width: 1920,
				height: 1080,
			},
			{
				id: "sakaki-san",
				src: "https://wallpapercave.com/wp/wp2089458.jpg",
				alt: "榊 - 高冷的猫控",
				width: 1920,
				height: 1080,
			},
			{
				id: "tomo-takino",
				src: "https://wallpapercave.com/wp/wp2089459.jpg",
				alt: "滝野智 - 活力少女",
				width: 1920,
				height: 1080,
			},
			{
				id: "yomi-mizuhara",
				src: "https://wallpapercave.com/wp/wp2089460.jpg",
				alt: "水原暦 - 吐槽役",
				width: 1920,
				height: 1080,
			},
			{
				id: "azumanga-group",
				src: "https://wallpapercave.com/wp/wp2089461.jpg",
				alt: "全员大合照",
				width: 1920,
				height: 1080,
			},
		],
	},
	{
		id: "nichijou-collection",
		title: "日常",
		description: "超现实的搞笑日常，脑洞大开的无厘头喜剧",
		cover: "https://wallpapercave.com/wp/wp1945678.jpg",
		date: "2024-06-30",
		location: "时定高校",
		tags: ["日常", "搞笑", "超现实", "无厘头"],
		layout: "grid",
		columns: 3,
		photos: [
			{
				id: "yuuko-aioi",
				src: "https://wallpapercave.com/wp/wp1945678.jpg",
				alt: "相生祐子 - 天然呆主角",
				width: 1920,
				height: 1080,
			},
			{
				id: "mio-naganohara",
				src: "https://wallpapercave.com/wp/wp1945679.jpg",
				alt: "长野原美绪 - 吐槽役",
				width: 1920,
				height: 1080,
			},
			{
				id: "mai-minakami",
				src: "https://wallpapercave.com/wp/wp1945680.jpg",
				alt: "水上麻衣 - 三无少女",
				width: 1920,
				height: 1080,
			},
			{
				id: "nano-shinonome",
				src: "https://wallpapercave.com/wp/wp1945681.jpg",
				alt: "东云名乃 - 机器人少女",
				width: 1920,
				height: 1080,
			},
			{
				id: "hakase-shinonome",
				src: "https://wallpapercave.com/wp/wp1945682.jpg",
				alt: "东云研究所 - 天才博士",
				width: 1920,
				height: 1080,
			},
			{
				id: "nichijou-group",
				src: "https://wallpapercave.com/wp/wp1945683.jpg",
				alt: "日常系大合照",
				width: 1920,
				height: 1080,
			},
		],
	},
];
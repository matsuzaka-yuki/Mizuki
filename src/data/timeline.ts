// 时间线数据配置文件
// 用于管理时间线页面的数据

export interface TimelineItem {
	id: string;
	title: string;
	description: string;
	type: "education" | "work" | "project" | "achievement";
	startDate: string;
	endDate?: string; // 如果为空表示至今
	location?: string;
	organization?: string;
	position?: string;
	skills?: string[];
	achievements?: string[];
	links?: {
		name: string;
		url: string;
		type: "website" | "certificate" | "project" | "other";
	}[];
	icon?: string; // Iconify icon name
	color?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
	{
		id: "current-study",
		title: "计算机科学与技术专业在读",
		description:
			"目前正在学习计算机科学与技术专业，专注于Web开发和软件工程方向。",
		type: "education",
		startDate: "2022-09-01",
		location: "北京",
		organization: "北京理工大学",
		skills: ["Java", "Python", "JavaScript", "HTML/CSS", "MySQL"],
		achievements: [
			"当前GPA: 3.6/4.0",
			"完成了数据结构与算法课程设计",
			"参与了多个课程项目开发",
		],
		icon: "material-symbols:school",
		color: "#059669",
		featured: true,
	},
	{
		id: "mizuki-blog-project",
		title: "Mizuki个人博客项目",
		description:
			"使用Astro框架开发的个人博客网站，作为学习前端技术的实践项目。",
		type: "project",
		startDate: "2024-06-01",
		endDate: "2024-08-01",
		skills: ["Astro", "TypeScript", "Tailwind CSS", "Git"],
		achievements: [
			"掌握了现代前端开发技术栈",
			"学会了响应式设计和用户体验优化",
			"完成了从设计到部署的完整流程",
		],
		links: [
			{
				name: "GitHub Repository",
				url: "https://github.com/example/mizuki-blog",
				type: "project",
			},
			{
				name: "Live Demo",
				url: "https://mizuki-demo.example.com",
				type: "website",
			},
		],
		icon: "material-symbols:code",
		color: "#7C3AED",
		featured: true,
	},
	{
		id: "summer-internship-2024",
		title: "前端开发实习生",
		description: "暑期在一家互联网公司实习，参与Web应用的前端开发工作。",
		type: "work",
		startDate: "2024-07-01",
		endDate: "2024-08-31",
		location: "北京",
		organization: "TechStart科技有限公司",
		position: "Frontend Development Intern",
		skills: ["React", "JavaScript", "CSS3", "Git", "Figma"],
		achievements: [
			"完成了用户界面组件的开发",
			"学习了团队协作和代码规范",
			"获得了实习优秀表现证明",
		],
		icon: "material-symbols:work",
		color: "#DC2626",
		featured: true,
	},
	{
		id: "web-development-course",
		title: "Web开发在线课程完成",
		description: "完成了全栈Web开发的在线课程，系统学习了前后端开发技术。",
		type: "achievement",
		startDate: "2024-01-15",
		endDate: "2024-05-30",
		organization: "慕课网",
		skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
		achievements: [
			"获得了课程完成证书",
			"完成了5个实战项目",
			"掌握了全栈开发基础",
		],
		links: [
			{
				name: "Course Certificate",
				url: "https://certificates.example.com/web-dev",
				type: "certificate",
			},
		],
		icon: "material-symbols:verified",
		color: "#059669",
	},
	{
		id: "student-management-system",
		title: "学生管理系统课程设计",
		description: "数据库课程的期末项目，开发了一个完整的学生信息管理系统。",
		type: "project",
		startDate: "2023-11-01",
		endDate: "2023-12-15",
		skills: ["Java", "MySQL", "Swing", "JDBC"],
		achievements: [
			"获得了课程设计优秀成绩",
			"实现了完整的CRUD功能",
			"学会了数据库设计和优化",
		],
		icon: "material-symbols:database",
		color: "#EA580C",
	},
	{
		id: "programming-contest",
		title: "校内程序设计竞赛",
		description: "参加了学校举办的程序设计竞赛，提升了算法和编程能力。",
		type: "achievement",
		startDate: "2023-10-20",
		location: "北京理工大学",
		organization: "计算机学院",
		skills: ["C++", "算法", "数据结构"],
		achievements: [
			"获得了校内竞赛三等奖",
			"提升了算法思维能力",
			"加强了编程基础技能",
		],
		icon: "material-symbols:emoji-events",
		color: "#7C3AED",
	},
	{
		id: "part-time-tutor",
		title: "编程家教兼职",
		description: "为高中生提供编程入门辅导，帮助他们学习Python基础。",
		type: "work",
		startDate: "2023-09-01",
		endDate: "2024-01-31",
		position: "编程辅导老师",
		skills: ["Python", "教学", "沟通"],
		achievements: [
			"帮助3名学生掌握了Python基础",
			"提升了表达和沟通能力",
			"获得了教学经验",
		],
		icon: "material-symbols:school",
		color: "#059669",
	},
	{
		id: "high-school-graduation",
		title: "高中毕业",
		description: "以优异成绩从高中毕业，考入北京理工大学计算机科学与技术专业。",
		type: "education",
		startDate: "2019-09-01",
		endDate: "2022-06-30",
		location: "山东济南",
		organization: "济南市第一中学",
		achievements: [
			"高考成绩620分",
			"获得了市级三好学生称号",
			"在数学竞赛中获得省级二等奖",
		],
		icon: "material-symbols:school",
		color: "#2563EB",
	},
	{
		id: "first-programming-experience",
		title: "初次接触编程",
		description: "在高中信息技术课上第一次接触编程，开始学习Python基础语法。",
		type: "education",
		startDate: "2021-03-01",
		skills: ["Python", "基础编程概念"],
		achievements: [
			'完成了第一个"Hello World"程序',
			"学会了基本的循环和条件语句",
			"培养了对编程的兴趣",
		],
		icon: "material-symbols:code",
		color: "#7C3AED",
	},
	{
		id: "english-certificate",
		title: "英语四级证书",
		description: "通过了大学英语四级考试，具备了基本的英语读写能力。",
		type: "achievement",
		startDate: "2023-06-15",
		organization: "全国大学英语四、六级考试委员会",
		achievements: [
			"四级成绩：550分",
			"提升了英语技术文档阅读能力",
			"为后续学习国外技术资料打下基础",
		],
		links: [
			{
				name: "CET-4 Certificate",
				url: "https://certificates.example.com/cet4",
				type: "certificate",
			},
		],
		icon: "material-symbols:translate",
		color: "#059669",
	},
];

// 获取时间线统计信息
export const getTimelineStats = () => {
	const total = timelineData.length;
	const byType = {
		education: timelineData.filter((item) => item.type === "education").length,
		work: timelineData.filter((item) => item.type === "work").length,
		project: timelineData.filter((item) => item.type === "project").length,
		achievement: timelineData.filter((item) => item.type === "achievement")
			.length,
	};

	return { total, byType };
};

// 按类型获取时间线项目
export const getTimelineByType = (type?: string) => {
	if (!type || type === "all") {
		return timelineData.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
	}
	return timelineData
		.filter((item) => item.type === type)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
};

// 获取特色时间线项目
export const getFeaturedTimeline = () => {
	return timelineData
		.filter((item) => item.featured)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
};

// 获取当前进行中的项目
export const getCurrentItems = () => {
	return timelineData.filter((item) => !item.endDate);
};

// 计算总工作经验
export const getTotalWorkExperience = () => {
	const workItems = timelineData.filter((item) => item.type === "work");
	let totalMonths = 0;

	workItems.forEach((item) => {
		const startDate = new Date(item.startDate);
		const endDate = item.endDate ? new Date(item.endDate) : new Date();
		const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
		totalMonths += diffMonths;
	});

	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};

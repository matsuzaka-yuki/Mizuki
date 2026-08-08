import { siteConfig } from "../config";
import { isDateOnlyString } from "./frontmatter-date";
import {
	assertValidTimeZone,
	formatPostDateInTimeZone,
	formatPostDateWithLocale,
	getPostDatePartsInTimeZone,
	type PostDateParts,
} from "./post-date-utils";

assertValidTimeZone(siteConfig.timeZone);

export function getPostDateParts(date: Date, dateOnly = false): PostDateParts {
	return getPostDatePartsInTimeZone(date, siteConfig.timeZone, dateOnly);
}

export function formatDateToYYYYMMDD(date: Date, dateOnly = false): string {
	return formatPostDateInTimeZone(date, siteConfig.timeZone, dateOnly);
}

// 国际化日期格式化函数
export function formatDateI18n(dateString: string): string {
	const date = new Date(dateString);
	const lang = siteConfig.lang || "en";

	// 根据语言设置不同的日期格式
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	// 语言代码映射
	const localeMap: Record<string, string> = {
		zh_CN: "zh-CN",
		zh_TW: "zh-TW",
		en: "en-US",
		ja: "ja-JP",
		ko: "ko-KR",
		es: "es-ES",
		th: "th-TH",
		vi: "vi-VN",
		tr: "tr-TR",
		id: "id-ID",
		fr: "fr-FR",
		de: "de-DE",
		ru: "ru-RU",
		ar: "ar-SA",
	};

	const locale = localeMap[lang] || "en-US";
	return formatPostDateWithLocale(
		date,
		locale,
		siteConfig.timeZone,
		options,
		isDateOnlyString(dateString),
	);
}

export function formatDateWithLocale(
	date: Date,
	locale: string,
	options: Intl.DateTimeFormatOptions,
	dateOnly = false,
): string {
	return formatPostDateWithLocale(
		date,
		locale,
		siteConfig.timeZone,
		options,
		dateOnly,
	);
}

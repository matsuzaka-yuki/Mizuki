export interface PostDateParts {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
}

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function assertValidDate(date: Date): void {
	if (Number.isNaN(date.getTime())) {
		throw new RangeError("Invalid published date");
	}
}

function getFormatter(timeZone: string): Intl.DateTimeFormat {
	const cached = formatterCache.get(timeZone);
	if (cached) {
		return cached;
	}

	const formatter = new Intl.DateTimeFormat("en-US-u-ca-gregory-nu-latn", {
		timeZone,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hourCycle: "h23",
	});
	formatterCache.set(timeZone, formatter);
	return formatter;
}

export function assertValidTimeZone(timeZone: string): void {
	getFormatter(timeZone);
}

function getNumericPart(
	parts: Intl.DateTimeFormatPart[],
	type: Intl.DateTimeFormatPartTypes,
): number {
	const value = parts.find((part) => part.type === type)?.value;
	if (value === undefined) {
		throw new RangeError(`Unable to format published date part: ${type}`);
	}
	return Number.parseInt(value, 10);
}

/**
 * 将文章时间转换为统一的站点日历时间。
 *
 * 纯日期保留其 UTC 年月日；带时间的值按显式 IANA 时区转换。该规则不读取
 * 构建服务器或浏览器的本地时区，因此静态构建和客户端渲染结果一致。
 */
export function getPostDatePartsInTimeZone(
	date: Date,
	timeZone: string,
	dateOnly = false,
): PostDateParts {
	assertValidDate(date);

	if (dateOnly) {
		return {
			year: date.getUTCFullYear(),
			month: date.getUTCMonth() + 1,
			day: date.getUTCDate(),
			hour: 0,
			minute: 0,
			second: 0,
		};
	}

	const parts = getFormatter(timeZone).formatToParts(date);
	return {
		year: getNumericPart(parts, "year"),
		month: getNumericPart(parts, "month"),
		day: getNumericPart(parts, "day"),
		hour: getNumericPart(parts, "hour"),
		minute: getNumericPart(parts, "minute"),
		second: getNumericPart(parts, "second"),
	};
}

export function formatPostDateInTimeZone(
	date: Date,
	timeZone: string,
	dateOnly = false,
): string {
	const { year, month, day } = getPostDatePartsInTimeZone(
		date,
		timeZone,
		dateOnly,
	);
	return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function formatPostDateWithLocale(
	date: Date,
	locale: string,
	timeZone: string,
	options: Intl.DateTimeFormatOptions,
	dateOnly = false,
): string {
	assertValidDate(date);
	return new Intl.DateTimeFormat(locale, {
		...options,
		timeZone: dateOnly ? "UTC" : timeZone,
	}).format(date);
}

function compareIds(idA: string, idB: string): number {
	if (idA < idB) {
		return -1;
	}
	if (idA > idB) {
		return 1;
	}
	return 0;
}

export function comparePublishedDatesDescending(
	dateA: Date,
	dateB: Date,
	idA: string,
	idB: string,
): number {
	assertValidDate(dateA);
	assertValidDate(dateB);
	const timeDifference = dateB.getTime() - dateA.getTime();
	return timeDifference === 0 ? compareIds(idA, idB) : timeDifference;
}

export function comparePublishedDatesAscending(
	dateA: Date,
	dateB: Date,
	idA: string,
	idB: string,
): number {
	assertValidDate(dateA);
	assertValidDate(dateB);
	const timeDifference = dateA.getTime() - dateB.getTime();
	return timeDifference === 0 ? compareIds(idA, idB) : timeDifference;
}

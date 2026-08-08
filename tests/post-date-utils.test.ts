import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
	getFrontmatterScalar,
	isDateOnlyFrontmatterField,
} from "../src/utils/frontmatter-date.ts";
import {
	assertValidTimeZone,
	comparePublishedDatesAscending,
	comparePublishedDatesDescending,
	formatPostDateInTimeZone,
	formatPostDateWithLocale,
	getPostDatePartsInTimeZone,
} from "../src/utils/post-date-utils.ts";

describe("post date formatting", () => {
	it("keeps date-only frontmatter stable across host and site time zones", () => {
		const originalTimeZone = process.env.TZ;
		try {
			for (const hostTimeZone of [
				"UTC",
				"Asia/Shanghai",
				"America/Los_Angeles",
			]) {
				process.env.TZ = hostTimeZone;
				const published = new Date("2026-06-15");
				for (const siteTimeZone of [
					"UTC",
					"Asia/Shanghai",
					"Europe/Berlin",
					"America/New_York",
				]) {
					assert.equal(
						formatPostDateInTimeZone(published, siteTimeZone, true),
						"2026-06-15",
					);
				}
			}
		} finally {
			if (originalTimeZone === undefined) {
				delete process.env.TZ;
			} else {
				process.env.TZ = originalTimeZone;
			}
		}
	});

	it("converts precise timestamps with an explicit IANA site time zone", () => {
		const published = new Date("2026-06-15T03:14:03+08:00");

		assert.equal(
			formatPostDateInTimeZone(published, "Asia/Shanghai"),
			"2026-06-15",
		);
		assert.equal(formatPostDateInTimeZone(published, "UTC"), "2026-06-14");
		assert.equal(
			formatPostDateInTimeZone(published, "America/Los_Angeles"),
			"2026-06-14",
		);

		assert.deepEqual(getPostDatePartsInTimeZone(published, "Asia/Shanghai"), {
			year: 2026,
			month: 6,
			day: 15,
			hour: 3,
			minute: 14,
			second: 3,
		});
	});

	it("does not guess date-only semantics from a UTC-midnight timestamp", () => {
		const published = new Date("2026-06-15T00:00:00Z");

		assert.equal(
			formatPostDateInTimeZone(published, "America/New_York", false),
			"2026-06-14",
		);
		assert.equal(
			formatPostDateInTimeZone(published, "America/New_York", true),
			"2026-06-15",
		);
	});

	it("formats equivalent instants consistently and honors daylight saving time", () => {
		const offsetTimestamp = new Date("2026-06-15T03:14:03+08:00");
		const utcTimestamp = new Date("2026-06-14T19:14:03Z");

		assert.equal(offsetTimestamp.getTime(), utcTimestamp.getTime());
		assert.equal(
			formatPostDateInTimeZone(offsetTimestamp, "Asia/Shanghai"),
			formatPostDateInTimeZone(utcTimestamp, "Asia/Shanghai"),
		);

		assert.deepEqual(
			getPostDatePartsInTimeZone(
				new Date("2026-03-29T22:30:00Z"),
				"Europe/Berlin",
			),
			{
				year: 2026,
				month: 3,
				day: 30,
				hour: 0,
				minute: 30,
				second: 0,
			},
		);
	});

	it("uses the site time zone for localized visible dates", () => {
		const published = new Date("2026-06-15T03:14:03+08:00");
		assert.equal(
			formatPostDateWithLocale(published, "en-US", "Asia/Shanghai", {
				year: "numeric",
				month: "short",
				day: "numeric",
			}),
			"Jun 15, 2026",
		);
	});

	it("rejects invalid dates and unsupported time zones", () => {
		assert.throws(
			() => formatPostDateInTimeZone(new Date(Number.NaN), "UTC"),
			/Invalid published date/,
		);
		assert.throws(() => assertValidTimeZone("Mars/Olympus_Mons"), RangeError);
	});
});

describe("frontmatter date classification", () => {
	it("distinguishes date-only scalars from precise timestamps", () => {
		const frontmatter = `
published: 2026-06-15 # publish day
updated: "2026-06-16"
precise: 2026-06-15T00:00:00Z
quotedPrecise: '2026-06-15T03:14:03+08:00'
`;

		assert.equal(getFrontmatterScalar(frontmatter, "published"), "2026-06-15");
		assert.equal(getFrontmatterScalar(frontmatter, "updated"), "2026-06-16");
		assert.equal(isDateOnlyFrontmatterField(frontmatter, "published"), true);
		assert.equal(isDateOnlyFrontmatterField(frontmatter, "updated"), true);
		assert.equal(isDateOnlyFrontmatterField(frontmatter, "precise"), false);
		assert.equal(
			isDateOnlyFrontmatterField(frontmatter, "quotedPrecise"),
			false,
		);
		assert.equal(getFrontmatterScalar(frontmatter, "missing"), undefined);
	});
});

describe("published date ordering", () => {
	it("keeps full timestamp precision for same-day posts", () => {
		const older = new Date("2026-06-15T09:00:00+08:00");
		const newer = new Date("2026-06-15T18:00:00+08:00");

		assert.ok(
			comparePublishedDatesDescending(newer, older, "newer", "older") < 0,
		);
		assert.ok(
			comparePublishedDatesAscending(newer, older, "newer", "older") > 0,
		);
	});

	it("uses a deterministic id fallback for identical timestamps", () => {
		const published = new Date("2026-06-15");

		assert.equal(
			comparePublishedDatesDescending(published, published, "a-post", "b-post"),
			-1,
		);
		assert.equal(
			comparePublishedDatesDescending(published, published, "same", "same"),
			0,
		);
		assert.equal(
			comparePublishedDatesAscending(published, published, "b-post", "a-post"),
			1,
		);
	});
});

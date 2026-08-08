import { getSortedPosts } from "../../utils/content-utils";
import { formatDateToYYYYMMDD } from "../../utils/date-utils";

export async function GET() {
	const posts = await getSortedPosts();

	const allPostsData = posts.map((post) => {
		return {
			id: post.id,
			title: post.data.title,
			date: formatDateToYYYYMMDD(
				post.data.published,
				post.data._publishedDateOnly,
			),
		};
	});

	return new Response(JSON.stringify(allPostsData), {
		headers: {
			"Content-Type": "application/json",
		},
	});
}

import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";

// 실시간으로 랜더링해줘야 하는 페이지는 static 으로 할 수 없음.
// 조금이라도 최적화 하고싶으면 데이터 캐시만 설정할 수는 있음.
export default async function Page({
	searchParams,
}: {
	searchParams: {
		q?: string;
	};
}) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`,
		{ cache: "force-cache" }
	);

	if (!response.ok) {
		return <div>오류가 발생했습니다.</div>;
	}

	const books: BookData[] = await response.json();
	console.log(`fetchedBooks: ${JSON.stringify(books)}`);

	return (
		<div>
			{books.map((book) => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}
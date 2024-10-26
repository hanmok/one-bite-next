import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SearchResult({ q }: { q: string }) {
	await delay(1500);
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
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

// 실시간으로 랜더링해줘야 하는 페이지는 static 으로 할 수 없음.
// 조금이라도 최적화 하고싶으면 데이터 캐시만 설정할 수는 있음.
export default async function Page({
	searchParams,
}: {
	searchParams: {
		q?: string;
	};
}) {
	return (
		// Suspense: 한번 로딩상태 표시되면 다시 표시 못함. (해결책: key 설정 -> 새로운 컴포넌트로 인식하도록.)
		// key 값이 변할 때마다, 다시 로딩상태로 돌아가도록.
		<Suspense
			key={searchParams.q || ""}
			// fallback={<div>Loading...</div>}
			fallback={<BookListSkeleton count={3} />}
		>
			<SearchResult q={searchParams.q || ""} />
		</Suspense>
	);
}

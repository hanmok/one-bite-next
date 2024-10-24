import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";
import { cache } from "react";

export const dynamic = "error"; // 정말 특별한 경우 아니면 권장되지 않음. 자동으로 잘 해주기 때문에.
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto: 기본값, 아무것도 강제하지 않음.
// 2. force-dynamic : 페이지를 강제로 dynamic 페이지로 설정
// 3. force-static :  페이지를 강제로 static 페이지로 설정. dynamic 을 강제로 static 으로 변경 시 잘 작동하지 않을 수 있음. dynamic 한 값들이 모두 undefined 처리됨 ㅋㅋ
// 4. error : 페이지를 강제로 Static 페이지로 설정 (설정하면 안되는 이유 있다면 빌드 오류 발생시킴)

// Cache 없는 경우, 이 페이지를 포함하는 모든 페이지는 Dynamic 으로 설정됨.

async function AllBooks() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
		// { cache: "no-store" }
		{ cache: "force-cache" }
	);
	if (!response.ok) {
		return <div>오류가 발생했습니다 ...</div>;
	}

	const allBooks: BookData[] = await response.json();
	return (
		<div>
			{allBooks.map((book) => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}

async function RecoBooks() {
	// NEXT15: 아무것도 안넣으면 캐시되지 않는 것
	// NEXT14: 캐시 자동으로 됨.
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
		{ next: { revalidate: 3 } } // 포함하는 페이지까지 함께 revalidate
	);
	if (!response.ok) {
		return <div>오류가 발생</div>;
	}
	const recoBooks: BookData[] = await response.json();

	return (
		<div>
			{recoBooks.map((book) => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}

// serverComponent 라서 browser 에서는 console 안보임.
export default async function Home() {
	return (
		<div className={style.container}>
			<section>
				<h3>지금 추천하는 도서</h3>
				{/* {books.map((book) => (
					<BookItem key={book.id} {...book} />
				))} */}
				<RecoBooks />
			</section>
			<section>
				<h3>등록된 모든 도서</h3>
				<AllBooks />
			</section>
		</div>
	);
}

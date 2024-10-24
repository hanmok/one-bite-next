import { notFound } from "next/navigation";
import style from "./page.module.css";

// export const dynamicParams = false; // 1 2 3 외 경로는 404 로 표시

// 기본적으로 dynamic page.
// 어떤 parameter 가 들어올지 모름.
// static 으로 만들려면, 어떤게 올 수 있는지 알려줘야함.

export function generateStaticParams() {
	// Page Router 버전: getStaticPaths
	// 정적 파라미터를 생성하는 함수
	return [{ id: "1" }, { id: "2" }, { id: "3" }]; // 1,2,3 Page 를 빌드타임에 만들게 됨, 문자열로만 명시.
}

export default async function Page({
	params,
}: {
	params: { id: string | string[] };
}) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`
	);

	if (!response.ok) {
		if (response.status === 404) {
			notFound();
		}
		return <div>오류가 발생했습니다..</div>;
	}

	const book = await response.json();

	const { id, title, subTitle, description, author, publisher, coverImgUrl } =
		book;

	return (
		<div className={style.container}>
			<div
				className={style.cover_img_container}
				style={{ backgroundImage: `url('${coverImgUrl}')` }}
			>
				<img src={coverImgUrl} />
			</div>
			<div className={style.title}>{title}</div>
			<div className={style.subTitle}>{subTitle}</div>
			<div className={style.author}>
				{author} | {publisher}
			</div>
			<div className={style.description}>{description}</div>
		</div>
	);
}

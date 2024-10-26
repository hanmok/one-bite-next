"use client";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

// 서버든 클라이언트든 모두 대응할 수 있도록.

//Error: JS 에 존재하는 기본 Error Type
export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	const router = useRouter();

	useEffect(() => {
		console.error(error.message);
	}, []);

	return (
		<div>
			<h3>오류가 발생했습니다.</h3>
			<button
				onClick={() => {
					// reset(); // 브라우저 측에서만 다시 렌더링 (이미 있는 데이터로)
					// window.location.reload(); // 강제 새로고침. 각종 데이터가 싹 날아가긴 함.

					startTransition(() => {
						router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트만 다시 불러옴. 비동기 작업.
						reset(); // 에러상태를 초기화, 컴포넌트들 새롭게 다시 렌더링.
					});
				}}
			>
				다시 시도
			</button>
		</div>
	);
}

// 같은 경로 또는 하위 폴더의 에러 페이지

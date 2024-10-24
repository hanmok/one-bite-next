import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
        {/* 이제부터 안쪽 컴포넌트는 사전 렌더링에서 배제. 아래 컴포넌트의 비동기 작업이 완료될 때 까지. */}
				<Searchbar />
			</Suspense>
			{children}
		</div>
	);
}

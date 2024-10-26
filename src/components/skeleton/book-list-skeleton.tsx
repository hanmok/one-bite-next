import BookItemSkeleton from "./book-item-skeleton";

export default function BookListSkeleton({ count }: { count: number }) {
	// return <ul>{new Array(count).fill(<BookItemSkeleton />)}</ul>;
	return new Array(count)
		.fill(0)
		.map((_, idx) => (
			<BookItemSkeleton key={`book-item-skeleton-${idx}`} />
		));
}

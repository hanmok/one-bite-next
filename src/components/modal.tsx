"use client";

import { ReactNode } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: ReactNode }) {
	return createPortal(
		<dialog>{children}</dialog>,
		document.getElementById("modal-root") as HTMLElement
	);
}

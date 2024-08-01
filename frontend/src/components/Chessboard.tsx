import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "./message";

export const ChessBoard = ({
	board,
	socket,
}: {
	board: ({
		square: Square;
		type: PieceSymbol;
		color: Color;
	} | null)[][];
	socket: WebSocket;
}) => {
	const [from, setFrom] = useState<Square | null>(null);
	const [to, setTo] = useState<Square | null>(null);

	return (
		<div className="text-background">
			{board.map((row, i) => {
				return (
					<div key={i} className="flex">
						{row.map((square, j) => {
							const squareRepresentation = (65 +
								(j % 8) +
								"" +
								(8 - i)) as Square;
							return (
								<div
									onClick={() => {
										if (!from) {
											setFrom(squareRepresentation);
										} else {
											// setTo(square?.square ?? null);
											socket.send(
												JSON.stringify({
													type: MOVE,
													payload: {
														from,
														to: squareRepresentation,
													},
												})
											);
											setFrom(null);
											console.log({
												from,
												to: squareRepresentation,
											});
										}
									}}
									key={j}
									className={`w-16 h-16 ${
										(i + j) % 2 === 0 ? "bg-green" : "bg-text"
									}`}
								>
									<div className="w-full justify-center flex h-full">
										<div className="justify-center flex flex-col">
											{square ? square.type : ""}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

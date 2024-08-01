import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/Chessboard";
import { GAME_OVER, INIT_GAME, MOVE } from "../components/message";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const Game = () => {
	const socket = useSocket();
	const [chess, setChess] = useState(new Chess());
	const [board, setBoard] = useState(chess.board());

	useEffect(() => {
		if (!socket) {
			return;
		}
		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			console.log(message);
			switch (message.type) {
				case INIT_GAME:
					setChess(new Chess());
					setBoard(chess.board());
					console.log("Game Initialized");
					break;
				case MOVE:
					const move = message.payload;
					chess.move(move);
					setBoard(chess.board());
					console.log("Move Made");
					break;
				case GAME_OVER:
					console.log("Game Over");
					break;
			}
		};
	}, [socket]);

	if (!socket) {
		return <div>Connecting...</div>;
	} else {
		return (
			<div className="justify-center flex">
				<div className="pt-8 max-w-screen-lg w-full">
					<div className="grid grid-cols-6 gap-4 w-full">
						<div className="col-span-4 w-full flex justify-center">
							<ChessBoard socket={socket} board={board} />
						</div>
						<div className="col-span-2 w-full flex justify-center">
							<div className="pt-8">
								<Button
									onClick={() => {
										socket.send(
											JSON.stringify({
												type: INIT_GAME,
											})
										);
									}}
									children="Play"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

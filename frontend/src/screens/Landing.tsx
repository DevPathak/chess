import { useEffect, useState } from "react";
import { INIT_GAME } from "../components/message";

export const Landing = () => {
	const [socket, setSocket] = useState<null | WebSocket>(null);
	const [message, setMessage] = useState<any>([]);

	useEffect(() => {
		const socket = new WebSocket("ws://localhost:8080");
		socket.onopen = () => {
			setSocket(socket);
		};
		socket.onmessage = (message) => {
			setMessage(message);
		};
		return () => {
			socket.close;
		};
	}, []);

	const handleOnClickPlay = () => {
		if (socket) {
			socket.send(INIT_GAME);
		} else {
			console.log("Socket not yet initialized");
		}
	};

	return (
		<div>
			<div className="pt-8">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="flex justify-center">
						<img src="/chess.jpeg" className="max-w-96" />
					</div>
					<div>
						<h1 className="text-4xl font-bold text-text">
							Play Chess Online on the #1 Site!
						</h1>
						<div className="mt-4">
							<button
								className="bg-button hover:bg-text-700 font-bold py-2 px-4 rounded"
								onClick={() => {
									handleOnClickPlay;
								}}
							>
								Play Online
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

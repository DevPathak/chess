import { useEffect, useState } from "react";
import { INIT_GAME } from "../components/message";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Landing = () => {
	const [socket, setSocket] = useState<null | WebSocket>(null);
	const [message, setMessage] = useState<any>([]);

	const navigate = useNavigate();

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

	const init_game = {
		data: INIT_GAME,
	};

	const handleOnClickPlay = () => {
		console.log("inside on click handler");
		navigate("/game");
		if (socket) {
			socket.send(JSON.stringify(init_game));
			console.log(init_game);
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
							<Button
								onClick={() => {
									navigate("/game");
								}}
								children="Play Online"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

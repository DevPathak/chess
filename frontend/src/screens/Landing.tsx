export const Landing = () => {
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
							<button className="bg-white-500 hover:bg-blue-700 text-text font-bold py-2 px-4 rounded">
								Play Online
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

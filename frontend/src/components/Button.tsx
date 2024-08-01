export const Button = ({
	onClick,
	children,
}: {
	onClick: () => void;
	children: React.ReactNode;
}) => {
	return (
		<button onClick={onClick} className="bg-text">
			{children}
		</button>
	);
};

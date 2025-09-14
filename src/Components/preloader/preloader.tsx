export const Preloader = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
				<p className="mt-3 text-gray-500">Loading characters...</p>
			</div>
		</div>
	);
};

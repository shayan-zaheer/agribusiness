import React from "react";

function UserSelection() {
	return (
		<div>
			<div className="h-screen w-screen flex flex-col justify-between bg-field-image bg-cover bg-bottom text-white">
				<main className="flex flex-col items-center justify-center flex-grow">
					<h2 className="text-5xl font-bold mb-36 -mt-60">
						Who Are You?
					</h2>
					<div className="space-y-6">
						<button className="w-96 py-4 font-semibold bg-green-950 text-2xl border-2 border-black rounded-lg hover:bg-green-800 transition">
							Farmer
						</button>
						<br />
						<button className="w-96 py-4 font-semibold bg-green-950 text-2xl border-2 border-black rounded-lg hover:bg-green-800 transition">
							Buyer
						</button>
					</div>
				</main>
			</div>
		</div>
	);
}

export default UserSelection;
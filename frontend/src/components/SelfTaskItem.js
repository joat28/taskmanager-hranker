import React from "react";

const SelfTaskItem = (props) => {
	return (
		<React.Fragment>
			<li key={props.item._id}>
				<div className="px-4 py-4 sm:px-6">
					<div className="flex flex-col items-center justify-between text-left lg:flex-row">
						<p className="text-gray-700 items-start text-left">{props.item.title}</p>
						<div className="ml-2 flex-shrink-0 flex">
							<div className="px-5 py-2 m-1 inline-flex leading-5 font-semibold rounded-full bg-orange-100 text-yellow-800">
								<button onClick={props.onDeleteClick(props.item._id)}>
									Delete
								</button>
							</div>
							<div className="px-5 py-2 m-1  inline-flex leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
								<input
									type="email"
									placeholder="Share To email"
									id={props.item._id}
									className="text-xs mx-1 px-2"
								/>
								<button
									onClick={props.onShareClick(props.item.title, props.item._id)}
								>
									Share
								</button>
							</div>
						</div>
					</div>

					{props.item.shared_by && (
						<div className="mt-2 sm:flex sm:justify-between">
							<div className="sm:flex">
								<p className="flex items-center text-sm font-light text-gray-500">
									{"Shared by: " + props.item.shared_by}
								</p>
							</div>
						</div>
					)}
				</div>
			</li>
		</React.Fragment>
	);
};

export default SelfTaskItem;

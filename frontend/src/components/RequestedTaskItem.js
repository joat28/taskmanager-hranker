import React from 'react';

const RequestedTaskItem = (props) => {
    return (
			<React.Fragment>
				<li key={props.item._id}>
					<div className="px-4 py-4 sm:px-6">
						<div className="flex-col items-center justify-between text-left lg:flex-row ">
							<p className="text-gray-700">{props.item.title}</p>
							<div className="ml-2 flex-shrink-0 flex">
								<div className="px-5 py-2 m-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-black-800">
									<button onClick={props.onAcceptTask(props.item._id)}>Accept</button>
								</div>
								<div className="px-5 py-2 m-1 inline-flex leading-5 font-semibold rounded-full bg-orange-100 text-yellow-800">
									<button onClick={props.onRejectTask(props.item._id)}>Reject</button>
								</div>
							</div>
						</div>

						<div className="mt-2 sm:flex sm:justify-between">
							<div className="sm:flex">
								<p className="flex items-center text-sm font-light text-gray-500">
									~ {props.item.shared_by}
								</p>
							</div>
						</div>
					</div>
				</li>
			</React.Fragment>
		);
};

export default RequestedTaskItem;

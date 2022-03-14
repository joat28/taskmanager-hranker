import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../Auth";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import RequestedTaskItem from "../components/RequestedTaskItem";
import SelfTaskItem from "../components/SelfTaskItem";
import { BASE_URI } from "../config";
axios.defaults.withCredentials = true;

const backendUri = BASE_URI;

const Home = (props) => {
	const [user, setUser] = useState({});
	const [newTask, setTask] = useState("");

	useEffect(() => {
		const homeUrl = `${backendUri}/api/home`;
		axios
			.get(homeUrl)
			.then((res) => {
				console.log(res.data.data.username);
				setUser(res.data.data);
				return;
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.status === 401) {
					props.history.push("/auth/login");
				} else alert(error.response.data.message);
				return;
			});
	}, []);

	const onTaskChange = (event) => {
		setTask(event.target.value);
	};
	const onTaskAdd = (event) => {
		event.preventDefault();
		const addTaskUrl = `${backendUri}/api/home/add`;
		if (!newTask) return alert("Task can't be empty");
		axios
			.patch(addTaskUrl, { title: newTask })
			.then((res) => {
				setUser(res.data.data);
				console.log("user updated");
				return;
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.status === 401) {
					props.history.push("/auth/login");
				} else alert(error.response.data.message);
				return;
			});
	};

	const onDeleteClick = (id) => (event) => {
		event.preventDefault();
		const deleteTaskUrl = `${backendUri}/api/home/delete/${id}`;

		axios
			.patch(deleteTaskUrl)
			.then((res) => {
				console.log(res.data.data.tasks);
				setUser(res.data.data);
				console.log("user updated (deleted)");
				return;
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.status === 401) {
					props.history.push("/auth/login");
				} else alert(error.response.data.message);
				return;
			});
	};
	const onShareClick = (title, id) => (event) => {
		event.preventDefault();
		const shareTo = document.getElementById(id).value;
		console.log("Shareto given in input", shareTo);
		const shareTaskUrl = `${backendUri}/api/home/share`;
		axios
			.patch(shareTaskUrl, { title, shareTo })
			.then((res) => {
				console.log(res.data);
				console.log("shared successfully");
				alert("Task shared!");
				return;
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.status === 401) {
					props.history.push("/auth/login");
				} else alert(error.response.data.message);
				return;
			});
	};
	const onAcceptTask = (id) => (event) => {
		event.preventDefault();
		const acceptTaskUrl = `${backendUri}/api/home/accept/${id}`;
		axios
			.patch(acceptTaskUrl)
			.then((res) => {
				console.log(res.data.data.tasks);
				setUser(res.data.data);
				console.log("accepted successfully");
				return;
			})
			.catch((error) => {
				console.log(error);
				return;
			});
	};
	const onRejectTask = (id) => (event) => {
		event.preventDefault();
		const rejectTaskUrl = `${backendUri}/api/home/reject/${id}`;
		axios
			.patch(rejectTaskUrl)
			.then((res) => {
				console.log(res.data.data.tasks);
				setUser(res.data.data);
				console.log("rejected successfully");
				return;
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.status === 401) {
					props.history.push("/auth/login");
				} else alert(error.response.data.message);
				return;
			});
	};
	const onLogoutClick = () => {
		Auth.logout(() => {
			props.history.push("/auth/login");
		});
	};
	return (
		<React.Fragment>
			{user.username && <Nav user={user} logout={onLogoutClick} />}
			<div className="w-full mx-auto my-10 justify-center items-center md:w-3/4">
				{user.username && (
					<form className="flex flex-row items-center my-2">
						<input
							type="text"
							placeholder="Enter Task to add"
							onChange={onTaskChange}
							className="m-auto px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative rounded text-sm border-0 shadow  focus:outline-none focus:ring w-full bg-purple-50"
						/>

						<button
							type="button"
							onClick={onTaskAdd}
							className="text-white ml-2 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-3 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
						>
							Add Task +
						</button>
					</form>
				)}
			</div>
			<div className="flex h-500 mx-auto w-full overflow-auto bg-purple-50 md:w-3/4">
				{user.username && (
					<div className="w-3/4 h-screen mx-auto my-10 justify-center items-center ">
						<div className="bg-indigo-700 px-4 py-5 border-b rounded-t sm:px-6">
							<h3 className="text-lg leading-6 font-medium text-white">
								Requested Tasks
							</h3>
						</div>

						<ul className="divide-y divide-gray-200 overflow-auto">
							{user.requested
								.slice(0)
								.reverse()
								.map((item) => (
									<RequestedTaskItem
										onRejectTask={onRejectTask}
										onAcceptTask={onAcceptTask}
										item={item}
									/>
								))}
							<li>
								<div className="px-4 py-4 sm:px-6">
									<div className="flex items-center justify-between">
										<p className=" text-xs text-gray-700 ">
											No More requests !
										</p>
									</div>
								</div>
							</li>
						</ul>
						<div className="bg-indigo-700 px-4 py-5 border-b rounded-t sm:px-6">
							<h3 className="text-lg leading-6 font-medium text-white">
								Your Tasks
							</h3>
						</div>
						<ul className="divide-y divide-gray-200">
							{user.tasks
								.slice(0)
								.reverse()
								.map((item) => (
									<SelfTaskItem
										item={item}
										onDeleteClick={onDeleteClick}
										onShareClick={onShareClick}
									/>
								))}
							<li>
								<div className="px-4 py-4 sm:px-6">
									<div className="flex items-center justify-between">
										<p className=" text-xs text-gray-700 ">No More tasks !</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				)}
			</div>
			<Footer />
		</React.Fragment>
	);
};

export default Home;

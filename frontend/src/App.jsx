import axios from "axios"
import { useEffect, useState } from "react"
function App() {
	const [name, setName] = useState("salut")
	const [notification, setNotification] = useState([])
	useEffect(() => {
		axios
			.get("http://localhost:3001/notification")
			.then((res) => setNotification(res.data))
			.catch((err) => console.error(err))
	}, [])
	function createNotif() {
		axios
			.post("http://localhost:3001/notification", { nom: name })
			.catch((err) => console.error(err))
	}
	return (
		<div className="flex min-h-screen flex-col items-center bg-primary">
			<div className="flex w-full items-center gap-[50px] p-[10px]">
				<h1 className="text-3xl font-bold text-white">Network Addons</h1>
				<div className="cursor-pointer">
					<p className="text-xl text-gray-300">Notifications</p>
				</div>
			</div>
			<div
				className="mt-[50px] rounded-md bg-secondary px-[10px] py-[5px]"
				onClick={() => createNotif()}
			>
				<p className="text-xl text-white">Create a notification</p>
			</div>
			<div className="mt-[50px] w-[650px] max-w-[95%] rounded-md border-2 border-gray-300/50">
				<div className="flex w-full justify-between border-b-2 border-gray-500/50 px-[10px]">
					<p className="text-2xl text-white">Notifications</p>
					<p className="text-xl text-blue-600">Mark all as read</p>
				</div>
				<div>
					{notification.map((notifs, index) => (
						<div key={index}>
							<p>{notifs.nom}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default App

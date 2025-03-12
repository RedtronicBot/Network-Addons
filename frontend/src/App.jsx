import axios from "axios"
import { useEffect, useRef, useState } from "react"
function App() {
	const [name, setName] = useState("salut")
	const [notification, setNotification] = useState([])
	const [openNotifMenu, setOpenNotifMenu] = useState(false)
	const [typeNotif, setTypeNotif] = useState([
		"message",
		"friend_request",
		"event_invite",
		"group_invite",
		"comment",
		"like",
		"share",
		"mention",
		"system"
	])
	const [typeNotifUser, setTypeNotifUser] = useState("")
	const notifRef = useRef(null)
	/*Récupération des notifications dans la bdd au montage*/
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
	/*Fermeture du menu de notif au clic extérieur au menu*/
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (notifRef.current && event.target === notifRef.current) {
				setOpenNotifMenu(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [openNotifMenu])
	return (
		<div className="flex min-h-screen flex-col items-center bg-primary">
			<div className="flex w-full items-center gap-[50px] p-[10px]">
				<h1 className="text-3xl font-bold text-white">Network Addons</h1>
				<div className="cursor-pointer">
					<p className="text-xl text-gray-300">Notifications</p>
				</div>
			</div>
			<div
				className="mt-[50px] cursor-pointer select-none rounded-md bg-secondary px-[10px] py-[5px]"
				onClick={() => setOpenNotifMenu(!openNotifMenu)}
			>
				<p className="text-xl text-white">Create a notification</p>
			</div>
			<div
				className={`${openNotifMenu ? "flex" : "hidden"} absolute min-h-screen w-full items-center justify-center bg-black/40`}
				ref={notifRef}
			>
				<div className="flex h-[70vh] w-[650px] max-w-[95%] flex-col items-center gap-[10px] rounded-lg bg-secondary py-[20px]">
					<input
						type="text"
						placeholder="Title"
						className="h-10 w-[70%] rounded-sm bg-gray-500 pl-2 text-xl text-gray-100"
					/>
					<div className="flex w-[72%]">
						<p className="text-xl text-white">Context</p>
					</div>
					<textarea className="h-[70px] w-[70%] rounded-sm bg-gray-500 pl-2 text-xl text-gray-100"></textarea>
					<div className="mt-[10px] flex w-[72%]">
						<p className="text-xl text-white">Notification Type</p>
					</div>
					<div className="flex w-[70%] flex-wrap justify-center gap-[10px]">
						{typeNotif.map((notifs, index) => (
							<div
								key={index}
								className={`rounded-lg ${typeNotifUser === notifs ? "bg-tertiaryClick" : "bg-tertiary"} cursor-pointer select-none px-[10px] py-[5px]`}
								onClick={() => setTypeNotifUser(notifs)}
							>
								<p className="text-xl text-white">
									{notifs
										.replace(/_/g, " ")
										.replace(/\b\w/g, (c) => c.toUpperCase())}
								</p>
							</div>
						))}
					</div>
				</div>
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

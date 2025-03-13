import axios from "axios"
import { useEffect, useRef, useState } from "react"
function App() {
	const [notification, setNotification] = useState([])
	const [openNotifMenu, setOpenNotifMenu] = useState(false)
	const [typeNotif, setTypeNotif] = useState([])
	const [typeNotifUser, setTypeNotifUser] = useState("")
	const notifRef = useRef(null)
	const [priorityNotif, setPriorityNotif] = useState([])
	const [priorityNotifUser, setPriorityNotifUser] = useState("")
	const titleRef = useRef(null)
	const contentRef = useRef(null)
	const [titleError, setTitleError] = useState(false)
	const [contentError, setContentError] = useState(false)
	const [typeError, setTypeError] = useState(false)
	const [priorityError, setPriorityError] = useState(false)
	/*Récupération des notifications dans la bdd au montage*/
	useEffect(() => {
		axios
			.get("http://localhost:3001/notification")
			.then((res) => setNotification(res.data))
			.catch((err) => console.error(err))
		axios
			.get("http://localhost:3001/notificationtype")
			.then((res) => setTypeNotif(res.data))
			.catch((err) => console.error(err))
		axios
			.get("http://localhost:3001/notificationpriority")
			.then((res) => setPriorityNotif(res.data))
			.catch((err) => console.error(err))
	}, [])
	function createNotif() {
		setTitleError(false)
		setTypeError(false)
		setPriorityError(false)
		setContentError(false)
		if (
			titleRef.current.value === "" ||
			typeNotifUser === "" ||
			priorityNotifUser === "" ||
			contentRef.current.value === ""
		) {
			if (titleRef.current.value === "") {
				setTitleError(true)
			}
			if (typeNotifUser === "") {
				setTypeError(true)
			}
			if (priorityNotifUser === "") {
				setPriorityError(true)
			}
			if (contentRef.current.value === "") {
				setContentError(true)
			}
		} else {
			const today = new Date()
			const expirationDate = new Date()
			expirationDate.setMonth(expirationDate.getMonth() + 3)
			axios
				.post("http://localhost:3001/notification", {
					title: titleRef.current.value,
					content: contentRef.current.value,
					type: typeNotifUser,
					priority: priorityNotifUser,
					read: false,
					created_at: today,
					expires_at: expirationDate
				})
				.then((res) =>
					setNotification((prevNotifications) => [res.data.data, ...prevNotifications])
				)
				.catch((err) => console.error(err))
			setOpenNotifMenu(false)
		}
	}
	/*Modification de l'état "Read" de la notification*/
	function modifyReadNotification(notif) {
		const today = new Date()
		if (notif.read === false) {
			axios
				.put("http://localhost:3001/notification", {
					id: notif._id,
					date: today
				})
				.then((res) =>
					setNotification((prevNotifications) =>
						prevNotifications.map((notifs) =>
							notifs._id === notif._id ? res.data.data : notifs
						)
					)
				)
				.catch((err) => console.error(err))
		}
	}
	/*Modification de toute les notification en lue*/
	function updateAllNotification() {
		const today = new Date()
		axios
			.put("http://localhost:3001/notification/all")
			.then((res) =>
				setNotification((prevNotifications) =>
					prevNotifications.map((notif) => ({ ...notif, read: true, date: today }))
				)
			)
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
	/*Fonction pour caluler la différence entre la date de création de notif et aujourd'hui*/
	function getRelativeTime(date) {
		const now = new Date()
		const diffMs = now - new Date(date)
		const diffSec = Math.floor(diffMs / 1000)
		const diffMin = Math.floor(diffSec / 60)
		const diffHours = Math.floor(diffMin / 60)
		const diffDays = Math.floor(diffHours / 24)
		const diffMonth = Math.floor(diffDays / 30)
		if (diffSec < 60) return `il y a ${diffSec} sec`
		if (diffMin < 60) return `il y a ${diffMin} min`
		if (diffHours < 24) return `il y a ${diffHours} h`
		if (diffDays < 30) return `il y a ${diffDays} j`
		if (diffMonth < 12) return `il y a ${diffMonth} mois`
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
				className="mt-[50px] cursor-pointer select-none rounded-md bg-secondary px-[10px] py-[5px]"
				onClick={() => setOpenNotifMenu(!openNotifMenu)}
			>
				<p className="text-xl text-white">Create a notification</p>
			</div>
			<div
				className={`${openNotifMenu ? "flex" : "hidden"} absolute min-h-screen w-full cursor-pointer items-center justify-center bg-black/40`}
				ref={notifRef}
			>
				<div className="flex w-[650px] max-w-[95%] cursor-default flex-col items-center gap-[10px] rounded-lg bg-secondary py-[20px]">
					<div className="flex w-[70%] flex-col">
						<p className={`${titleError ? "flex" : "hidden"} text-red-600`}>
							title needed
						</p>
						<input
							type="text"
							placeholder="Title"
							className="h-10 w-full rounded-sm bg-gray-500 pl-2 text-xl text-gray-100"
							ref={titleRef}
						/>
					</div>
					<div className="flex w-[72%]">
						<p className="text-xl text-white">Content</p>
					</div>
					<div className="flex w-[70%] flex-col">
						<p className={`${contentError ? "flex" : "hidden"} text-red-600`}>
							content needed
						</p>
						<textarea
							className="h-[70px] w-full rounded-sm bg-gray-500 pl-2 text-xl text-gray-100"
							ref={contentRef}
						></textarea>
					</div>
					<div className="mt-[10px] flex w-[72%] flex-col">
						<p className="text-xl text-white">Notification Type</p>
						<p className={`${typeError ? "flex" : "hidden"} text-red-600`}>
							choose a type
						</p>
					</div>
					<div className="flex w-[70%] flex-wrap justify-center gap-[10px]">
						{typeNotif.length > 0 &&
							typeNotif.map((notifs, index) => (
								<div
									key={index}
									className={`rounded-lg ${typeNotifUser === notifs.name ? "bg-tertiaryClick" : "bg-tertiary"} cursor-pointer select-none px-[10px] py-[5px]`}
									onClick={() => setTypeNotifUser(notifs.name)}
								>
									<p className="text-xl text-white">
										{notifs.name
											.replace(/_/g, " ")
											.replace(/\b\w/g, (c) => c.toUpperCase())}
									</p>
								</div>
							))}
					</div>
					<div className="mt-[10px] flex w-[72%] flex-col">
						<p className="text-xl text-white">Notification Priority</p>
						<p className={`${priorityError ? "flex" : "hidden"} text-red-600`}>
							choose a priority
						</p>
					</div>
					<div className="flex w-[70%] flex-wrap justify-center gap-[10px]">
						{priorityNotif.length > 0 &&
							priorityNotif.map((priority, index) => (
								<div
									key={index}
									className={`rounded-lg ${priorityNotifUser === priority.name ? "bg-tertiaryClick" : "bg-tertiary"} cursor-pointer select-none px-[10px] py-[5px]`}
									onClick={() => setPriorityNotifUser(priority.name)}
								>
									<p className="text-xl text-white">{priority.name}</p>
								</div>
							))}
					</div>
					<div className="mt-[20px] rounded-md bg-tertiary px-[8px] py-[5px]">
						<p className="text-2xl font-bold text-white" onClick={() => createNotif()}>
							Create
						</p>
					</div>
				</div>
			</div>
			<div className="mt-[50px] w-[650px] max-w-[95%] rounded-md border-2 border-gray-300/50">
				<div className="flex w-full justify-between border-b-2 border-gray-500/50 px-[10px]">
					<p className="text-2xl text-white">Notifications</p>
					<p
						className="cursor-pointer text-xl text-blue-600"
						onClick={() => updateAllNotification()}
					>
						Mark all as read
					</p>
				</div>
				<div>
					{notification
						.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
						.map((notifs, index) => (
							<div
								key={index}
								className={`flex flex-col gap-[10px] border-b-2 border-gray-500/50 ${notifs.read ? "bg-transparent" : "bg-secondary"} px-[10px] py-[20px]`}
								onClick={() => modifyReadNotification(notifs)}
							>
								<div className="flex justify-between">
									<p className="text-white">{notifs.title}</p>
									<p className="text-white">
										{getRelativeTime(notifs.created_at)}
									</p>
								</div>
								<p className="text-white">{notifs.content}</p>
								<div className="flex items-center gap-[10px]">
									<div
										className={`w-fit rounded-xl ${notifs.priority === "low" ? "bg-green-800" : notifs.priority === "medium" ? "bg-orange-500" : "bg-red-700"} px-[7px] py-[5px]`}
									>
										<p className="text-white">{notifs.priority} priority</p>
									</div>
									<div
										className={`${notifs.read ? "hidden" : "flex"} items-baseline justify-center gap-[5px]`}
									>
										<div className="h-[8px] w-[8px] rounded-[100%] bg-blue-600"></div>
										<p className="text-blue-600">new</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default App

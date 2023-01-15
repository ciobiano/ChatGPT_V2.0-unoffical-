import "./App.css";
import "./normal.css";
import { useState, useEffect} from "react";

function App() {
	 useEffect(() => {
			getModels();
		}, []);

		// Declare state variables for input, models, current model, and chat log
		const [input, setInput] = useState("");
		const [models, setModels] = useState([]);
		const [currentModel, setCurrentModel] = useState("text-davinci-003");
		const [chatLog, setChatLog] = useState([
			{
				user: "gpt",
				message: "How can I help you?",
			},
		]);

		// function to clear the chat log
		const clearChatLog = () => {
			setChatLog([]);
		};

		// function to fetch the list of available models from the local server
		function getModels() {
			fetch("http://localhost:3080/models")
				.then((response) => response.json())
				.then((data) => setModels(data.models.data));
		}

		// Define a function to handle the form submission
		async function handleSubmit(e) {
			// Prevent the default form submission behavior
			e.preventDefault();

			// Add the user's input to the chat log
			let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
			// Clear the input field
			setInput("");
			// Update the chat log state
			setChatLog(chatLogNew);

			// Map the chat log array to a string with newline separators
			const messages = chatLogNew.map((message) => message.message).join("\n");
			// Send a POST request to the local server with the chat log and the current model
			const response = await fetch("http://localhost:3080", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: messages,
					currentModel,
				}),
			});

			// Update the chat log with the response from the server
			const data = await response.json();
			setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
		}
	return (
		<div className="App absolute top-0 right-0 bottom-0 left-0">
			<aside className=" bg-[var(--text-primary)] w-[260px] p-[10px]">
				<div className="p-[12px] border  rounded-[5px] text-left hover:bg-[rgba(255,255,255,0.1)] transition-all">
					<span className="pl-6 pr-12 ">+</span>
					New chat
				</div>
				<div className="Models flex items-center mt-[24px] w-full">
					<select
						className="w-full bg-[var(--text-primary)] text-white border-none outline-none shadow-[0_8px_4px_0_rgba(0,0,0,0.25)] p-[12px] rounded-[5px] text-[1.2rem]"
						onChange={(e) => {
							setCurrentModel(e.target.value);
						}}
					>
						{models.map((model) => (
							<option  className+id={model.id}>{model.id}</option>
						))}
					</select>
				</div>
			</aside>
			<section className="chatbox flex-[1] relative ">
				<div className=" chat-log text-left">
					{chatLog.map((message) => (
						<ChatMessage message={message} />
					))}
				</div>
				<div className="input-chat-button p-[24 px] absolute bottom-0 left-0 right-0 ">
					<form
						className="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6"
						onSubmit={handleSubmit}
					>
						<div className="relative flex h-full flex-1 md:flex-col">
							<div className="ml-1 mt-1.5 md:w-full md:m-auto md:flex md:mb-2 gap-2 justify-center">
								<div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-[#40414f] dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
									<input
										className="w-full h-full px-4 py-2 text-sm text-white placeholder-gray-500 bg-transparent border-none outline-none resize-none"
										rows={1}
										value={input}
										onChange={(e) => setInput(e.target.value)}
										placeholder="Type your message here"
									></input>
								</div>
							</div>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
}


const ChatMessage = ({ message}) => {
	return (
		<div className={` chat-message bg-[var (--text-default)] ${message.user === "gpt" && "chatgpt"}`}>
			<div className="chat-message-center  max-w-[640px] mx-auto flex p-[12px]  px-[24px]">
				<div
					className={`avatar rounded-[50%] w-[40px] h-[40px] ${
						message.user === "gpt" && "chatgpt"
					}`}
				>
					{message.user === "gpt" && (
						<svg
							transform="scale(0.8)"
							width={41}
							height={41}
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							strokeWidth={1.5}
							className="h-6 w-6"
						>
							<path
								d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
								fill="currentColor"
							/>
						</svg>
					)}
				</div>
				<div className="message px-[40px]">{message.message}</div>
			</div>
		</div>
	);
}

export default App;

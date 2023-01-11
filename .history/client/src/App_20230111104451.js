import "./App.css";
import "./normal.css";
import { useState } from "react";

function App() {
	const [input, setInput] = useState("");
	const [chatLog, setChatLog] = useState([]);
	async function handleSubmit(e) {
		e.preventDefault();
		setChatLog(chatLog, {user:'me', message:`${input}`})
		setInput("");

	}
	return (
		<div className="App absolute top-0 right-0 bottom-0 left-0">
			<aside className=" bg-[var(--text-primary)] w-[260px] p-[10px]">
				<div className="p-[12px] border  rounded-[5px] text-left hover:bg-[rgba(255,255,255,0.1)] transition-all">
					<span className="pl-6 pr-12 ">+</span>
					New chat
				</div>
			</aside>
			<section className="chatbox flex-[1] relative ">
				<div className=" chat-log text-left">
					<ChatMessage message={message}/>
					<div className=" chat-message bg-[var(--text-secondary)]  ">
						<div className="chat-message-center  max-w-[640px] mx-auto flex p-[12px]  px-[24px]">
							<div className="chat-avatar bg-[var(--color-primary)] rounded-[50%] w-[40px] h-[40px] items-center justify-center">
								
							</div>
							<div className="message px-[40px]">Hello world</div>
						</div>
					</div>
				</div>
				<div className="input-chat-button p-[24 px] absolute bottom-0 left-0 right-0 ">
					<form onSubmit={handleSubmit}>
						<input
							rows={1}
							value={input}
							onChange={() => setInput(e.target.value)}
							placeholder="Type your message here"
						></input>
					</form>
				</div>
			</section>
		</div>
	);
}


const ChatMessage = ({ message}) => {
	return (
		<div className={` chat-message ${message.user === "gpt" && "chatgpt"}`}>
			<div className="chat-message-center  max-w-[640px] mx-auto flex p-[12px]  px-[24px]">
				<div
					className={`chat-avatar bg-white rounded-[50%] w-[40px] h-[40px] ${message.user === "gpt" && "chatgpt"}`}
				>
					{}
				</div>
				<div className="message px-[40px]">
					{message.message}
				</div>
			</div>
		</div>
	);
}

export default App;

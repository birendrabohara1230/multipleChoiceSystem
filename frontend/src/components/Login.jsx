import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [flag, setFlag] = useState(false)
    const navigate = useNavigate()
    async function handleLogin() {
        try {
            const response = await axios.post("http://localhost:3000/user/signin", {
                username,
                password,
            })
            navigate("/home")
        } catch (error) {
            setFlag(true)
            setTimeout(() => {
                setFlag(false)
            }, 3000);
        }
    }

    return (
        <div className="flex justify-center">
            <div className="p-10 bg-slate-700 mt-10 rounded-3xl shadow-xl flex flex-col gap-2">
                {
                    flag ? (
                        <p className="text-white">User Does Exists</p>
                    ) : (
                        ""
                    )
                }
                <input className="p-2 text-white bg-slate-900 rounded-md m-1"
                    type="text"
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value)
                    }}
                />
                <input
                    className="p-2 text-white bg-slate-900 rounded-md m-1"
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />
                <div className="flex justify-evenly">
                    <div>
                        <button
                            className="text-white bg-slate-900 p-4  rounded-lg cursor-pointer hover:bg-slate-800
                            hover:text-green-700
                            "
                            onClick={handleLogin}
                        >
                            Signup
                        </button>
                    </div>
                    <div>
                        <button
                            className="text-white bg-slate-900 p-4  rounded-lg cursor-pointer hover:bg-slate-800"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
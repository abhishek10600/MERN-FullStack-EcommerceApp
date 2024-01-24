import { useState } from "react"
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [gender,setGender] = useState<string>("");
    const [date,setDate] = useState("");
  return (
    <div className="login">
        <main>
            <h1 className="heading">Login</h1>
            <div>
                <label className="">Gender</label>
                <select name="" value={gender} onChange={(ev)=>setGender(ev.target.value)}>
                    <option value="">Select gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                </select>
            </div>
            <div>
                <label className="">Date of birth</label>
                <input type="date" value={date} onChange={(ev)=>setDate(ev.target.value)}/>
            </div>
            <div>
                <p>Already Signed in once?</p>
                <button>
                    <FcGoogle/>
                    <span>Signin with Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login
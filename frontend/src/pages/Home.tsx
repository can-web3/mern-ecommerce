import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"

export default function Home() {
  const { auth } = useContext(AuthContext)

  return (
    <div>
      Home
      { JSON.stringify(auth, null, 2) }
    </div>
  )
}

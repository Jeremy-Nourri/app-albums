import { useNavigate, Link } from "react-router-dom"
import { Outlet } from "react-router-dom"

function App() {

  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-primary text-white">
        <Link to="/">
          <h1 className="text-3xl font-bold">Application Albums</h1>
        </Link>

        <button onClick={() => navigate("/albums/add")} className="btn btn-secondary">
          Ajouter un album
        </button>
      </header>
      <main>

        <Outlet />

      </main>

      <footer>

      </footer>
     
    </>
  )
}

export default App

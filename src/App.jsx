import { useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import ModalFormAuth from "./components/features/Auth/ModalFormAuth"
import { logOut, openModal } from "./components/features/Auth/authSlice"

function App() {

  const isLogin = useSelector(state => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-primary text-white">
        <Link to="/">
          <h1 className="text-3xl font-bold">Application Albums</h1>
        </Link>

        {isLogin ? (
          <div className="flex gap-4">
            <button onClick={() => navigate("/albums/add")} className="btn btn-secondary">
              Ajouter un album
            </button>
            <button onClick={() => dispatch(logOut())} className="btn btn-secondary">
                Se déconnecter
            </button>
          </div>
        ) : (
          <button onClick={() => dispatch(openModal())}
           className="btn btn-secondary">
            Se connecter
          </button>
        )}

      </header>
      <main>

        <Outlet />

      </main>

      <footer>

      </footer>

      <ModalFormAuth />
    </>
  )
}

export default App

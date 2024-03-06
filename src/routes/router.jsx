import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import FormAlbum from "../components/features/Albums/FormAlbum";
import HomePage from "../components/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <HomePage />
          },
            {
                path: "/albums/add",
                element: <FormAlbum />
            },
            {
                path: "/albums/update/",
                element: <FormAlbum />
            }
        ]
    }
]);

export default router;
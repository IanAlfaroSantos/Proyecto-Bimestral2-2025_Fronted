import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import routes from "./routes.jsx";
import './App.css'

export const App = () => {

  let element = useRoutes(routes);

  return (
    <>
      {element}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </>
  )
}
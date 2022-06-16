/**
 * Main application entrypoint.
 */

// External imports.
import React from "react"
import ReactDOM from "react-dom/client"

// Utility imports.
import { useMotd } from "@utils/motd"

// Style imports.
import "@fontsource/inter/latin.css"
import "@styles"

/**
 * Main application component.
 */
function App() {
  const motd = useMotd()

  return (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-xl">{motd}</p>
    </div>
  )
}

// Render the application to DOM.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

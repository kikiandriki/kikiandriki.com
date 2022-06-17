/**
 * Main application entrypoint.
 */

// External imports.
import React, { ReactNode } from "react"
import ReactDOM from "react-dom/client"
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"

// Component imports.
import { Shell } from "@components/utility"

// Utility imports.
import { useMotd } from "@utils/motd"
import { RequireAuth } from "@utils/auth"

// Style imports.
import "@fontsource/inter/latin.css"
import "@styles"

/**
 * Main application component.
 */
function App() {
  const motd = useMotd()
  const navigate = useNavigate()
  return (
    <Auth0Provider
      domain="kikiandriki.us.auth0.com"
      clientId="yP97KLdN6Jzx4BUo0WZMVM1NubnfQf32"
      redirectUri={window.location.origin}
      connection="discord"
      useRefreshTokens={true}
      cacheLocation="localstorage"
      onRedirectCallback={(state) => {
        navigate(state?.returnTo || window.location.pathname, { replace: true })
      }}
    >
      <Shell>
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen flex flex-col justify-center items-center">
                <p className="text-xl">{motd}</p>
              </div>
            }
          />
          <Route
            path="/private"
            element={
              <RequireAuth>
                <Private />
              </RequireAuth>
            }
          />
        </Routes>
      </Shell>
    </Auth0Provider>
  )
}

function Private() {
  const { logout } = useAuth0()
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <p>This is an example of a private page.</p>
      <br />
      <p>
        This page is only accessible to viewers
        <br />
        who have logged in with Discord.
      </p>
      <br />
      <p>
        In the future,
        <br />
        this page will only be accessible to logged in users
        <br />
        who are also members of the server.
      </p>
    </div>
  )
}

// Render the application to DOM.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)

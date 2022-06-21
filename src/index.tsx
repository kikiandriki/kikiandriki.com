/**
 * Main application entrypoint.
 */

// External imports.
import React from "react"
import ReactDOM from "react-dom/client"
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import { Auth0Provider } from "@auth0/auth0-react"

// Page imports.
import Member from "@pages/members/member"

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
      audience="kikiandriki"
      scope="openid identify disque"
      onRedirectCallback={(state) => {
        navigate(state?.returnTo || window.location.pathname, { replace: true })
      }}
    >
      <Shell>
        <Routes>
          <Route
            path="/"
            element={
              <div className="h-full flex flex-col justify-center items-center">
                <p className="text-xl">{motd}</p>
              </div>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <RequireAuth>
                <Member />
              </RequireAuth>
            }
          />
        </Routes>
      </Shell>
    </Auth0Provider>
  )
}

// Render the application to DOM.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
)

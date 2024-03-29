/**
 * Auth utilities.
 */

// External imports.
import { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { useAuth0, User } from "@auth0/auth0-react"

// Component imports.
import { NonMemberWarning, Loading } from "@components/utility"

// Utility imports.
import { useMembership } from "@utils/api/disque"

/**
 * Hook to get access to the user.
 */
export function useUser(): User {
  const { pathname } = useLocation()
  const { user, loginWithRedirect } = useAuth0()
  if (!user) return loginWithRedirect({ appState: { returnTo: pathname } })
  return user
}

/**
 * Component wrapper to require auth.
 */
export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation()
  const auth = useAuth0()
  const membership = useMembership()
  // If the user is not authenticated, send them to the login.
  if (!auth.isAuthenticated) {
    return (
      <>
        <p>Please log in.</p>
        {auth.loginWithRedirect({ appState: { returnTo: pathname } })}
      </>
    )
  }
  // Display loading if loading.
  if (auth.isLoading || membership.isLoading) {
    return (
      <div className="h-full flex items-stretch">
        <Loading />
      </div>
    )
  }
  // If the user is not a member, show the non-membership error.
  if (!membership.data) {
    return (
      <div className="h-full flex items-stretch">
        <NonMemberWarning />
      </div>
    )
  }
  // If the user is authenticated, show the children.
  if (auth.isAuthenticated && auth.user && membership.data) {
    return <>{children}</>
  }
  // In all other cases, display an error.
  return <p>{auth.error?.message ?? "An error has occurred."}</p>
}

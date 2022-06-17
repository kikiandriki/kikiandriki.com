/**
 * Application shell component.
 *
 * Only current use is to display a loading screen when auth is loading.
 */

// External imports.
import { useAuth0 } from "@auth0/auth0-react"
import { ReactNode } from "react"

// Component imports.
import { Loading } from "@components/utility"

/**
 * Application shell.
 */
export function Shell({ children }: { children?: ReactNode }) {
  const { isLoading } = useAuth0()
  if (isLoading) {
    return (
      <div className="min-h-screen w-screen flex items-stretch">
        <Loading />
      </div>
    )
  }
  return <>{children}</>
}

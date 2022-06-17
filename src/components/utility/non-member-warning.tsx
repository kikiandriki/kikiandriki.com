/**
 * Non-member warning component.
 *
 * Displays when a logged in user is not a member of the Discord server.
 */

// External imports.
import { useAuth0 } from "@auth0/auth0-react"
import { ExclamationCircleIcon, LogoutIcon } from "@heroicons/react/outline"

/**
 * React component.
 */
export function NonMemberWarning() {
  const { logout } = useAuth0()
  return (
    <div className="min-w-full min-h-full flex flex-col justify-center items-center">
      <ExclamationCircleIcon className="w-16 h-16 text-red-500" />
      <h1 className="text-red-500 text-2xl font-semibold mt-4 mb-8">
        You are not a member of the Discord server.
      </h1>
      <button
        className="inline-flex items-center px-3 py-3 border border-transparent text-base font-medium rounded-2xl shadow-sm text-red-500 bg-red-100 hover:bg-red-500 hover:text-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        <LogoutIcon className="h-5 w-5" />
      </button>
    </div>
  )
}

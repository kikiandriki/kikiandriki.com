/**
 * Loading animation component.
 */

import Logo from "@assets/logo.png"

export function Loading() {
  return (
    <div className="min-w-full min-h-full flex flex-col justify-center items-center">
      <img
        className="w-16 h-16 rounded-3xl border border-black border-opacity-5 shadow motion-safe:animate-bounce"
        src={Logo}
        alt="Image to indicate a loading state."
      />
      <span className="mt-5 uppercase font-bold text-gray-400">Loading...</span>
    </div>
  )
}

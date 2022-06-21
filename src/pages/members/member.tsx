/**
 * Member details page.
 */

// External imports.
import { useParams } from "react-router-dom"

// Component imports.
import { Loading } from "@components/utility"

// Utility imports.
import { useMember } from "@utils/api/disque"
import { getAvatarUrl } from "@utils/discord"

export default function Member() {
  const { userId } = useParams<{ userId: string }>()
  if (!userId) {
    throw "Member overview component requires userId in path."
  }
  const { data, isLoading } = useMember(userId)

  if (isLoading) return <Loading />

  if (!data) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="italic text-gray-400">Member does not exist.</p>
      </div>
    )
  }

  return (
    <div className="mx-2">
      <div className="mt-10 max-w-xl mx-auto rounded-2xl shadow-md border border-black border-opacity-5 overflow-hidden">
        <div className="bg-gray-200 px-4 py-4 flex justify-center items-center">
          <img
            className="rounded-full border-white border-2 shadow-sm h-32"
            src={getAvatarUrl(
              data.user.id,
              data.avatar || data.user.avatar,
              data.user.discriminator,
              true,
            )}
          />
        </div>
        <div className="py-4 px-6 flex flex-col sm:flex-row justify-between items-center flex-wrap border-b-2 border-black border-opacity-5">
          <h1 className="text-3xl font-bold text-red-500">
            {data.nick || data.user.username}
          </h1>
          <span className="text-sm font-semibold uppercase text-gray-500">
            {data.user.username}#{data.user.discriminator}
          </span>
        </div>
        <div className="py-4 px-4 text-gray-700">
          <p>More information will be incuded soon.</p>
        </div>
      </div>
    </div>
  )
}

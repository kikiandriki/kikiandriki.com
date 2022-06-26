/**
 * Member details page.
 */

// External imports.
import { useParams } from "react-router-dom"

// Component imports.
import { Loading } from "@components/utility"
import { MessageStats } from "@components/profile/ladder"
import { GuestbookComments } from "@components/profile/guestbook"

// Utility imports.
import { useMember } from "@utils/api/disque"
import { getAvatarUrl } from "@utils/discord"
import { EmoteShowcase } from "@components/profile/ladder/emotes"

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
      <div className="my-10 max-w-xl mx-auto rounded-2xl shadow-md border border-black border-opacity-5 overflow-hidden">
        <div className="bg-gray-200 px-4 py-4 flex justify-center items-center">
          <img
            className="rounded-full border-white border-2 shadow-sm h-32"
            src={getAvatarUrl(
              data.user.id,
              data.avatar || data.user.avatar,
              data.user.discriminator,
              !!data.avatar,
            )}
          />
        </div>
        <div className="py-4 px-6 flex flex-col sm:flex-row justify-between items-center flex-wrap border-b-2 border-black border-opacity-5">
          <h1 className="text-3xl font-bold text-red-500">
            {data.nick || data.user.username}
          </h1>
          <span className="text-sm font-semibold uppercase text-gray-500">
            {data.user.username}
          </span>
        </div>
        <div className="py-4 px-4 text-gray-700">
          <MessageStats userId={data.user.id} />
        </div>
        <div className="py-4 px-4 text-gray-700">
          <EmoteShowcase userId={data.user.id} />
        </div>
        <div className="py-4 px-4 text-gray-700">
          <GuestbookComments userId={data.user.id} />
        </div>
      </div>
    </div>
  )
}

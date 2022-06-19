/**
 * Members page.
 */

import { useMembers } from "@utils/api/disque"
import { Link } from "react-router-dom"

/**
 * Members page component.
 */
export function Members() {
  const { data } = useMembers()

  if (!data) return <></>

  function getAvatarUrl(
    userId: string,
    avatarHash: string | null,
    discriminator: string,
  ): string {
    if (avatarHash) {
      return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`
    }
    return `https://cdn.discordapp.com/embed/avatars/${
      parseInt(discriminator || "0") % 5
    }.png`
  }

  return (
    <div className="max-w-6xl mx-auto my-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
      {data.map((member) => (
        <Link
          key={member.user.id}
          className="border-2 border-black border-opacity-5 rounded-lg shadow-sm overflow-hidden group relative hover:border-red-500 hover:border-opacity-50"
          to={member.user.id}
        >
          <div className="relative overflow-hidden opacity-5 group-hover:opacity-20 transition-opacity h-20">
            <img
              className="object-cover absolute inset-0 h-full w-full"
              src={getAvatarUrl(
                member.user.id,
                member.user.avatar,
                member.user.discriminator,
              )}
              alt=""
            />
          </div>
          <div className="absolute inset-0 flex justify-start items-center space-x-4 px-6 py-2">
            <img
              className="shadow-lg rounded-full h-12 w-12"
              src={getAvatarUrl(
                member.user.id,
                member.user.avatar,
                member.user.discriminator,
              )}
              alt=""
            />
            <div>
              <p className="text-lg font-semibold">
                {member.nick || member.user.username}
              </p>
              <p className="uppercase text-xs font-semibold text-red-500 opacity-60">
                {member.user.username}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

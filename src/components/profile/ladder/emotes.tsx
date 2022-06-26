import { useEmoteShowcase } from "@utils/api/ladder"

interface EmoteShowcaseProps {
  userId: string
}
export function EmoteShowcase({ userId }: EmoteShowcaseProps) {
  const { data } = useEmoteShowcase(userId)
  return (
    <div className="px-4 py-4 bg-white shadow rounded-lg">
      <h3 className="text-sm font-medium text-gray-500 truncate mb-3">
        Top emotes
      </h3>
      <div className="flex justify-center">
        {data && data.length > 0 ? (
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-4 ">
            {data.map((emote) => (
              <div
                key={emote.emoteId}
                style={{ maxWidth: "40px" }}
                className="border-b-2 pb-1.5 border-gray-300 hover:border-red-500 transition-colors"
              >
                <object
                  data={`https://cdn.discordapp.com/emojis/${emote.emoteId}.gif`}
                  type="image/gif"
                  className="rounded"
                  style={{ maxWidth: "40px" }}
                >
                  <img
                    src={`https://cdn.discordapp.com/emojis/${emote.emoteId}.png`}
                    className="rounded"
                    style={{ maxWidth: "40px" }}
                  />
                </object>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No emotes to display</p>
        )}
      </div>
    </div>
  )
}

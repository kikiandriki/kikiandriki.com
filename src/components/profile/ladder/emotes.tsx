import { useEmoteShowcase } from "@utils/api/ladder"

interface EmoteShowcaseProps {
  userId: string
}
export function EmoteShowcase({ userId }: EmoteShowcaseProps) {
  const { data, isLoading } = useEmoteShowcase(userId)

  function showEmoteList() {
    if (isLoading) {
      return (
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 animate-pulse">
          {Array.from(Array(10)).map((_, index) => (
            <div
              key={index}
              style={{ maxWidth: "40px" }}
              className="pb-1.5 border-gray-300"
            >
              <div className="rounded w-10 h-10 bg-gray-200" />
            </div>
          ))}
        </div>
      )
    } else {
      if (data && data.length > 0) {
        return (
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-4 ">
            {data.map((emote) => (
              <div
                key={emote.emoteId}
                style={{ maxWidth: "40px" }}
                className="border-b-2 pb-1.5 border-gray-300 hover:border-red-500 transition-colors"
              >
                {emote.animated === undefined ? (
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
                ) : (
                  <img
                    src={`https://cdn.discordapp.com/emojis/${emote.emoteId}.${
                      emote.animated ? "gif" : "png"
                    }`}
                    className="rounded"
                    style={{ maxWidth: "40px" }}
                  />
                )}
              </div>
            ))}
          </div>
        )
      } else {
        return <p className="text-sm text-gray-400">No emotes to display</p>
      }
    }
  }

  return (
    <div className="px-4 py-4 bg-white shadow rounded-lg">
      <h3 className="text-sm font-medium text-gray-500 truncate mb-3">
        Top emotes
      </h3>
      <div className="flex justify-center">{showEmoteList()}</div>
    </div>
  )
}

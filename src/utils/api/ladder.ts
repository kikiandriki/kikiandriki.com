/**
 * Ladder API utilities.
 */

// External imports.
import { useAuth0 } from "@auth0/auth0-react"
import axiosBase from "axios"
import { useQuery } from "react-query"

// Axios configuration.
export const ladder = axiosBase.create({
  baseURL: import.meta.env.KIKI_LADDER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

interface MessageStats {
  rank?: number
  count: {
    all: number
    today: number
  }
}

interface EmoteEntry {
  emoteId: string
  count: number
  animated?: boolean
}

/**
 * Hook to get emote showcase.
 */
export function useEmoteShowcase(userId: string) {
  const { getAccessTokenSilently } = useAuth0()
  return useQuery(`ladder-emotes-${userId}`, async () => {
    const token = await getAccessTokenSilently()
    const response = await ladder.get<EmoteEntry[]>(`/emotes/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  })
}

/**
 * Hook to get user ladder stats.
 */
export function useMessageStats(userId: string) {
  const { getAccessTokenSilently } = useAuth0()
  return useQuery(`ladder-${userId}`, async () => {
    const token = await getAccessTokenSilently()
    const response = await ladder.get<MessageStats>(`/messages/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  })
}

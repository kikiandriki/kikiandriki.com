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

interface LadderStats {
  rank?: number
  count: {
    all: number
    today: number
  }
}

/**
 * Hook to get user ladder stats.
 */
export function useLadderStats(userId: string) {
  const { getAccessTokenSilently } = useAuth0()
  return useQuery(`ladder-${userId}`, async () => {
    const token = await getAccessTokenSilently()
    const response = await ladder.get<LadderStats>(`/messages/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  })
}

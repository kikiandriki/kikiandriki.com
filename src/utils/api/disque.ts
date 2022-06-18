/**
 * Disque API utilities.
 */

// External imports.
import { useAuth0 } from "@auth0/auth0-react"
import axiosBase from "axios"
import { useQuery } from "react-query"

// Axios configuration.
export const disque = axiosBase.create({
  baseURL: import.meta.env.KIKI_DISQUE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * Hook to determine if a user is a server member.
 */
export function useMembership() {
  const { getAccessTokenSilently } = useAuth0()
  return useQuery("membership", async () => {
    const token = await getAccessTokenSilently()
    const response = await disque.get<boolean>("/@member", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: null,
    })
    if (response.status !== 200) {
      console.log(response)
      return false
    }
    return response.data
  })
}

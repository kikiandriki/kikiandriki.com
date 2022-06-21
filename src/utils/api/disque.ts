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

// Interface for a discord member object.
interface DiscordMember {
  user: {
    id: string
    username: string
    discriminator: string
    avatar: string | null
    bot?: boolean
    system?: boolean
    mfa_enabled?: boolean
    banner?: string | null
    accent_color?: number | null
    locale?: string
    verified?: boolean
    email?: string | null
    flags?: number
    premium_type?: number
    public_flags?: number
  }
  nick?: string | null
  avatar?: string | null
  roles: string[]
  joined_at: string
  premium_since?: string | null
  deaf: boolean
  mute: boolean
  pending?: boolean
  permissions?: string
  communication_disabled_until?: string | null
}

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

/**
 * Hook to list server members.
 */
export function useMembers() {
  const { getAccessTokenSilently } = useAuth0()
  return useQuery("members", async () => {
    const token = await getAccessTokenSilently()
    const response = await disque.get<DiscordMember[]>("/members", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  })
}

/**
 * Hook to get one server member.
 */
export function useMember(id: string) {
  const { getAccessTokenSilently } = useAuth0()
  return useQuery(`member-${id}`, async () => {
    const token = await getAccessTokenSilently()
    const response = await disque.get<DiscordMember>(`/members/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: null,
    })
    if (response.status === 404) {
      return
    }
    return response.data
  })
}

/**
 * Ladder API utilities.
 */

// External imports.
import { useAuth0 } from "@auth0/auth0-react"
import axiosBase from "axios"
import { useQuery, useMutation, useQueryClient } from "react-query"

// Axios configuration.
export const guestbook = axiosBase.create({
  baseURL: import.meta.env.KIKI_GUESTBOOK_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

interface GuestbookComment {
  authorId: string
  content: string
  published: number
}

/**
 * Hook to get guestbook comments.
 */
export function useGuestbookComments(userId: string) {
  const { getAccessTokenSilently } = useAuth0()
  return useQuery(`guestbook-comments-${userId}`, async () => {
    const token = await getAccessTokenSilently()
    const response = await guestbook.get<GuestbookComment[]>(
      `/${userId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  })
}

/**
 * Hook to post a comment on a guestbook.
 */
export function usePostGuestbookComment(userId: string) {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  return useMutation<
    void,
    { message: string; error: string },
    { content: string }
  >(
    async ({ content }) => {
      const token = await getAccessTokenSilently()
      const response = await guestbook.post(
        `${userId}/comments`,
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(`guestbook-comments-${userId}`)
      },
    },
  )
}

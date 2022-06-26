/**
 * Guestbook component.
 */

// External imports.
import { useState } from "react"
import { Link } from "react-router-dom"
import moment from "moment"

// Utility imports.
import { useMember } from "@utils/api/disque"
import {
  useGuestbookComments,
  usePostGuestbookComment,
} from "@utils/api/gradebook"
import { classNames } from "@utils/classes"
import { getAvatarUrl } from "@utils/discord"
import { useUser } from "@utils/auth"

interface GuestbookCommentsProps {
  userId: string
}
export function GuestbookComments({ userId }: GuestbookCommentsProps) {
  const { data, isLoading } = useGuestbookComments(userId)
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (data) {
    return data.length > 0 ? (
      <>
        <ul>
          {data.map((comment) => (
            <GuestbookComment
              key={comment.published}
              authorId={comment.authorId}
              content={comment.content}
              published={comment.published}
            />
          ))}
        </ul>
        <CommentInput userId={userId} />
      </>
    ) : (
      <>
        <p className="p-2 sm:p-4 text-center text-sm text-gray-400">
          No comments.
        </p>
        <CommentInput userId={userId} />
      </>
    )
  }
  return <></>
}

interface GuestbookCommentProps {
  authorId: string
  content: string
  published: number
}
function GuestbookComment({
  authorId,
  content,
  published,
}: GuestbookCommentProps) {
  const { data, isLoading } = useMember(authorId)
  if (isLoading) {
    return (
      <div className="relative flex items-start space-x-3 animate-pulse p-2 sm:p-4">
        <div className="relative">
          <div className="rounded-full bg-slate-300 h-10 w-10"></div>
        </div>
        <div className="min-w-0 flex-1 mt-1">
          <div>
            <div className="h-3 bg-slate-300 rounded w-24"></div>
            <div className="h-3 bg-slate-200 rounded w-36 mt-3 mb-1"></div>
          </div>
          <div className="space-y-3 mt-4 mb-0.5">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-300 rounded col-span-2"></div>
              <div className="h-3 bg-slate-300 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (data) {
    return (
      <div className="relative flex items-start space-x-3 p-2 sm:p-4">
        <div className="relative">
          <Link to={`/users/${data.user.id}`}>
            <img
              className={classNames(
                data ? "" : "animate-pulse",
                "h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white",
              )}
              src={getAvatarUrl(
                data.user.id,
                data.user.avatar,
                data.user.discriminator,
              )}
              alt=""
            />
          </Link>
        </div>
        <div className="min-w-0 flex-1">
          <div>
            <div className="text-sm">
              <Link
                to={`/users/${data.user.id}`}
                className="font-medium text-gray-900"
              >
                {data.user.username}
              </Link>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Commented {moment(published).fromNow()}
            </p>
          </div>
          <div className="mt-2 text-sm text-gray-700">
            <p>{content}</p>
          </div>
        </div>
      </div>
    )
  }
  return <></>
}

interface CommentInputProps {
  userId: string
}
function CommentInput({ userId }: CommentInputProps) {
  const user = useUser()
  const { mutate, isLoading } = usePostGuestbookComment(userId)
  const [content, setContent] = useState<string>("")

  function submit() {
    mutate(
      { content },
      {
        onSuccess: () => {
          setContent("")
        },
      },
    )
  }

  return (
    <div className="flex items-start space-x-4 p-2 sm:p-4">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={user.picture}
          alt=""
        />
      </div>
      <div
        className={classNames(
          isLoading ? "animate-pulse" : "",
          "min-w-0 flex-1",
        )}
      >
        <div className="relative">
          <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
              disabled={isLoading}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <div className="py-2" aria-hidden="true">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-end">
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400"
                onClick={() => submit()}
                disabled={isLoading}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

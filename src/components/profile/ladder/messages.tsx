/**
 * Ladder profile component.
 */

import { useMessageStats } from "@utils/api/ladder"

interface MessageStatsProps {
  userId: string
}
export function MessageStats({ userId }: MessageStatsProps) {
  const { data, isLoading } = useMessageStats(userId)
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <div className="h-5 rounded bg-slate-300 w-12" />
            <div className="mt-2.5 mb-1.5 h-6 rounded bg-red-300 w-16" />
          </div>
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <div className="h-5 rounded bg-slate-300 w-24" />
            <div className="mt-2.5 mb-1.5 h-6 rounded bg-red-300 w-16" />
          </div>
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <div className="h-5 rounded bg-slate-300 w-26" />
            <div className="mt-2.5 mb-1.5 h-6 rounded bg-red-300 w-10" />
          </div>
        </dl>
      </div>
    )
  }
  if (data) {
    return (
      <div>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Rank</dt>
            <dd className="mt-1 text-3xl font-semibold text-red-500">
              {data.rank ? `#${data.rank}` : "N/A"}
            </dd>
          </div>
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Messages
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-red-500">
              {data.count.all}
            </dd>
          </div>
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Messages Today
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-red-500">
              {data.count.today}
            </dd>
          </div>
        </dl>
      </div>
    )
  }
  return <></>
}

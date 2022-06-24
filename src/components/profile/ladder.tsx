/**
 * Ladder profile component.
 */

import { useLadderStats } from "@utils/api/ladder"

interface LadderProfileProps {
  userId: string
}
export function LadderProfile({ userId }: LadderProfileProps) {
  const { data, isLoading } = useLadderStats(userId)
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (data) {
    return (
      <>
        <p>Rank: {data.rank ? `#${data.rank}` : "Unranked"}</p>
        <p>All time messages: {data.count.all}</p>
        <p>Messages sent today: {data.count.today}</p>
      </>
    )
  }
  return <></>
}

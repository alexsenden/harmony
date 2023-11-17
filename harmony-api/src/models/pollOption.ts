export type PollOption = {
  pollOptionId: string
  option: string
  entryNumber: number
  postId?: string
  pollVotes?: Array<PollOptionVote>
}

export type PollOptionVote = {
  userId: string
  pollOptionId: string
}

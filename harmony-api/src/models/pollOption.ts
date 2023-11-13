export type PollOption = {
  pollOptionId: string
  option: string
  entryNumber: number
  pollVotes?: Array<PollOptionVote>
}

export type PollOptionVote = {
  userId: string
  pollOptionId: string
}

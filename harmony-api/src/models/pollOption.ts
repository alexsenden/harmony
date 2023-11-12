export type PollOption = {
  pollOptionId: string
  option: string
  pollVotes?: Array<PollOptionVote>
}

export type PollOptionVote = {
  userId: string
  pollOptionId: string
}

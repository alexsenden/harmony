import TabLayout, { TabItem } from '../tab-layout'

export const PostModal = () => {
  const tabs: Array<TabItem> = [
    {
      label: 'Discussion',
      tab: <p>Create a discussion post here!</p>,
    },
    {
      label: 'Poll',
      tab: <p>Create a poll post here!</p>,
    },
    {
      label: 'Review',
      tab: <p>Create a review post here!</p>,
    },
  ]

  return <TabLayout tabs={tabs} />
}

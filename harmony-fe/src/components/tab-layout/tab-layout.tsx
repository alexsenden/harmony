import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

export interface TabItem {
  label: string
  tab: React.ReactElement
  disabled?: boolean
}

interface TabLayoutProps {
  tabs: Array<TabItem>
}

export const TabLayout = ({ tabs }: TabLayoutProps) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          {tabs.map(tab => {
            return <Tab label={tab.label} disabled={tab.disabled} />
          })}
        </Tabs>
      </Box>
      {tabs[value].tab}
    </Box>
  )
}

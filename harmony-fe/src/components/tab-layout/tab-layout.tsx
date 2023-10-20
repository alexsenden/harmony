import React, { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'

export interface TabItem {
  label: string
  tab: React.ReactElement
  disabled?: boolean
}

interface TabLayoutProps extends React.ComponentProps<typeof Tabs> {
  tabs: Array<TabItem>
  onTabChange?: () => void
}

export const TabLayout = ({ tabs, onTabChange, ...props }: TabLayoutProps) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    if (onTabChange) {
      onTabChange()
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs {...props} value={value} onChange={handleChange}>
          {tabs.map(tab => {
            return <Tab label={tab.label} disabled={tab.disabled} />
          })}
        </Tabs>
      </Box>
      {tabs[value].tab}
    </Box>
  )
}

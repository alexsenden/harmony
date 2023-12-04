import { styled } from '@mui/material/styles'
import { Switch } from '@mui/material'

const LightDarkSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 8,
  margin: 1,
  '& .MuiSwitch-switchBase': {
    width: '26px',
    height: '26px',
    top: '50%',
    padding: '10px',
    marginTop: 'calc(-20px / 2 - 4px)',
    color: '#ffffff',
    background: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '&.Mui-checked': {
      transform: 'translateX(35px) !important',
      color: '#ffffff',
      background: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

export default LightDarkSwitch

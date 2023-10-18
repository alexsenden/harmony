import { Container } from '@mui/material'
import HarmonyAppBar from '../../components/appBar'
import PostContainer from '../../components/postContainer/postContainer'
import { useState } from 'react'
import FilterPostButtons from '../../components/filterPostButtons'

const HomePage = () => {
  const [activeButton, setActiveButton] = useState('followed')

  const handleButtonClick = (button: string) => {
    setActiveButton(button)
  }
  return (
    <>
      <HarmonyAppBar />
      <Container maxWidth="xl">
        <FilterPostButtons
          activeButton={activeButton}
          handleButtonClick={handleButtonClick}
        />
        <PostContainer contentType={activeButton} />
      </Container>
    </>
  )
}

export default HomePage

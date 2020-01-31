import React, { useContext } from 'react'
import { AppContext } from '../../utils/AppProvider'
import EditImage from './EditImage'
import EditBio from './EditBio'

const EditInfo = () => {
  const { state } = useContext(AppContext)
  const { userInfo } = state

  return (
    <div>
      <EditImage originalImage={userInfo && userInfo.image} />
      <EditBio user={userInfo && userInfo} />
    </div>
  )
}

export default EditInfo

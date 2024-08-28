import React, { useState } from 'react'
import Bar from './Bar'
import Model from './Model'
import Outlay from './Outlay'

function Content() {
  const [openModel,setOpenModel]=useState(false)
  return (
    <div className="w-full">
      <Bar handleOpenModel={setOpenModel} />
      {openModel && <Outlay handleOpenModel={setOpenModel}/>}
    </div>
  )
}

export default Content

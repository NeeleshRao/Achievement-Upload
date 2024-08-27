import React, { useState } from 'react'
import Bar from './Bar'
import Model from './Model'

function Content() {
  const [openModel,setOpenModel]=useState(false)
  return (
    <div className="w-full">
      <Bar handleOpenModel={setOpenModel} />
      {openModel && <Model/>}
    </div>
  )
}

export default Content

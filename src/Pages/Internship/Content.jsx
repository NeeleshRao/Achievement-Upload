import React, { useState } from 'react'
import Bar from './Bar'
import Model from './Model'
import Outlay from './Outlay'
import ShowData from './ShowData'
import { useIntern } from '../../Context/InternContext'

function Content() {
  const {openModel,setOpenModel}=useIntern();
  return (
    <div className="w-full flex-col">
      <Bar/>
      <ShowData/>
      {openModel && <Outlay handleOpenModel={setOpenModel}/>}
    </div>
  )
}

export default Content

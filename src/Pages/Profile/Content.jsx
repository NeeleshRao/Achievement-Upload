import React, { useState } from 'react'
import Bar from './Bar'
import ShowData from './ShowData'

function Content() {
  return (
    <div className="w-full flex-col">
      <Bar/>
      <ShowData/>
    </div>
  )
}

export default Content

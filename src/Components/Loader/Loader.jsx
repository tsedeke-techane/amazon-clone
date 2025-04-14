import React from 'react'
import { BeatLoader } from 'react-spinners'

function Loader() {
  return (
    <div
    style = {{
        display:"flex",
        alignItems: "center",
        justifyContent:"center",
        height:"50vh"
    }}>
      <BeatLoader />
    </div>
  )
}

export default Loader

import React, { useEffect, useState } from 'react'

const Geo = () => {
    const [loc, setLoc] = useState()
    
    console.log(loc)
  return (
    <div>
        {loc?.latitude}
        {loc?.longitude}
    </div>
  )
}

export default Geo
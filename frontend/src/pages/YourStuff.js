import React from 'react'
import AuthContext from '../context/ConTexT'
import { useContext, useState, useEffect } from 'react'

const YourStuff = () => {
    let { authTokens  } = useContext(AuthContext)
    let [arr,setarr]  = useState([])

    let getuserstuff = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/userdata/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        const data = await response.json()
        setarr(data)
    }

    useEffect(()=>{
        getuserstuff()
    },[])
  return (
    <div>
      {arr.map((items) => {
        return (
          <>

            <div className='container text-center'style={{"width":"850px"}}>
              <div className="card mb-3">
                <div className="card-body">
                  <p className="card-text">{items.message}</p>
                  <p className="card-text"><small className="text-muted">Last updated {items.time}</small></p>
                </div>
              </div>
            </div>


          </>

        )


      })}
    </div>
  )
}

export default YourStuff

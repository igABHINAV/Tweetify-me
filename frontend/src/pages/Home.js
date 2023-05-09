import React from 'react'
import AuthContext from '../context/ConTexT'
import { useContext , useState , useEffect } from 'react'
const Home = () => {
  useEffect(() => {
    getnotes()
  }, [])
  const [note, setnote] = useState([])
  let { authTokens , logoutuser } = useContext(AuthContext)
  let getnotes = async () =>{
    const response = await fetch('http://127.0.0.1:8000/api/all/',{
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data=await response.json()
    if (response.status === 200) {
      setnote(data)
    } 
    else {
      alert('Something went  wrong !')
    }
  }


  return (
    <div className='container text-center'>
      <h1 className='text-center'>Home</h1><br/>
      {note.map((items) => {
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

export default Home

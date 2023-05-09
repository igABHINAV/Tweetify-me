import React from 'react'
import AuthContext from '../context/ConTexT'
import { useContext, useState, useEffect } from 'react'


const AddPost = () => {

    const [pu, setpu] = useState(true)
    const [me, setme] = useState("")
    const [id, setid] = useState(0)
    const [st, set] = useState("public")

    const meonchange = (e) => {
        setme(e.target.value)
    }

    const puonchange = (e) => {
        if (pu === true) {
            setpu(false)

            set("Private")
        }
        else {
            setpu(true)
            set("Public")
        }
    }


    let { authTokens } = useContext(AuthContext)

    let getuser = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        const data = await response.json()
        setid(data.id)
    }

    useEffect(() => {
        getuser()
    }, [])

    let addpost = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/userdata/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + String(authTokens.access)
            },

            body: JSON.stringify({ user: id, message: me, public: pu })
        })
        let data = await response.json()
        if (response.status === 200) {
            console.log("added successfully !")
            console.log(data)
        }
    }


    return (
        <div className='container'>



            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                <textarea class="form-control" value={me} onChange={meonchange} id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div class="d-grid gap-2 container">
                <button class="btn btn-success" onClick={puonchange} type="button">{st}</button>
            </div><br/><br/>
            <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-primary" onClick={addpost} type="button">Add post</button>
            </div>
        </div>
    )
}

export default AddPost

import React, {useContext, useEffect, useState} from 'react'
import AuthContext from "../../components/Context/AuthProvider";

const MainPage = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);
    let [profile, setProfile] = useState<any >({})

    useEffect(() => {
        getProfile()
    },[])

    const getProfile = async() => {
        if (!authTokens) {
            return
        }
        let response = await fetch('http://127.0.0.1:8000/api/user-profile', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        console.log(data)
        if(response.status === 200){
            setProfile(data)
        } else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
    }

    console.log(profile)

    return (
        <div>
            {
                profile?.user ? (
                    <>AUTHENTICATED USER</>
                ) : (
                    <>UNAUTHENTICATED USER</>
                )
            }
        </div>
    )
}

export default MainPage

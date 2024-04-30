import React, {useContext, useEffect, useState} from 'react';
import {Container} from "@mui/material";
import axios from "axios";
import AuthContext from "../../../../components/Context/AuthProvider";

type Profile = {
    firstname: string,
    lastname: string,
    phone: number,
    user: {
        email: string,
        username: string,
        password: string
    }
}

function ProfilePage() {

    const {authTokens} = useContext(AuthContext);
    const [profile, setProfile] = useState<Profile>();

    const getUserProfile = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user-profile`, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            setProfile(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUserProfile()
    }, []);

    return (
        <Container>
            <p>{profile?.firstname}</p>
            <p>{profile?.lastname}</p>
            <p>{profile?.phone}</p>
            <p>{profile?.user?.username}</p>
            <p>{profile?.user?.email}</p>
        </Container>
    );
}

export default ProfilePage;

import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Grid} from "@mui/material";
import axios from "axios";
import AuthContext from "../../../../components/Context/AuthProvider";
import {SubmitHandler, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";

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

    const {user, authTokens} = useContext(AuthContext);
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



    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm<Profile>();
    if(profile) {
        setValue('firstname', profile?.firstname);
        setValue('lastname', profile?.lastname);
        setValue('phone', profile?.phone);
    }

    const onSubmit: SubmitHandler<Profile> = async (data) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.user_id}/update`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                data: data
            })
            console.log(response.data.data)
            setProfile(response.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container sx={{margin:3}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField type="text" {...register("firstname")} sx={{ width: '50%' }}/>
                    </Grid>
                    <Grid item>
                        <TextField type="text" {...register("lastname")} sx={{ width: '50%' }}/>
                    </Grid>
                    <Grid item>
                        <TextField type="number" {...register("phone")} sx={{ width: '50%' }}/>
                    </Grid>
                    <Grid item>
                        <TextField value={profile?.user.email} disabled sx={{ width: '50%' }}/>
                    </Grid>
                    <Grid item>
                        <TextField value={profile?.user.username} disabled sx={{ width: '50%' }}/>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="success" type="submit" sx={{ width: '50%' }}>
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default ProfilePage;

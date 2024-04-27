import React from 'react';
import {Avatar, Box, Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

type CardUserProps = {
    id: number,
    firstname: string,
    lastname: string,
    email: string
    phone: number,
    userWasDeleted: (userId:number, status:number) => void
}

function CardUser({id, firstname, lastname, email, phone, userWasDeleted}: CardUserProps) {

    const deleteUser = async (userId:number) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/user/${userId}`)
            userWasDeleted(userId, response.status)

        } catch (e) {
            console.log(e)
            userWasDeleted(userId, 400)
        }
    }

    return (
        <Card sx={{width: 350}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        {firstname[0]}{lastname[0]}
                    </Avatar>
                }
                action={
                    <IconButton onClick={() => deleteUser(id)}>
                        <DeleteIcon sx={{color: "red"}}/>
                        {id}
                    </IconButton>
                }
                title={`${firstname} ${lastname}`}
                subheader={`${phone}, ${email}`}
            />
        </Card>
    );
}

export default CardUser;

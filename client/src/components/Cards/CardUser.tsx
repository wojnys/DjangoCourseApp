import React from 'react';
import {Avatar, Box, Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

type CardUserProps = {
    id: number
    firstname: string
    lastname: string
    email: string
    phone: number
    courses: Course[],
    userWasDeleted: (userId:number, status:number) => void
}
type Course = {
    id: number
    name: string
    description: string
    price: number
    topic: Topic
}
type Topic = {
    id: number
    name: string
}

function CardUser({id, firstname, lastname, email, phone, courses, userWasDeleted}: CardUserProps) {

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
            <CardContent sx={{display: "flex", flexWrap: "wrap", gap: 3}}>
                {
                    courses.length === 0 && (
                        <Box sx={{textAlign: "center", width:1}}>
                            Any courses was purchased
                        </Box>
                    )
                }
                {
                    courses.map((course, index) => (
                        <Box key={index} sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "column",
                            padding: 1,
                            backgroundColor: "#ffebee",
                            borderRadius: 3
                        }}>
                            <Typography sx={{textAlign: "left", padding: 1}}>{course.name}</Typography>
                            <Box sx={{
                                borderRadius: 1,
                                bgcolor: 'error.main',
                                color: "white",
                                padding:0.5
                            }}>
                                <Typography sx={{fontSize: 14}}>   {course.topic.name}</Typography>
                            </Box>
                        </Box>
                    ))
                }
            </CardContent>
        </Card>
    );
}

export default CardUser;

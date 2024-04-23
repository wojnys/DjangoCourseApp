import React, {useEffect, useState} from 'react';
import {Box, Container} from "@mui/material";
import CardUser from "../../../../components/Cards/CardUser";
import axios from "axios";
import MessageBox from "../../../../components/Messages/MessageBox";
import {useNotification} from "../../../../components/Context/NotificationContext";

type User = {
    id: number,
    firstname: string,
    lastname: string,
    email: string
    phone: number,
    courses: Course[]
}
type Course = {
    id: number,
    name: string,
    description: string,
    price: number,
    topic: Topic
}
type Topic = {
    id: number,
    name:string
}

function AllUsersPage() {

    const [users, setUsers] = useState<User[]>([]);
    const { showNotification } = useNotification();

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user`)
            setUsers(response.data)
        }catch(err) {
            showNotification(["Cannot connect to the server"], 'error');
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleUserWasDeleted = (userId:number, status:number) => {
        console.log(userId, status)
        if(status <= 205) {
            setUsers(users.filter((user => user.id !== userId)))
        }
    }

    return (
        <Container sx={{width: 1}}>
            <h1 className={"text-left text-xl p-6"}>All Users</h1>

            <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"} gap={3}>
                {
                    users.map((user, index) => (
                        <CardUser key={index} id={user.id} firstname={user.firstname} lastname={user.lastname} email={user.email} phone={user.phone} courses={user.courses} userWasDeleted={handleUserWasDeleted}/>

                    ))
                }
            </Box>
        </Container>
    );
}

export default AllUsersPage;

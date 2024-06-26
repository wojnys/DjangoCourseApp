import React, {useEffect, useState} from 'react';
import {Box, Container} from "@mui/material";
import CardUser from "../../../../components/Cards/CardUser";
import axios from "axios";
import {useNotification} from "../../../../components/Context/NotificationContext";

type User = {
    id: number,
    firstname: string,
    lastname: string,
    user: {username: string, email:string}
    phone: number,
}

function AllUsersPage() {

    const [users, setUsers] = useState<User[]>([]);
    const {showNotification} = useNotification();

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user`)
            setUsers(response.data.data)
        } catch (err) {
            showNotification(["Cannot connect to the server"], 'error');
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleUserWasDeleted = (userId: number, status: number) => {
        if (status <= 205) {
            setUsers(users.filter((user => user.id !== userId)))
            showNotification(['User was deleted'], 'success')
        }
    }

    return (
        <Container sx={{width: 1}}>
            <h1 className={"text-left text-xl p-6"}>All Users</h1>

            <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"} gap={3}>
                {
                    users.map((user, index) => (
                        <CardUser key={index} id={user.id} firstname={user.firstname} lastname={user.lastname}
                                  email={user.user.email} phone={user.phone}
                                  userWasDeleted={handleUserWasDeleted}/>

                    ))
                }
            </Box>
        </Container>
    );
}

export default AllUsersPage;

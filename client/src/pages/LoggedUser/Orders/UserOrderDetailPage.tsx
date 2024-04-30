import React, {useContext, useEffect, useState} from 'react';
import {Box, Container} from "@mui/material";
import AuthContext from "../../../components/Context/AuthProvider";
import axios from "axios";
import CardCourse from "../../../components/Cards/CardCourse";
import {useParams} from "react-router-dom";

function UserOrderDetailPage() {

    const {user} = useContext(AuthContext)

    const {orderId} = useParams()

    const getOrderDetail = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.user_id}/order/${orderId}/detail`)
            console.log(response.data)

        } catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        getOrderDetail()
    }, []);

    return (
        <Container sx={{width: 1}}>
            <h1>Detail of user order this current -it is working not worry bro</h1>
        </Container>
    );
}

export default UserOrderDetailPage;

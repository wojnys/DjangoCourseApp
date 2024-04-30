import React, {useContext, useEffect, useState} from 'react';
import {Box, Container} from "@mui/material";
import AuthContext from "../../../components/Context/AuthProvider";
import axios from "axios";
import CardCourse from "../../../components/Cards/CardCourse";

function UserOrdersPage() {

    const {user} = useContext(AuthContext)

    const [userOrders, setUsersOrders] = useState<any[]>()

    const getUserOrders = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.user_id}/all-orders`)
            console.log(response.data)
            setUsersOrders(response.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    console.log(userOrders)

    useEffect(() => {
        getUserOrders()
    }, []);

    return (
        <Container sx={{width: 1}}>
            <h1 className={"text-left text-xl p-6"}>User all Orders</h1>
            <Box display="flex" justifyContent="center" flexWrap={"wrap"} gap={3}>
                {userOrders?.map((order, index) => (
                    <CardCourse key={index} description={order.course.description} price={order.order_price}
                                id={order.id} topicName={order.course.topic?.name} topicId={order.course.topic?.id}
                                name={order.course.name}
                                detailLink={`/user/profile/order/${order.id}`}
                                index={index + 1}/>
                ))}
            </Box>
        </Container>
    );
}

export default UserOrdersPage;

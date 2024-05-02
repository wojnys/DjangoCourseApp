import React, {useContext, useEffect, useState} from 'react';
import {Container} from "@mui/material";
import AuthContext from "../../../components/Context/AuthProvider";
import axios from "axios";
import {useParams} from "react-router-dom";
import {OrderDetail} from "../../../utils/types";

function UserOrderDetailPage() {

    const {user} = useContext(AuthContext)

    const {orderId} = useParams()
    const [orderDetail, setOrderDetail] = useState<OrderDetail>()

    const getOrderDetail = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.user_id}/order/${orderId}/detail`)
            console.log(response.data.data)
            setOrderDetail(response.data.data)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getOrderDetail()
    }, []);


    console.log(orderDetail)
    return (
        <Container sx={{width: 1}}>
            <h1>{orderDetail?.course.name}</h1>
            {
                orderDetail?.course.videos.map((video, index) => (
                    <div key={index}>
                        <h2>{video.video.caption}</h2>
                        <video controls>
                            <source src={ `${process.env.REACT_APP_SERVER_URL}${video.video.video}` } type="video/mp4"/>
                        </video>
                    </div>
                ))
            }
        </Container>
    );
}

export default UserOrderDetailPage;

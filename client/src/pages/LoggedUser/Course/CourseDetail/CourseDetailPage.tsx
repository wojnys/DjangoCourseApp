import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Button, Container} from "@mui/material";
import AuthContext from "../../../../components/Context/AuthProvider";

type Video = {
    id: number;
    caption: string | null;
    video: string;
    created_at: string;
};

type Topic = {
    id: number;
    name: string;
};

type Course = {
    id: number;
    name: string;
    description: string;
    price: number;
    topic: Topic;
    created_at: string;
    videos: {
        video: Video;
        created_at: string;
    }[];
};

function CourseDetailPage() {

    const {courseId} = useParams();

    const [course, setCourse] = useState<Course>()

    const getCourseDetail = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/course/${courseId}`)
            console.log(response.data)
            setCourse(response.data)
        }catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCourseDetail()
    }, []);

    const {user} = useContext(AuthContext)
    console.log(user)
    const buyCourse = async() => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/course/${courseId}/user/${user.user_id}/create-order`)
            console.log(response)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <Container>
            <h1>Course detail</h1>
            <div>{course?.name}</div>
            <div>{course?.description}</div>
            <div>{course?.price}</div>
            {
                course?.videos.map((video, index) => {
                    return (
                        <div key={index}>
                            <video width="320" height="240" controls>
                                <source src={`${process.env.REACT_APP_SERVER_URL}/${video.video.video}`} type="video/mp4"/>
                            </video>
                        </div>
                    )
                })
            }

            <Button variant={"contained"} color={"success"} onClick={buyCourse}>Buy</Button>
        </Container>
    );
}

export default CourseDetailPage;

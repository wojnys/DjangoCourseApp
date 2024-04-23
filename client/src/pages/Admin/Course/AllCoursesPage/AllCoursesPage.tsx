import React, {useEffect, useState} from 'react';
import {Box,  Container} from "@mui/material";
import axios from "axios";
import CardCourse from "../../../../components/Cards/CardCourse";
import {useNotification} from "../../../../components/Context/NotificationContext";

type Course = {
    id: number
    name: string
    description: string
    price: number,
    topic: Topic
}

type Topic = {
    id: number
    name: string
}

function AllCoursesPage() {

    const [courses, setCourses] = useState<Course[]>([]);
    const { showNotification } = useNotification();

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/course`)
            setCourses(response.data)
        } catch (e) {
            showNotification(["Cannot connect to the server"], 'error');
        }
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    courses.map((course) => console.log(course.topic?.name))
    return (
        <Container sx={{ width: 1 }}>
            <h1 className={"text-left text-xl p-6"}>All Courses</h1>
            <Box display="flex" justifyContent="center" flexWrap={"wrap"} gap={3}>
                {courses.map((course, index) => (
                    <CardCourse key={index} description={course.description} price={course.price} id={course.id} topicName={course.topic?.name} topicId={course.topic?.id} name={course.name} index={index+1}/>
                ))}
            </Box>
        </Container>
    );
}

export default AllCoursesPage;

import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Box, Button, Container} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AuthContext from "../../../../components/Context/AuthProvider";
import {CZK} from "../../../../utils/utils";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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
            const tmp:{videoId:number, hide:boolean}[] = []
            response.data?.videos.map((video: any) => {
                tmp.push({videoId: video.video.id, hide: true})
            })
            setVideoHide(tmp)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCourseDetail()
    }, []);

    const {user} = useContext(AuthContext)
    console.log(user)
    const buyCourse = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/course/${courseId}/user/${user.user_id}/create-order`)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }


    const [videoHide, setVideoHide] = useState<{videoId:number, hide:boolean}[]>([])

    console.log(videoHide)
    const enrollVideo =  (videoId: number) => {
    console.log(videoId)
        setVideoHide(prev => prev.map((videoHide) => {
            if(videoHide.videoId === videoId) {
                return {
                    videoId: videoId,
                    hide: !videoHide.hide
                }
            }
            return videoHide
        }))
        
    }

    console.log(videoHide)
    return (
        <Box>
            <div className={"bg-green-950 h-56 text-white w-full flex-col "}>
                <div className={"flex w-full h-16 items-center p-4 text-xs text-gray-400"}>
                    Course <KeyboardArrowRightIcon fontSize={"small"}/> {course?.topic.name} <KeyboardArrowRightIcon fontSize={"small"} /> {course?.name}
                </div>
                <div className={"flex flex-row p-10"}>
                    <div className={"w-2/3 h-full flex items-center justify-center"}>
                        <div>{course?.description}</div>
                    </div>

                    <div className={"w-1/3  flex items-center justify-center flex-col "}>
                        <div className={"w-64 h-52 bg-black p-3 flex justify-center flex-col items-center"}>
                            <h1>{course?.name}</h1>
                            <span
                                className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 w-40">{CZK.format(Number(course?.price))}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col mt-24 p-5"}>
                {
                    course?.videos.map((video, index) => {
                        return (
                            <div key={index}>
                                <div
                                    className={"border-gray-400 border flex justify-start p-3 hover:bg-gray-200 cursor-pointer"}
                                    onClick={() => {
                                        enrollVideo(video.video.id)
                                    }}>
                                    <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                    <h1 className={"font-bold"}>Lesson {index}</h1>
                                </div>
                                {
                                    videoHide.find((videoHide) => videoHide.videoId === video.video.id && videoHide.hide) ? (
                                        <div className={"hidden"} >
                                            <video width="320" height="240" controls >
                                                <source src={`${process.env.REACT_APP_SERVER_URL}/${video.video.video}`}
                                                        type="video/mp4"/>
                                            </video>
                                        </div>
                                    ) : (
                                        <video width="320" height="240" controls>
                                            <source src={`${process.env.REACT_APP_SERVER_URL}/${video.video.video}`}
                                                    type="video/mp4"/>
                                        </video>
                                    )
                                }


                            </div>
                        )
                    })
                }
            </div>

            <Button variant={"contained"} color={"success"} onClick={buyCourse} sx={{width: "200px"}}>Buy</Button>
        </Box>
    );
}

export default CourseDetailPage;

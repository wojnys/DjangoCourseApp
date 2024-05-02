import React, {useEffect, useState} from 'react';
import {Button, Container, Grid} from "@mui/material";
import {useParams} from "react-router-dom";
import {Topic} from "../../../utils/types"
import axios from "axios";
import {useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";

function TopicDetailPage() {

    const {topicId} = useParams();
    const [topic, setTopic] = useState<Topic | null >(null);

    const getTopicDetail = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/topic/${topicId}`);
            setTopic(response.data)
        }catch(e) {
            console.log(e);
        }
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm<Topic>();
    if(topic) {
        setValue('name', topic?.name);
    }

    const onSubmit = async (data: Topic) => {
        try{
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/topic/${topicId}`, data);
            setTopic(response.data)
        }catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getTopicDetail()
    }, []);

    return (
        <Container>
            <h1>Topic detail</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField type="text" {...register("name")} sx={{ width: '50%' }}/>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="success" type="submit" sx={{ width: '50%' }}>
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default TopicDetailPage;

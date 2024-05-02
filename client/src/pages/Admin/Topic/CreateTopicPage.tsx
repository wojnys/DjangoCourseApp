import React, {useEffect, useState} from 'react';
import {Button, Container, Grid} from "@mui/material";
import {useParams} from "react-router-dom";
import {Topic} from "../../../utils/types";
import axios from "axios";
import {useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";

function CreateTopicPage() {
    const [topic, setTopic] = useState<Topic | null >(null);
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
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/topic`, data);
            setTopic(response.data)
        }catch(e) {
            console.log(e);
        }
    }

    return (
        <Container>
            <h1>Create new Topic</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField type="text" {...register("name")} sx={{ width: '50%' }}/>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="success" type="submit" sx={{ width: '50%' }}>
                            Create new topic
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default CreateTopicPage;

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button, Container, Grid, MenuItem, Select} from '@mui/material';
import {makeStyles} from '@material-ui/core/styles';
import {useNotification} from '../../../../components/Context/NotificationContext';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


type Course = {
    name: string;
    description: string;
    price: number;
    topicId: number;
    videoFile: FileList; // Add videoFile field to accept file input
};

type Topic = {
    id: number;
    name: string;
    description: string
};

const useStyles: any = makeStyles((theme: any) => ({
    root: {
        '& .MuiTextField-root': {
            width: '100%',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
        },
    },
}));

function CreateCoursePage() {
    const {showNotification} = useNotification();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Course>();

    const onSubmit: SubmitHandler<Course> = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', String(data.price));
            formData.append('topicId', String(data.topicId));
            formData.append('videoFile', data.videoFile[0]); // Append the selected file to form data

            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/course`, formData);
            console.log(response);
            showNotification(['Course was successfully created'], 'success');
        } catch (e) {
            showNotification(['Cannot connect to server'], 'error');
        }
    };

    const classes = useStyles();

    useEffect(() => {
        const errorMessages: string[] = [];
        showNotification([], 'error');
        Object.entries(errors).map(([key, value]) => {
            errorMessages.push(String(value.message));
        });
        showNotification(errorMessages, 'error');
    }, [Object.entries(errors).length]);

    const [topics, setTopics] = useState<Topic[]>([]);
    const getAllTopics = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/topic`);
            console.log(response);
            setTopics(response.data);
        } catch (e) {
            showNotification(['Cannot fetch topics'], 'error');
        }
    };

    useEffect(() => {
        getAllTopics();
    }, []);

    return (
        <Container>
            <h1 className={'text-left text-xl p-6'}>Create Course</h1>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <Grid spacing={3} p={4} container>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            id="outlined-basic"
                            label="Course Name"
                            variant="outlined"
                            type={'text'}
                            {...register('name', {
                                required: 'Name of Course is required',
                                maxLength: {
                                    value: 100,
                                    message: 'The Course Name cannot be so long',
                                },
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            id="outlined-basic"
                            label="Course Description"
                            variant="outlined"
                            type={'text'}
                            {...register('description', {
                                required: 'Description of Course is required',
                                maxLength: 1000,
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            id="outlined-basic"
                            label="Course Price"
                            variant="outlined"
                            type={'number'}
                            {...register('price', {required: 'Price for Course is required'})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Select
                            fullWidth
                            defaultValue={''}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Topic"
                            displayEmpty
                            variant={'outlined'}
                            {...register('topicId', {required: 'Topic is required'})}
                        >
                            <MenuItem disabled value="">
                                <em>Choose topics for course</em>
                            </MenuItem>
                            {topics.map((topic, index) => (
                                <MenuItem key={topic.id} value={topic.id}>
                                    {topic.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            sx={{width: '100%'}}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Video
                            <VisuallyHiddenInput type="file" {...register('videoFile', {required:"Video is required"})} accept="video/*" />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="success" type={"submit"}>
                            Create Course
                        </Button>
                    </Grid>
                </Grid></form>
        </Container>
    );
}

export default CreateCoursePage;



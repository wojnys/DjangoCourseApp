import React, {useEffect} from 'react';
import {Button, Container, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {useNotification} from "../../components/Context/NotificationContext";
import {SubmitHandler, useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles: any = makeStyles((theme: any) => ({
    root: {
        "& .MuiTextField-root": {
            width: "100%",
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
        },
    },
}));

type User = {
    firstname: string
    lastname: string
    email: string
    phone: string
    password: string,
    username: string
}

function RegisterPage() {

    const classes = useStyles();
    const navigate = useNavigate();

    const {showNotification} = useNotification();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<User>()

    const onSubmit: SubmitHandler<User> = async (data) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user`, {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                password: data.password,
                username:data.username
            })
            console.log(response)
            showNotification(['Registration was successfully created'], 'success');
            navigate("/login")

        } catch (err:any) {
            if(err?.response !== undefined){
                console.log(err)
                showNotification([err.response.data.message || err.response.data.errors], 'error');
            } else {
                showNotification(["Cannot connect to the server"], 'error');
            }
        }
    }

    return (
        <Container sx={{ padding:10}}>
            <h1 className={"font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl p-4"}>Register Form</h1>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <Grid spacing={3} container>
                <Grid item xs={12} sm={12} md={6}>
                        <TextField id="firstname" label="Firstname" variant="outlined"
                                   type={"text"} {...register("firstname", {})}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField id="lastname" label="LastName" variant="outlined"
                                   type={"text"} {...register("lastname", {})}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField id="email" label="Email" variant="outlined"
                                   type={"email"} {...register("email", {})}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField id="phone" label="Phone number" variant="outlined"
                                   type={"text"} {...register("phone", {})}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField id="username" label="Username" variant="outlined"
                                   type={"username"} {...register("username", {})}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField id="password" label="Password" variant="outlined"
                                   type={"password"} {...register("password", {})}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="success" type={"submit"} sx={{width:200}}>
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default RegisterPage;

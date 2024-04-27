import React, {useContext} from 'react';
import AuthContext from "../../components/Context/AuthProvider";
import {Button, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";

type User = {
    username: string,
    password: string
}


function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<User>()

    let {loginUser} = useContext(AuthContext)
    const onSubmit = (data: User) => {
        loginUser(data)
    }

    return (
        <div className={"flex w-100 justify-center h-screen items-center flex-col"}>
            <h1 className={"font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl"}>Login Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid spacing={3} p={4} container>
                    <Grid item xs={12} sm={12}>
                        <TextField id="username" label="Username" variant="outlined"
                                   type={"text"} {...register("username", {})} style={{width: 350}}/>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField id="password" label="Password" variant="outlined"
                                   type={"password"} {...register("password", {})} style={{width: 350}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="success" type={"submit"} style={{width: 200}}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default LoginPage;

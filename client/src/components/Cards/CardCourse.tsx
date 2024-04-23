import React from 'react';
import {Card, Box, CardActionArea, CardContent, Typography, Badge} from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import {CZK} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

type CardComponentProps = {
    id: number
    name: string
    description: string
    price: number,
    topicId: number,
    topicName: string,
    index: number
}

function CardCourse({description, price, id, topicName, topicId, name, index}: CardComponentProps) {

    const navigate = useNavigate();
    const courseDetail = () => {
        navigate(`admin/course/${id}`);
    }
    return (
        <Card sx={{width: 345, height: 300}} onClick={courseDetail}>
            <Box sx={{height: 1 / 6, width: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Box sx={{width: 4 / 6}} display={"flex"} alignItems={"center"}
                     justifyContent={"space-between"}>
                    <Badge color="success" badgeContent={index}>
                        <KeyboardArrowUpIcon/>
                    </Badge>
                    <Badge color="secondary" badgeContent={CZK.format(price)}>
                        <LocalOfferIcon/>
                    </Badge>
                </Box>
            </Box>


            <CardActionArea sx={{height: 4 / 6}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <Box sx={{bgcolor: 'error.main', color: 'error.contrastText', p: 2, height: 1 / 6}}>
                {topicName}
            </Box>
        </Card>
    );
}

export default CardCourse;

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


const Message = ({message}) => {

    const isBot = message.sender === "bot";

    if (isBot) return (
        <Box sx={{
                display: "flex",
                justifyContent: "flex-start",
                mb: 2, }}>
            
            <Paper variant="outlined" sx={{p: 1, maxWidth: "60%" }}>
                <CardHeader 
                    avatar={<Avatar sx={{ bgcolor: deepOrange[500] }}>{message.user.name[0]}</Avatar>}
                    title={message.user.name}
                    subheader={message.user.role}
                    titleTypographyProps ={{variant:'h6'}}
                    sx={{"paddingBottom":"5px", }}
                />
                <CardContent sx={{"paddingTop":"5px"}}>
                    <Typography variant="body2" color="text.primary">
                    {message.text}
                    </Typography>
                </CardContent>
            </Paper>
        </Box>
    );
    else return(
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, }}>
        <Paper variant="outlined" sx={{p: 1, maxWidth: "60%" }}>
                <CardHeader 
                    avatar={<Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>}
                    title={"Yo"}
                    subheader="Usuario humano"
                    titleTypographyProps ={{variant:'h6'}}
                    sx={{"paddingBottom":"5px", }}
                />
                <CardContent sx={{"paddingTop":"5px"}}>
                    <Typography variant="body2" color="text.primary">
                    {message.text}
                    </Typography>
                </CardContent>
            </Paper>
    </Box>
    );
};

export default Message;

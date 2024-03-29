import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "../Message/Message";
import axios from 'axios';
import agents from '../../config/agents.json';


const ChatPage = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    

    useEffect(() => {
        const origin = agents[Math.floor(Math.random() * 3)]
        //const origin = agents[0]

        if (messages.length > 0) {
            axios.post(`http://${origin.url}:${origin.port}/v1/chat/completions`, {
                "messages": [
                    { "role": "system", "content": `${origin.role}. ${origin.limitations}` },
                    { "role": "user", "content": messages[messages.length - 1].text}
                ],
                "temperature": 0.7,
                "max_tokens": origin.max_tokens,
                "stream": false
            })
                .then(response => {
                    setMessages([...messages, { id: response.data.created, text: response.data.choices[0].message.content, sender: 'bot', user:origin }]);
                    console.log(messages)
                })
                .catch(error => {
                    console.error(error);
                });
        }

    }, [messages]);


    const handleSend = () => {
        if (input.trim() !== "") {
            setMessages([...messages, { id: 1, text: input, sender: 'user' , user:{}}]);            
            setInput("");
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };


    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </Box>
            <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            placeholder="Escribe un mensaje para iniciar la conversación"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={handleSend}
                            sx={{backgroundColor:"white", color:"#FF5117", '&:hover': {
                                background: "#FF5117",
                                color: "white"
                            }}}
                        >
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
};

export default ChatPage;
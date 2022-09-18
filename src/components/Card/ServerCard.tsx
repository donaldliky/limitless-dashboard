import React, { useState } from 'react'
import {
  Card,
  CardMedia,
  styled,
  Typography,
  Button,
  Box,

} from '@mui/material'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import StyledPrimaryButton from '../Buttons/StyledPrimaryButton'
import StyledOutlineButton from '../Buttons/StyledOutlineButton'
import StyledDisableButton from '../Buttons/StyledDisableButton'

interface ServerCardProps {
  index: any,
  server: any,
  handleEdit: any,
  handleDelete: any,
}

const ServerCard: React.FC<ServerCardProps> = (props) => {

  return (
    <Card
      sx={{
        width: '220px',
        minWidth: '220px',
        marginRight: '28px',
        padding: '10px',
        marginBottom: '20px',
        backgroundColor:'#2A3E5F',
        boxShadow: 'none'
      }}>

        <CardMedia
          component="img"
          height="200px"
          image="https://cdn.discordapp.com/icons/952391248365359115/64c58923fc88b7e045116183c385fe72.webp?size=100"
          width="200px"
        />
        <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography style={{ fontSize: '16px', fontWeight: "Bold"}}>
            {props.server.serverID}
          </Typography>
        </Box>
        <Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography>Server: </Typography>
            <Typography>{props.server.serverName}</Typography>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography>Channel: </Typography>
            <Typography>{props.server.channelName}</Typography>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography>Role Type: </Typography>
            <Typography>{props.server.roleType? 'NFT Count': 'Attribute'}</Typography>
          </Box>

          <Box sx={{mt:'10px'}}>
            <StyledPrimaryButton onClick={() => props.handleEdit(props.index)} style={{height: '40px'}}>Edit</StyledPrimaryButton>
            <StyledPrimaryButton onClick={() => props.handleDelete(props.index)} style={{height: '40px', marginLeft: '15px'}}>Delete</StyledPrimaryButton>
          </Box>
        </Box>
    </Card>
  )
}

export default ServerCard
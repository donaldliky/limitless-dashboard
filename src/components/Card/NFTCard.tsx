import React, { useState } from 'react'
import {
  Card,
  CardMedia,
  styled,
  Typography,
  Button,

} from '@mui/material'

import styles from './index.module.scss'
import { useResize } from './../../utils/Helper';

interface NFTCardProps {
  nft: any,
}

const NFTCard: React.FC<NFTCardProps> = (props) => {
  const { isMobile } = useResize();
  // console.log('nft props', props);
  return (
    <Card
      sx={{
        width: isMobile ? '150px' : '180px',
        height: isMobile ? '200px' : '228px',
        minWidth: '150px',
        marginRight: '7px',
        padding: '10px',
        marginBottom: '7px',
        backgroundColor: '#1B2332',
        boxShadow: 'none',
        borderRadius: '0px'
      }}>

      <CardMedia
        component="img"
        height={isMobile ? '130px' : '160px'}
        width={isMobile ? '130px' : '160px'}
        image={props.nft.image}
      />
      <div style={{ display: 'block' }}>
        <Typography style={{ fontSize: '12px', fontWeight: "Bold", marginTop: `10px` }} className={styles.card_info}>
          {props.nft.data.name.split("#")[0]}
        </Typography>
        <Typography style={{ fontSize: '12px' }} className={styles.card_info}>
          {props.nft.data.name}
        </Typography>
      </div>
    </Card>
  )
}

export default NFTCard
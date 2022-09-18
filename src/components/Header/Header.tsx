import React from 'react'

import {
    styled,
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    IconButton,
    Avatar,
    Menu,
    Link,
    MenuItem
} from '@mui/material'

import { StyledOutlineButton } from '../Buttons'
import { DISCORD_REDIRECT_URL } from '../../config'
import { useHistory } from "react-router-dom"

const StyledTypography = styled(Typography)(() => ({
  margin: '0 17px',
  display: 'flex',
  fontFamily: 'Arial',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '18px',
  alignItems: 'center',
  cursor: 'pointer'
}))



interface HeaderProps {

  admin: any,
  discordAccountInfo: any,
  handleLogoutClick: any

}

const Header: React.FC<HeaderProps> = (props) => {
  let history = useHistory();
  const settings = [
    {
      label: 'Logout',
      action: props.handleLogoutClick
    }
  ];

  const handleNavClick = (link) => {
    history.push(link);
  }

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static"
      sx={{
        height: 100,
        backgroundImage: 'none',
        bgcolor: '#010101',
        justifyContent: 'center',
      }}>
      <Container sx={{ maxWidth: '1920px !important' }}>
        <Toolbar disableGutters>
          <Box sx={{ mr: '25px', ml: '100px', display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <img src="/nav_logo.png" style={{height: '50px'}} />
            <Typography sx={{marginLeft: '20px', fontSize : '30px', fontWeight: 'bold', cursor: 'pointer'}} onClick={() => handleNavClick('/verify')}>DAO Verification </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <StyledTypography sx={{cursor: 'pointer'}} onClick={() => handleNavClick('/verify')}> Verify </StyledTypography>
            {
              props.admin && props.discordAccountInfo.username !== null? 
                <StyledTypography sx={{cursor: 'pointer'}} onClick={() => handleNavClick('/admin')}>  Admin </StyledTypography>
                : <></>
            }
            <StyledTypography><Link target="_blank" href= 'https://twitter.com/messages/compose?recipient_id=1473633931538747395' sx={{textDecoration: 'none', color: 'white'}}> <i className="fa-brands fa-twitter"></i>  </Link></StyledTypography>
            <StyledTypography> <Link target="_blank" href= 'https://discord.gg/sNz7SsFKh6' sx={{textDecoration: 'none', color: 'white'}}> <i className="fa-brands fa-discord"></i> </Link></StyledTypography>
          </Box>
          {
            props.discordAccountInfo.username === null ?
            <>
              <Box sx={{ flexGrow: 0, mr: '100px' }}>
                <StyledOutlineButton sx={{height: '50px'}} onClick={() => {window.location.href=DISCORD_REDIRECT_URL}}>
                  Discord ❄ Authorize
                </StyledOutlineButton>
              </Box>
            </>
            : 
            <>
              <Box sx={{mr: '20px'}}>
                <Typography sx={{color: '#FFFFFF', fontWeight: 'bold'}}>{props.discordAccountInfo.username} # {props.discordAccountInfo.discriminator}</Typography>
              </Box>
              <Box sx={{ flexGrow: 0, mr: '100px' }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar 
                  alt={props.discordAccountInfo.username} 
                  src={`https://cdn.discordapp.com/avatars/${props.discordAccountInfo.id}/${props.discordAccountInfo.avatar}.png?size=128`} />
                </IconButton>
                <Menu
                  sx={{ mt: '45px', me: '100px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.label} onClick={setting.action}>
                      <Typography textAlign="center">{setting.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          }

        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
  
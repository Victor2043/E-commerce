import React from 'react'
//, MenuItem, Menu, Icon
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
//import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/ecommerceIcon.jpg'
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    return (
        <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography>
                    <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
                    Commerce.js
                </Typography>
                <div className={classes.grow}/>
                <div className={classes.button}>
                    <IconButton aria-label="Mostrar Items do Carrinho">
                        <Badge badgeContent={2} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Navbar

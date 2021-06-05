import React from 'react'
//, MenuItem, Menu, Icon
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/ecommerceIcon.jpg'
import useStyles from './styles';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/carrinho" variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
                   Loja de eletrônicos
                </Typography>
                <div className={classes.grow}/>
                {location.pathname === "/" && (
                <div className={classes.button}>
                    <IconButton component={Link} to="/carrinho" aria-label="Mostrar Items do Carrinho">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div> )}
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Navbar

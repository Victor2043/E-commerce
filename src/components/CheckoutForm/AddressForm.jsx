import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';

const AddressForm = ({ checkoutToken, test }) => {
  const methods = useForm();

  
  return (
    <>
      <Typography variant="h6" gutterBottom>Endereço de entrega</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => test({ ...data }))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="Nome" />
            <FormInput required name="lastName" label="Sobrenome" />
            <FormInput required name="address1" label="Endereço" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="Cidade" />
            <FormInput required name="zip" label="Cep" />
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/carrinho">Voltar ao carrinho</Button>
            <Button type="submit" variant="contained" color="primary">Proximo</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
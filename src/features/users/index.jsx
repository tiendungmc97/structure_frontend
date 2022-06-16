import { Box, Tab, Tabs } from '@mui/material';
import AppHeader from 'components/AppHeader';
import Footer from 'components/Footer';
import React, { useState } from 'react';
import { Routes } from 'react-router-dom';
import { Container } from 'reactstrap';
import MainSlice from './components/MainSlice';

Users.propTypes = {};

function Users(props) {
  const [value, setValue] = useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Container>
        <MainSlice fluid="lg" />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="trang chủ" value="home"></Tab>
            <Tab label="giới thiệu" value="introduce" />
            <Tab label="nam" value="men" />
            <Tab label="nữ" value="women" />
            <Tab label="trẻ em" value="children" />
          </Tabs>
        </Box>
        <Routes>
          {/* <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/> */}
        </Routes>
        <Footer />
      </Container>
    </div>
  );
}

export default Users;

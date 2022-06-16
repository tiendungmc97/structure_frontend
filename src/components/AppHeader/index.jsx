import { Box, Button, Dialog, DialogContent } from '@mui/material';
import { MODE, ROLE } from 'constants/common';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Notification from './components/Notification';
import Search from './components/Search';
import UserHeader from './components/UserHeader';
import './styles.scss';

AppHeader.propTypes = {};

function AppHeader(props) {
  const customer = useSelector((state) => state.user.current.customer);
  const isLoggedInUser = !!customer?.id;

  // open dialog
  const [mode, setMode] = useState(MODE.LOGIN);

  const handleClickSignIn = () => {
    setMode(MODE.LOGIN);
  };
  const handleClickSignUp = () => {
    setMode(MODE.REGISTER);
  };

  const handleClose = () => {
    setMode('');
  };

  return (
    <div className="header">
      <Row className="header__main">
        <Col sx={8}>
          {customer?.role === ROLE.CUSTOMER && <div className="pointer">Hà Trung Store</div>}
          {customer?.role === ROLE.ADMIN && (
            <>
              <Row>
                <Col>
                  <Button>
                    <NavLink to="/home">Admin</NavLink>
                  </Button>
                  <Button>
                    <NavLink to="/user/slice">Ảnh bìa</NavLink>
                  </Button>
                  <Button>
                    <NavLink to="/tre-em">CHildren</NavLink>
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Col>
        <Col sx={4}>
          {customer?.role === ROLE.CUSTOMER && (
              <Notification />
          )}
          <Search />
          {isLoggedInUser && <UserHeader />}
          {!isLoggedInUser && (
            <>
              <span onClick={handleClickSignIn} className="pointer">
                Đăng nhập
              </span>
              <span> | </span>
              <span onClick={handleClickSignUp} className="pointer">
                Đăng kí
              </span>
              <Dialog
                PaperProps={{
                  sx: { position: 'fixed', top: '10vh', left: 'auto', m: 0, width: '400px' },
                }}
                fullWidth
                open={!!mode}
                onClose={handleClose}
              >
                <DialogContent>
                  {mode === MODE.LOGIN && (
                    <>
                      <Login closeDialog={handleClose} />
                      <Box textAlign="center" className="pointer mt-10">
                        <p color="primary" className="link" onClick={() => setMode(MODE.REGISTER)}>
                          Bạn chưa có tài khoản? Đăng kí tại đây
                        </p>
                      </Box>
                    </>
                  )}
                  {mode === MODE.REGISTER && (
                    <>
                      <Register closeDialog={handleClose} />
                      <Box textAlign="center" className="pointer mt-10 underline">
                        <p color="primary" className="link" onClick={() => setMode(MODE.LOGIN)}>
                          Bạn đã có tài khoản? Đăng nhập tại đây
                        </p>
                      </Box>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AppHeader;

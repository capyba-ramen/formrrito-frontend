import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import LogoSm from '../../assets/images/logo-sm.svg';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { removeToken } from '../../utils/auth';
import useAuth from '../AuthProvider/useAuth';
import useCreateForm from '../../api/hooks/useCreateForm';

import * as classNames from 'classnames/bind';
import style from './Header.module.scss';
const cx = classNames.bind(style);

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { loggedInUser } = useAuth();
  const { trigger: postCreateForm } = useCreateForm();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!loggedInUser) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    removeToken();
    handleClose();

    return navigate('/forms');
  };

  const handleCreateForm = () => {
    postCreateForm().then((res) => {
      if (res) {
        navigate(`/form/${res.data.form_id}`);
      }
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Paper elevation={1} className={cx('root')}>
        <Link to="/forms">
          <div className={cx('logo')}>
            <img height="44" src={LogoSm} />
          </div>
        </Link>
        <div className={cx('right')}>
          <Avatar
            alt={loggedInUser?.name}
            sx={{
              fontSize: 16,
              width: 30,
              height: 30,
              bgcolor: loggedInUser ? 'var(--red-1)' : 'var(--gray-2)',
              marginRight: '16px',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            {loggedInUser?.name[0]}
          </Avatar>
          <Button onClick={handleCreateForm} variant="contained" size="medium" startIcon={<AddIcon />}>
            Create Form
          </Button>
        </div>
      </Paper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableRestoreFocus
        elevation={1}
        slotProps={{
          paper: {
            sx: {
              padding: '16px 20px',
            },
          },
        }}
      >
        <Avatar
          alt={loggedInUser?.name}
          sx={{
            fontSize: 16,
            width: 30,
            height: 30,
            bgcolor: loggedInUser ? 'var(--red-1)' : 'var(--gray-2)',
            margin: '0 auto 12px',
          }}
        >
          {loggedInUser?.name[0]}
        </Avatar>
        <section className={cx('menu-links')}>
          <Typography variant="body2" component="p">
            {loggedInUser?.name}
          </Typography>
          <Typography
            onClick={handleSignOut}
            variant="body2"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <LogoutIcon fontSize="small" sx={{ marginRight: '4px' }} />
            Sign out
          </Typography>
        </section>
      </Popover>
    </>
  );
};

Header.displayName = 'Header';

export default Header;

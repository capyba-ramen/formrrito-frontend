import * as React from 'react';
import LogoSm from '../../assets/images/logo-sm.svg';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from '@mui/material/Paper';

import * as classNames from 'classnames/bind';
import style from './Header.module.scss';
const cx = classNames.bind(style);

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Paper elevation={1} className={cx('root')}>
        <div className={cx('logo')}>
          <img height="44" src={LogoSm} />
        </div>
        <div className={cx('right')}>
          <Avatar
            alt="Wei Lee"
            sx={{
              fontSize: 16,
              width: 30,
              height: 30,
              bgcolor: 'var(--red-1)',
              marginRight: '16px',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            W
          </Avatar>
          <Button variant="contained" size="medium" startIcon={<AddIcon />}>
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
          alt="Wei Lee"
          sx={{
            fontSize: 16,
            width: 30,
            height: 30,
            bgcolor: 'var(--red-1)',
            margin: '0 auto 12px',
          }}
        >
          W
        </Avatar>
        <section className={cx('menu-links')}>
          <Link underline="none" variant="body2" sx={{ display: 'block' }}>
            Wei Lee
          </Link>
          <Link underline="none" variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            <LogoutIcon fontSize="small" sx={{ marginRight: '4px' }} />
            Sign out
          </Link>
        </section>
      </Popover>
    </>
  );
};

Header.displayName = 'Header';

export default Header;
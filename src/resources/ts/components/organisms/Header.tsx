import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';

type Props = {
  logined: boolean;
};

const Header: FC<Props> = ({ logined }) => {
  const history = useHistory();
  const theme = useTheme();
  const queryClient = useQueryClient();

  const mutation = useMutation(() => axios.post('/api/logout'), {
    onSuccess: () => {
      queryClient.resetQueries('user');
    },
  });

  const handleLogout = useCallback(() => {
    mutation.mutate();

    history.push('/login');
  }, [mutation, history]);

  return (
    <>
      <AppBar
        position="sticky"
        style={{ color: theme.palette.text.primary, backgroundColor: 'white' }}
      >
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            style={{ flexGrow: 1 }}
            align="center"
          >
            OOUI-MEMO
          </Typography>
          {logined && (
            <Button type="button" onClick={handleLogout}>
              ログアウト
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import FooterNavItem from '../molecules/FooterNavItem';

const Footer: FC = () => {
  const theme = useTheme();
  return (
    <Box component="footer" p={4} bgcolor={theme.palette.common.white}>
      <Grid container spacing={4}>
        <Grid item xs={6} component="nav">
          <Typography component="h4" variant="h6">
            About
          </Typography>
          <List>
            {/* ページはまだ未作成 */}
            <FooterNavItem title="OOUI-MEMOとは？" linkUrl="/about" />
            <FooterNavItem title="Q &amp; A" linkUrl="/faq" />
          </List>
        </Grid>
        <Grid item xs={6} component="nav">
          <Typography component="h4" variant="h6">
            Legal
          </Typography>
          <List>
            <FooterNavItem title="利用規約" linkUrl="/terms" />
            <FooterNavItem title="プライバシーポリシー" linkUrl="/policy" />
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">© 2021 h-yoshikawa44</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;

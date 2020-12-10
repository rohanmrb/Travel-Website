import { makeStyles, withTheme } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  search : {
    margin: '15px',
    background: 'cyan',
    // border: '2px solid cyan'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));

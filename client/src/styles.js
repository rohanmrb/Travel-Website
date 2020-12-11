import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  heading: {
    backgroundColor: 'transparent',
    fontFamily: 'Sans-serif',
    color: 'darkblue',
    fontWeight: 'bold',
  },
  image: {
    marginLeft: '15px',
  },
}));

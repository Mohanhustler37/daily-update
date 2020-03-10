import { lighten, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        width: '99%',
        marginLeft: '1%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        height: 250
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    btnClr: {
        margin: theme.spacing(1),
        background: '#F9F9F9 0% 0% no-repeat padding-box',
        borderRadius: '12px',
        opacity: 1,
    },
    avatar: {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '24px',
        height: '24px'
    },
    list: {
        width: 410
    },
    fullList: {
        width: "auto"
    }
}));

export default useStyles;
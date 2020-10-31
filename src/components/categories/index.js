import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../../store/categories';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { setCategories } from '../../store/categories'
import {getCategoryeData} from '../../store/apiActions'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }));

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Status = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(async() => {
        let data = await getCategoryeData()
        props.setCategories(data);
        props.selectCategory(data.results[0].name);
        
    }, []);
    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" style={{ marginTop: '65px' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        {props.categories.map((category, idx) => {
                            return <Tab onClick={() => { props.selectCategory(category.name) }} key={idx} label={category.display_name} {...a11yProps(idx)} />
                        })}
                    </Tabs>
                </AppBar>
            </div>
        </>
    )
}
const mapStateToProps = state => ({
    categories: state.categories.categories,
});
const mapDispatchToProps = { selectCategory, setCategories };
export default connect(mapStateToProps, mapDispatchToProps)(Status);
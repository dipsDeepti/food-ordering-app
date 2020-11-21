import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

class TabPanel extends Component {
    constructor (props) {
        // Pass `props` into scope.
        super(props)
      }
        render() {
            const { children, value, index, ...other } = props;
         return(
             <div {...other}>
                 {value === index && <Box p={3}>{children}</Box>}</div>
         )
        }
    }

export default TabPanel;    

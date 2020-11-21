import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { render } from 'react-dom';
import '../Checkout/Checkout.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormControl';
import Input from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AddressData from '../Checkout/AddressData';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { InputLabel } from '@material-ui/core';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      value :"0"
    }  
}


getStepContent = (step) => {
  switch (step) {
    case 0:
     // return this.getSummary();
    case 1:
      return this.getPaymentMethod();
  }
}

getSummary = () =>{
  
}

getPaymentMethod = (index) =>{

}

getSteps = (index) =>{
  return ['Delivery', 'Payment'];
}

handleNext = () => {
  this.setState(() =>{
   return {activeStep:0+1}
  });
};

handleBack = () => {
 this.setState(() =>{
   return {activeStep:0}
  });
};

handleReset = () => {
 this.setState(() =>{
   return {activeStep:0}
  });
};
 handleChange = (event, newValue) => {
  this.setState(() =>{
    return {value : newValue}
   });
};

render() {
 // const {classes} = this.props;
  return(
    <div className = "parent">
 <div className = "right">
 <Stepper activeStep={this.state.activeStep} orientation="vertical">
 <Step key="Delivery">
 <StepLabel>Delivery</StepLabel>
 <StepContent>
   <Typography>
   <TabContext value={this.state.value}>
   <AppBar position="static">
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}>
        <Tab label="Existing Address" value = "0" />
        <Tab label="New Address" value = "1" />
      </Tabs>
      </AppBar>
     
      <TabPanel value="0">
      <GridList cellHeight={20} cols={3}>
                    {AddressData.map(image => (
                    <GridListTile key={image.id} rows= {7}>
                        <Typography>
                          {image.flatNo}
                        </Typography>
                        <Typography>
                          {image.locality}
                        </Typography>
                        <Typography>
                          {image.city}
                        </Typography>
                        <Typography>
                          {image.State}
                        </Typography>
                        <Typography>
                          {image.pinCode}
                        </Typography>
                        
                    </GridListTile>
                    ))}
       </GridList>

      </TabPanel>
  <TabPanel value="1">
<FormControl>
  <InputLabel htmlFor="my-input">flat</InputLabel>
<Input id="my-input" aria-describedby="my-helper-text" value = {"flat"} />
  
</FormControl>


  </TabPanel>
   </TabContext>
   </Typography>
   <br></br>
   <div className = "actionsContainer">
                <div>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack} >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext} className= "button">
                    {'Next'}
                  </Button>
                </div>
              </div>
 </StepContent>
 </Step>
 <Step key="Payment">
 <StepLabel>Payment</StepLabel>
 <StepContent>
   <Typography>
   <FormControl component="fieldset">
  <FormLabel component="legend">Select Mode of Payment</FormLabel>
  <RadioGroup aria-label="payment" name="payment" label="payment">
  <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
    <FormControlLabel value="Wallet" control={<Radio />} label="Wallet" />
    <FormControlLabel value="NetBanking" control={<Radio />} label="Net Banking" />
    <FormControlLabel value="Card" control={<Radio />} label="Debit / Credit Card" />
  </RadioGroup>
</FormControl>

   </Typography>
   <div className = "actionsContainer">
                <div>
                  <Button
                    onClick={this.handleBack} >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext} className= "button">
                    {'Finish'}
                  </Button>
                </div>
              </div>
 </StepContent>
 </Step>
 </Stepper>
        {this.state.activeStep === this.getSteps().length && (
        <Paper square elevation={0} className ="resetContainer">
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={this.handleReset} className= "button">
            Reset
          </Button>
        </Paper>
      )}
      </div>
    <div className = "left">
    </div>
    </div>
  )
}
}

export default Checkout;


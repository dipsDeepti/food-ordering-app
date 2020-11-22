import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import Input from "@material-ui/core/Input";
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
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { SvgIcon } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import validator from 'validator';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  }
})

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      value: "0",
      flatNo: "",
      locality: "",
      city: "",
      state: "",
      pincode: "",
      paymentData: [],
      flatNoMessage: "dispNone",
      localityMessage : "dispNone",
      cityMessage : "dispNone",
      stateMessage : "dispNone",
      pinCodeMessage : "dispNone",
      stateData:[],
      pinCodeErrorMessage:"required"
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

  getSummary = () => {

  }

  getStates = () => {
    let data = null;
    let that = this;
    let xhrStates = new XMLHttpRequest();
    xhrStates.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let responseData = JSON.parse(this.responseText).states;
        that.setState({
          stateData: responseData
        });
      }
    });

    xhrStates.open("GET", "http://localhost:8080/api/" + "states");
    xhrStates.send(data);
  }

  getSteps = (index) => {
    return ['Delivery', 'Payment'];
  }

  handleNext = () => {
    this.setState(() => {
      return { activeStep: 0 + 1 }
    });
  };

  handleBack = () => {
    this.setState(() => {
      return { activeStep: 0 }
    });
  };

  handleReset = () => {
    this.setState(() => {
      return { activeStep: 0 }
    });
  };
  handleChange = (event, newValue) => {
    this.setState(() => {
      return { value: newValue }
    });
  };

  inputFlatNoChangeHandler = (e) => {
    this.setState({ flatNo: e.target.value });
    this.state.flatNo === "" ? this.setState({flatNoMessage: "dispBlock"}) : this.setState({flatNoMessage: "dispNone"});
  }

  inputLocalityChangeHandler = (e) => {
    this.setState({ locality: e.target.value });
    this.state.locality === "" ? this.setState({localityMessage: "dispBlock"}) : this.setState({localityMessage: "dispNone"});
  }
  inputCityChangeHandler = (e) => {
    this.setState({ city: e.target.value });
    this.state.city === "" ? this.setState({cityMessage: "dispBlock"}) : this.setState({cityMessage: "dispNone"});
  }
  inputStateChangeHandler = (e) => {
    this.setState({ state: e.target.value });
    this.state.state.id === "" ? this.setState({stateMessage: "dispBlock"}) : this.setState({stateMessage: "dispNone"});
  }
  inputPinCodeChangeHandler = (e) => {
   this.setState({ pincode: e.target.value });

   this.state.pincode === "" ? this.setState({pinCodeMessage: "dispBlock",pinCodeErrorMessage:"required"}) 
    : ((!(validator.isNumeric(this.state.pincode))) || this.state.pincode.length !== 6) ? this.setState({pinCodeErrorMessage:"Pincode must contain only numbers and must be 6 digits long",pinCodeMessage:"dispBlock"})
    :this.setState({pinCodeMessage: "dispNone",pinCodeErrorMessage:""});
  }

  addressClickHandler = () =>{
    this.state.flatNo === "" ? this.setState({flatNoMessage: "dispBlock"}) : this.setState({flatNoMessage: "dispNone"});
    this.state.locality === "" ? this.setState({localityMessage: "dispBlock"}) : this.setState({localityMessage: "dispNone"});
    this.state.city === "" ? this.setState({cityMessage: "dispBlock"}) : this.setState({cityMessage: "dispNone"});
    this.state.state.id === "" ? this.setState({stateMessage: "dispBlock"}) : this.setState({stateMessage: "dispNone"});
    this.state.pincode === "" ? this.setState({pinCodeMessage: "dispBlock",pinCodeErrorMessage:"required"}) 
    : ((!(validator.isNumeric(this.state.pincode))) || this.state.pincode.length !== 6) ? this.setState({pinCodeErrorMessage:"Pincode must contain only numbers and must be 6 digits long",pinCodeMessage:"dispBlock"})
    :this.setState({pinCodeMessage: "dispNone",pinCodeErrorMessage:""});

    let addressData = JSON.stringify({
      "flat_building_name": this.state.flatNo,
      "locality": this.state.locality,
      "city": this.state.city,
      "state_uuid": this.state.state.id,
      "pincode": this.state.pincode
  });
  let that = this;
  let xhrAddress = new XMLHttpRequest();
  xhrAddress.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        let responseText = JSON.parse(this.responseText);

        if (this.status === 201) {
            that.setState({
                value: 0
            });
            that.clearAddressForm();
        }
    }
});
let url = "http://localhost:8080/api/" + 'address'
xhrAddress.open("POST", url);
xhrAddress.setRequestHeader("Content-Type", "application/json");
xhrAddress.setRequestHeader("Cache-Control", "no-cache");
xhrAddress.send(addressData);

  }

  clearAddressForm = () => {
    this.setState({
      flatNo: "",
      flatNoMessage: "dispNone",
        city: "",
        cityMessage: "dispNone",
        state: [],
        stateMessage: "dispNone",
        pincode: "",
        pinCodeMessage: "dispNone",
        pinCodeErrorMessage:"",
        locality: "",
        localityMessage: "dispNone",
    });
}

  componentWillMount() {
    // Get all post from insta account
    let data = null;
    let xhrPayment = new XMLHttpRequest();
    let that = this;
    xhrPayment.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let responseData = JSON.parse(this.responseText).paymentMethods;
        that.setState({
          paymentData: responseData
        });
      }
    });

    xhrPayment.open("GET", "http://localhost:8080/api/" + "payment");
    xhrPayment.send(data);
    this.getStates();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="parent">
        <Header showSearchBox={false} searchHandler={this.searchHandler} baseUrl={this.props.baseUrl} />
        <div className="right">
          <Stepper activeStep={this.state.activeStep} orientation="vertical">
            <Step key="Delivery">
              <StepLabel>Delivery</StepLabel>
              <StepContent>           
                  <TabContext value={this.state.value}>
                    <AppBar position="static">
                      <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}>
                        <Tab label="Existing Address" value="0" />
                        <Tab label="New Address" value="1" />
                      </Tabs>
                    </AppBar>

                    <TabPanel value="0" className={classes.root}>
                      <GridList cellHeight={20} cols={3} className={classes.gridList}>
                        {AddressData.map(image => (
                          <GridListTile key={image.id} rows={7}>
                            <Typography>
                              {image.flat_building_name}
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
                              {image.pincode}
                            </Typography>

                          </GridListTile>
                        ))}
                      </GridList>
                    </TabPanel>
                    <TabPanel value="1">
                      <FormControl required>
                        <InputLabel htmlFor="flat">Flat / Building No</InputLabel>
                        <Input id="flat" type="text" value={this.state.flatNo}
                          flat={this.state.flatNo} onChange={this.inputFlatNoChangeHandler} />
                           <FormHelperText className={this.state.flatNoMessage}>
                                <span className="red">required</span>
                            </FormHelperText>
                      </FormControl>
                      <br /><br />
                      <FormControl required>
                        <InputLabel htmlFor="locality">Locality</InputLabel>
                        <Input id="locality" type="text" value={this.state.locality}
                          locality={this.state.locality} onChange={this.inputLocalityChangeHandler} />
                           <FormHelperText className={this.state.localityMessage}>
                                <span className="red">required</span>
                            </FormHelperText>
                      </FormControl>
                      <br /><br />
                      <FormControl required>
                        <InputLabel htmlFor="city">City</InputLabel>
                        <Input id="city" type="text" value={this.state.city}
                          city={this.state.city} onChange={this.inputCityChangeHandler} />
                           <FormHelperText className={this.state.cityMessage}>
                                <span className="red">required</span>
                            </FormHelperText>
                      </FormControl><br /><br />
                      <FormControl required>
                        <InputLabel htmlFor="state">State</InputLabel>
                          <Select value = {this.state.state} onChange={this.inputStateChangeHandler}>
                            {this.state.stateData.map( x =>(
                              <MenuItem key={"state" + x.id} value = {x.state_name}>
                                {x.state_name}
                              </MenuItem>
                            )

                            )}
                          </Select>
                           <FormHelperText className={this.state.stateMessage}>
                                <span className="red">required</span>
                            </FormHelperText>
                      </FormControl><br /><br />
                      <FormControl required>
                        <InputLabel htmlFor="pincode">Pincode</InputLabel>
                        <Input id="pincode" type="text" value={this.state.pincode}
                          pincode={this.state.pincode} onChange={this.inputPinCodeChangeHandler} />
                           <FormHelperText className={this.state.pinCodeMessage}>
                            <span className="red">{this.state.pinCodeErrorMessage}</span>
                            </FormHelperText>
                      </FormControl><br /><br />
                      <Button variant="contained" color="secondary" onClick={this.addressClickHandler}>SAVE ADDRESS</Button>
                    </TabPanel>
                  </TabContext>
                <br></br>
                <div className="actionsContainer">
                  <div>
                    <Button
                      disabled={this.state.activeStep === 0}
                      onClick={this.handleBack} >
                      Back
                  </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext} className="button">
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
                      {this.state.paymentData.map(x => (
                        <FormControlLabel value={x.payment_name} control={<Radio />} label={x.payment_name} />
                      ))
                      }
                    </RadioGroup>
                  </FormControl>

                </Typography>
                <div className="actionsContainer">
                  <div>
                    <Button
                      onClick={this.handleBack} >
                      Back
                  </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext} className="button">
                      {'Finish'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          </Stepper>
          {this.state.activeStep === this.getSteps().length && (
            <Paper square elevation={0} className="resetContainer">
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={this.handleReset} className="button">
                Reset
          </Button>
            </Paper>
          )}
        </div>
        <div className="left">
          <Card variant="outlined">
            <CardContent>
              <Typography component="h2">
                SUMMARY
                </Typography>
            </CardContent>
          </Card>

        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Checkout);


import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from 'formik-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import RVTwo from '../../images/rv2.jpg';
import DatePicker from 'react-datepicker';
import {axiosWithAuth as axios} from '../../utils/axiosutils';

class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) { return; }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) { return null; }

    if (loading) { return <p>loading...</p>; }

    return (<img src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200} />);
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        RVNB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${RVTwo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ListingForm({ values, isSubmitting }) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a listing for your land:
          </Typography>
          <Form>
            <Field
              type="address"
              name="address"
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              autoComplete="address"
            />

            <Field
              type="zipcode"
              name="zipcode"
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="zipcode"
              label="Zip Code"
              autoComplete="zipcode"
            />
            <Field
              type="price"
              name="price"
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price Per Night"
              autoComplete="price"
            />
            <Field
                name="description"
                type="description"
                label="Description"
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="description"
                autoComplete="description"
              />

            <Field
              type="start_date"
              name="start_date"
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="start_date"
              label="Start Date"
              autoComplete="start_date"
            />

            <Field
              type="end_date"
              name="end_date"
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="end_date"
              label="End Date"
              autoComplete="end_date"
            />

            <Field
                name="img"
                type="img"
                label="Image URL"
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="img"
                autoComplete="img"
              />

            <Button 
              disabled={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Post Listing
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withFormik({
  mapPropsToValues({ address, zipcode, price, description, start_date, end_date, img }) {
    return {
      address: address || "",
      zipcode: zipcode || "",
      price: price || "",
      description: description || "",
      start_date: start_date || "",
      end_date: end_date || "",
      img: img || ""
    };
  },

  handleSubmit(values, { resetForm, setSubmitting }) {
    console.log(values);
    axios().post('/posts', values)
    .then(res => {
      console.log(res);
      window.location.replace("../listings");
    })
    .catch(err => console.log(err))
    resetForm();
    setSubmitting(false);
  }

})(ListingForm);
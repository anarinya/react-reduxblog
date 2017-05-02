import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  renderTextField(field) {
    const { meta: { touched, error } } = field;
    const className = `${ touched && error ? 'alert alert-danger' : ''}`;
    return (
      <div className="form-group">
        <label>{ field.label }</label>
        <input className="form-control" type="text" { ...field.input } />
        <br />
        <div className={ className }>
          { touched ? error : '' }
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      // Navigate back to root route
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="PostNew" onSubmit={ handleSubmit(this.onSubmit) }>
        <Field label="Title" name="title" component={ this.renderTextField } />
        <Field label="Categories" name="categories" component={ this.renderTextField } />
        <Field label="Post Content" name="content" component={ this.renderTextField } />
        <button type="submit" className="btn btn-primary">Submit</button> 
        <Link to="/"><button className="btn btn-danger">Cancel</button></Link>
      </form>
    );
  }
}

// called on form submission
// values contains all form values
// empty errors object assumes no errors and that the form is fine
const validate = (values) => {
  const errors = {};

  // errors[property] must match field name property
  if (!values.title || values.title.length < 3) { 
    errors.title = "Enter a title at least 3 chars long"; 
  }
  if (!values.categories) errors.categories = "Enter a category";
  if (!values.content) errors.content = "Enter post content";

  return errors;
};

// pass a single arg, a function, that takes config options
// form is the name of the form, only requirement is to be unique to other forms
export default reduxForm({ 
  validate, 
  form: 'PostNewForm' 
})(connect(null, { createPost })(PostNew));
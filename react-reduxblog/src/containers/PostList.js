import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';

class PostList extends Component {
  static propTypes = {
    posts: React.PropTypes.object
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    // _.map(this.props.posts, post => {
    //   return (<li className="list-group-item" key={post.id}>{post.title}</li>);  
    // });
    return Object.keys(this.props.posts).map(key => {
      const post = this.props.posts[key];
      return (
        <li className="list-group-item" key={key}>
          <Link to={`/posts/${key}`}>{post.title}</Link>
        </li>
      );
    });
  }

  renderNote() {
    return (
      <h4>There are no posts currently available.</h4>
    );
  }

  arePostsAvailable() {
    return this.props.posts && Object.keys(this.props.posts).length > 0;
  }

  render() {

    return (
      <div className="PostList row">
        <div className="pull-right">
          <Link to="/posts/new" className="btn btn-primary">Add a post</Link>
        </div>
        <h1>Posts</h1>
          { this.arePostsAvailable() 
            ? <ul className="list-group">{ this.renderPosts() }</ul>
            : this.renderNote() 
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ posts: state.posts });

export default connect(mapStateToProps, { fetchPosts })(PostList);
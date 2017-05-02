import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  handleDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) return <div>Loading....</div>;

    return (
      <div className="PostDetail">
        <Link to="/">Back to index</Link>
        <h3>{ post.title }</h3>
        <h6>Categories: { post.categories }</h6>
        <p>{ post.content }</p>
        <button className="btn btn-danger pull-xs-right" onClick={ this.handleDeleteClick }>
          Delete Post
        </button>
      </div>
    );
  }
}

// ownProps is the prop going to this particular component
const mapStateToProps = ({ posts }, ownProps) => ({ post: posts[ownProps.match.params.id] });
export default connect(mapStateToProps, { fetchPost, deletePost })(PostDetail);
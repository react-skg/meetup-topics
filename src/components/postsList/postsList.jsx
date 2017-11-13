import React, { Component } from 'react';
import getPosts from 'queries/getPosts.gql';
import { graphql, compose } from 'react-apollo';

import CreatePostButton from './createPostButton';

import './post.scss';

class PostsList extends Component {
  renderSmthng() {}

  render() {
    const { allPosts: posts = [], loading } = this.props.data;
    const supPosts = posts.map(post => Object.assign({}, post));
    console.log('ALL_POSTS', posts);
    return (
      <div>
        <div>Posts</div>
        {loading && <div>Loading...</div>}
        {supPosts.map(post => (
          <div
            key={post.id}
            className="mt-post"
          >
            <div>Title: {post.title}</div>
            <div>Description: {post.description}</div>
            <div>Posted By: {post.user && post.user.name}</div>
            <div>Votes: {post._votesMeta.count}</div>
          </div>
        ))}
        <CreatePostButton />
      </div>
    );
  }
}

PostsList.propTypes = {};

export default graphql(getPosts)(PostsList);

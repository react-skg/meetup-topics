import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import { graphql, compose } from 'react-apollo';
import createPost from 'mutations/createPost.gql';
import getPosts from 'queries/getPosts.gql';

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, { value, name }) {
    this.setState(() => ({
      [name]: value
    }));
  }

  handleSubmit() {
    const { description, title } = this.state;
    this.props.onSubmit({ description, title });
  }

  render() {
    const { description, title } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input label="Title" value={title} name="title" onChange={this.handleChange} />
        <Form.TextArea
          label="Description"
          name="description"
          value={description}
          onChange={this.handleChange}
        />
        <Form.Button color="violet" content="Submit Topic" />
      </Form>
    );
  }
}

const PostFormMutationContainer = graphql(createPost, {
  props: ({ mutate }) => ({
    onSubmit: ({ title, description }) =>
      mutate({
        variables: {
          description,
          title
        },
        optimisticResponse: {
          createPost: {
            __typename: 'Mutation',
            id: '1',
            title,
            description,
            user: {
              __typename: 'User',
              name: ''
            }
          }
        },
        update: (store, { data }) => {
          const options = {
            query: getPosts
          };

          const queryData = store.readQuery(options);

          const allPosts = queryData.allPosts.concat(Object.assign({}, data.createPost, {
            __typename: 'Post',
            _votesMeta: {
              count: 0,
              __typename: '_QueryMeta'
            }
          }));

          options.data = {
            allPosts
          };

          store.writeQuery(options);
        }
      }).catch(console.warn)
  })
});

PostForm.propTypes = {};

export default compose(PostFormMutationContainer)(PostForm);

import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import createPost from 'mutations/createPost.gql';
import getPosts from 'queries/getPosts.gql';

class CreatePostButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onChange(e) {
    const { value } = e.target;

    this.setState(() => ({
      value
    }));
  }

  handleClick() {
    const { value } = this.state;

    this.props.handleClick(value);
  }

  render() {
    return (
      <div>
        <textarea onChange={this.onChange} value={this.state.value} />
        <button onClick={this.handleClick}>Create New Post</button>
      </div>
    );
  }
}

CreatePostButton.propTypes = {};

const CreatePostButtonDataContainer = graphql(createPost, {
  props: ({ mutate, data: odat }) => {
    console.log('odat', odat);

    return {
      handleClick: value =>
        mutate({
          variables: {
            description: '',
            title: value
          },
          optimisticResponse: {
            createPost: {
              __typename: 'Mutation',
              id: '1',
              title: value
            }
          },
          update: (store, { data }) => {
            const options = {
              query: getPosts
            };

            const queryData = store.readQuery(options);

            const allPosts = queryData.allPosts.concat(Object.assign({}, data.createPost, {
              description: '',
              user: null,
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
    };
  }
});

export default compose(CreatePostButtonDataContainer)(CreatePostButton);

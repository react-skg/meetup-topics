import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import createVote from 'mutations/createVote.gql';
import getPosts from 'queries/getPosts.gql';
import { Button } from 'semantic-ui-react';
import withUser from '../withUser';

const CreateVoteButtonDataContainer = graphql(createVote, {
  props: ({ mutate, ownProps }) => ({
    handleClick: () =>
      mutate({
        variables: {
          postId: ownProps.postId,
          userId: ownProps.userId
        },
        optimisticResponse: {
          createVote: {
            __typename: 'Mutation',
            id: '1',
            post: {
              __typename: 'Post',
              id: ownProps.postId
            }
          }
        },
        update: (store, { data }) => {
          const options = {
            query: getPosts
          };

          const queryData = store.readQuery(options);

          options.data = {
            allPosts: queryData.allPosts.map((post) => {
              if (post.id === ownProps.postId) {
                return Object.assign({}, post, {
                  _votesMeta: Object.assign({}, post._votesMeta, {
                    count: post._votesMeta ? post._votesMeta.count + 1 : 0
                  })
                });
              }

              return post;
            })
          };

          store.writeQuery(options);
        }
      }).catch(console.warn)
  })
});

export default compose(withUser, CreateVoteButtonDataContainer)(props => (
  <Button
    floated="right"
    basic
    color="violet"
    content="Upvote"
    icon="spock hand"
    onClick={props.handleClick}
  />
));

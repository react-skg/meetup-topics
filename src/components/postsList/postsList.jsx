import React, { Component } from 'react';
import getPosts from 'queries/getPosts.gql';
import { graphql, compose } from 'react-apollo';

import { Item, Segment, Container, Menu, Button, Modal, Header, Icon } from 'semantic-ui-react';
import Logo from '../logo';
import PostForm from '../postForm';
import VoteButton from './voteButton';
import './post.scss';

class PostsList extends Component {
  renderSmthng() {}

  render() {
    const { allPosts: posts = [], loading } = this.props.data;
    const supPosts = posts.map(post => Object.assign({}, post));

    const fixedMenuStyle = {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
    };

    const contentStyle = {
      paddingTop: '100px'
    };

    return (
      <Segment vertical style={contentStyle}>
        <Menu borderless fixed="top" style={fixedMenuStyle}>
          <Container>
            <Menu.Item
              style={{
                width: '70px'
              }}
            >
              <Logo />
            </Menu.Item>
            <Menu.Item header>Meetup Topics</Menu.Item>
            <Menu.Item position="right">
              <Modal
                trigger={<Button circular color="violet" content="Suggest a topic" icon="plus" />}
              >
                <Modal.Header>
                  <Header
                    color="grey"
                    as="h3"
                    content="Suggest a topic for a future meetup"
                    icon="browser"
                  />
                </Modal.Header>
                <Modal.Content>
                  <PostForm />
                </Modal.Content>
              </Modal>
            </Menu.Item>
          </Container>
        </Menu>
        <Container>
          {loading && (
            <Container>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100vh',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              >
                <Logo />
              </div>
            </Container>
          )}
          <Item.Group divided>
            {supPosts.map(post => (
              <Item key={post.id}>
                <Item.Content>
                  <Item.Header>{post.title}</Item.Header>
                  <Item.Meta>{post.user && post.user.name}</Item.Meta>
                  <Item.Description>{post.description}</Item.Description>
                  <Item.Extra>
                    <Icon name="heartbeat" color={post._votesMeta.count ? 'orange' : 'grey'} />{' '}
                    {post._votesMeta.count ? `${post._votesMeta.count} votes` : ''}
                    <VoteButton postId={post.id} creator={post.user && post.user.id} />
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Container>
      </Segment>
    );
  }
}

PostsList.propTypes = {};

export default graphql(getPosts)(PostsList);

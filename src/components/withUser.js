import { graphql } from 'react-apollo';
import getUser from 'queries/getUser.gql';

const withUser = graphql(getUser, {
  props: ({ data }) => {
    let { user = {}, loading } = data;
    if (!user) {
      user = {};
    }
    return {
      auth0UserId: user.auth0UserId,
      name: user.name,
      imgUrl: user.imgUrl,
      role: user.role,
      loading
    };
  }
});

export default withUser;

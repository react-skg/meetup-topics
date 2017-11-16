import { graphql } from 'react-apollo';
import createUser from 'mutations/createUser.gql';

const withCreateUser = graphql(createUser, {
  props: ({ ownProps, mutate }) => ({
    createUser: (variables) => {
      if (ownProps.user) {
        return null;
      }

      return mutate({ variables });
    }
  })
});

export default withCreateUser;

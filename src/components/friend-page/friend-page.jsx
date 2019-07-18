import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { GetFriendQuery } from '../../graphql/queries';
import {
  Header,
  NavMenu,
  Modal,
  // FriendCreationComponent,
  FriendContent,
  AppLoading,
  AppError,
} from '..';

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  username = this.props.match.params.username;

  queryVariables = {
    username: this.username,
    friendId: this.props.match.params.friendId,
  }

  render() {
    return (
      <div>
        <Query query={GetFriendQuery} variables={this.queryVariables}>
          {
            ({ loading, error, data }) => {
              if (loading) return <AppLoading />;
              if (error) return <AppError />;

              return (
                <Fragment>
                  <Header />
                  <NavMenu />
                  <Modal
                    handleClose={this.hideModal}
                    show={this.state.show}
                    username={this.username}
                    friendId={this.props.match.params.friendId}
                    goalSetCollection={data.friend.goalSetCollection}
                  />

                  {/* <FriendCreationComponent showModal={this.showModal} /> */}
                  <FriendContent friend={data.friend} showModal={this.showModal} />
                </Fragment>
              );
            }
          }
        </Query>
      </div>
    );
  }
}

Friend.propTypes = {
  friend: PropTypes.object,
  match: PropTypes.object,
};

export default Friend;

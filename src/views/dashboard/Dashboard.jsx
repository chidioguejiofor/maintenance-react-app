import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import RequestTable from '../../components/requests/RequestTable';
import Header from '../../components/Header';
import uploadImageAction from '../../actions/uploadImageAction';
import { createRequest, updateRequest,
  getUserRequests, getAllRequests } from '../../actions/requestAction';
/**
 *this represents the Dashboard for both the admin and the
  regular users
 */
export class Dashboard extends Component {
  /**
   * this creates an instance of a Dashboard
   * @param {object} props the props passed to it as argument
   */
  constructor(props) {
    super(props);
    const { sendUploadImageRequest, match: { path } } = props;
    this.state = {
      title: '',
      location: '',
      image: '',
      description: '',
      allowModalToOpen: undefined,
      requests: [],

    };
    this.admin = path === '/dashboard/admin';


    this.fileReader = new FileReader();
    this.fileReader.addEventListener('load', () => {
      this.setState({ image: this.fileReader.result });
      sendUploadImageRequest(this.fileReader.result);
    });
    this.handleRequestChange = this.handleRequestChange.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
    this.persistRequest = this.persistRequest.bind(this);
  }


  /**
   *this is called anytime the component mounts.
   It makes an api request to fetch all the requests
   of this user
   @returns {void} performs an action and returns nothing
   */
  componentDidMount() {
    const { sendLoadUserRequest,
      sendLoadAllRequests } = this.props;
    if (this.admin) return sendLoadAllRequests();
    return sendLoadUserRequest();
  }

  /**
   *this is called anytime the component mounts.
   It makes an api request to fetch all the requests
   of this user
   @returns {void} performs an action and returns nothing
   @param {object} newProps this contains the new props
   */
  componentWillReceiveProps(newProps) {
    const { sendLoadUserRequest } = this.props;

    if (newProps.loadedRequest.requests) {
      this.setState({
        requests: newProps.loadedRequest.requests,
        allowModalToOpen: undefined,
      });
    }

    if (newProps.image.imageUrl) {
      this.setState({ image: newProps.image.imageUrl });
    }

    if (newProps.currentRequest.success) {
      setTimeout(() => {
        this.setState({ allowModalToOpen: false });
        sendLoadUserRequest();
      }, 1500);
    }
  }

  /**
   * this is fired when the user types in the create request form
   * @param {object} e an object that contains the event information's
   * @param {object} param1 contains the attributes f the component
   * @returns {void} performs an action and nothing
   */
  handleRequestChange(e, { name, value }) {
    if (name === 'image') {
      return this.fileReader.readAsDataURL(e.target.files[0]);
    }
    this.setState({ [name]: value });
  }

  /**
   * this creates a new request
   * @param {object} type a string that contains the the request type
   * @param {object} param1 contains the attributes f the component
   * @returns {void} performs an action and nothing
   */
  persistRequest(type) {
    const { sendCreateRequest, sendUpdateRequest } = this.props;

    const { title, description, location, image, id } = this.state;
    if (type === 'update') {
      return sendUpdateRequest({ id, title, description, location, image });
    }
    sendCreateRequest({ title, description, location, image });
  }


  /**
   *this handles the click event fired when the update button is clicked
   * @param {object} request contains the request that was made
   * @returns {void} handles the event and returns void
   */
  onUpdateClick(request) {
    this.setState({
      title: request.title,
      description: request.description,
      location: request.location,
      image: request.image,
      id: request.id,
    });
  }

  /**
   *this handles the click event fired when the update button is clicked
   * @param {object} request contains the request that was made
   * @returns {void} handles the event and returns void
   */
  onCreateClick() {
    this.setState({
      title: '',
      description: '',
      location: '',
      image: '',
    });
  }

  /**
   * this returns html from
   *@returns {JSX} returns html to be rendered
   */
  render() {
    const { title, location, image,
      requests, description, allowModalToOpen } = this.state;

    const currentRequest = { title, location, image, description };
    const { image: storeImage, loadedRequest,
      currentRequest: currentStoreRequest } = this.props;
    return (
      <div>
        <Header />

        <Dimmer active={loadedRequest.isLoading}>
          <Loader content="Loading Requests" />

        </Dimmer>
        <RequestTable
          onCreateRequestChange={this.handleRequestChange}
          requests={requests}
          currentRequest={currentRequest}
          editedRequest={currentStoreRequest}
          onUpdateClick={this.onUpdateClick}
          onCreateClick={this.onCreateClick}
          buttonLoading={storeImage.isLoading}
          onSubmit={this.persistRequest}
          openModals={allowModalToOpen}
          admin={this.admin}
        />


      </div>
    );
  }
}

Dashboard.propTypes = {
  sendCreateRequest: PropTypes.func,
  sendUploadImageRequest: PropTypes.func,
  sendLoadUserRequest: PropTypes.func,
  sendUpdateRequest: PropTypes.func,
  image: PropTypes.objectOf(PropTypes.any),
  currentRequest: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool])
  ),
  loadedRequest: PropTypes.objectOf(PropTypes.any),
  sendLoadAllRequests: PropTypes.func,
};

Dashboard.defaultProps = {
  sendCreateRequest: () => {},
  sendUploadImageRequest: () => {},
  sendLoadUserRequest: () => {},
  sendUpdateRequest: () => {},
  sendLoadAllRequests: () => {},
  image: '',
  currentRequest: {},
  loadedRequest: false,
};


export const mapStateToProps = ({ image, loadedRequest, currentRequest }) => ({
  image,
  loadedRequest,
  currentRequest,
});

export const mapDispatchToProps = dispatch => ({
  sendUploadImageRequest: imageUrl => dispatch(uploadImageAction(imageUrl)),
  sendCreateRequest: request => dispatch(createRequest(request)),
  sendLoadUserRequest: () => dispatch(getUserRequests()),
  sendLoadAllRequests: () => dispatch(getAllRequests()),
  sendUpdateRequest: request => dispatch(updateRequest(request)),
  resetCurrentRequest: () => dispatch({ type: 'REQUEST_RESET' }),

});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

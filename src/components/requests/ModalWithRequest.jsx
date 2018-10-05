
import React from 'react';
import { Modal, Button, Container, Header, Label,
  Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getColor, getIconType,
  capitalizeWord } from '../../helpers/requestHelper';

const ModalWithRequest = ({
  title, description, location, status, date, image
}) => (
  <span id="modal-with-request">
    <Modal

      size="small"
      trigger={(
        <Button
          size="small"
          content="Info"
          icon="info"
        />
      )}
    >
      <Modal.Header>{title.toUpperCase()}</Modal.Header>
      <Modal.Content>
        <Container>

          <Image centered src={image} size="big" />
          <div className="request">
            <Header size="large">Created On </Header>
            <p>{`${new Date(date).toDateString()}`}</p>
            <Header size="large">Description</Header>
            <p>{description}</p>
            <Header size="large">Location </Header>
            <p>{location}</p>
            <Label size="large">
              <Icon
                name={getIconType(status)}
                color={getColor(status)}
              />
              {capitalizeWord(status)}
            </Label>
          </div>

        </Container>
      </Modal.Content>
    </Modal>

  </span>
);


ModalWithRequest.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,

};


export default ModalWithRequest;

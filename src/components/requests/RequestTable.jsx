import { Table, Container, Label, Icon } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import RequestModalWithForm from './RequestModalWithForm';
import ModalWithRequest from './ModalWithRequest';
import AdminButtons from './AdminButtons';
import { getColor, getIconType,
  capitalizeWord } from '../../helpers/requestHelper';


const RequestTable = ({
  onCreateRequestChange, requests, onSubmit, currentRequest,
  onUpdateClick, onCreateClick, buttonLoading, editedRequest,
  openModals, admin
}) => (
  <div id="request-table">
    <Container>
      <Table singleLine>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="12" textAlign="center">
              <span className="table-title">
                YOUR REQUESTS
                <RequestModalWithForm
                  {...currentRequest}
                  onChange={onCreateRequestChange}
                  onClick={onCreateClick}
                  buttonLoading={buttonLoading}
                  onSubmit={onSubmit}
                  success={editedRequest.success}
                  loading={editedRequest.isLoading}
                  messageTitle={editedRequest.message}
                  errorMessages={editedRequest.errors.errorMessages}
                  open={openModals}
                />

              </span>

            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {requests.map(request => (
            <Table.Row key={request.id}>

              <Table.Cell colSpan="6">
                <div className="request-info">

                  <div className="title">
                    {capitalizeWord(request.title) }
                  </div>
                  <div className="description">
                    {request.description}

                  </div>
                  <div>
                  Created On:
                    {` ${new Date(request.date).toDateString()}`}
                  </div>
                  <div className="label-update-group">

                    <ModalWithRequest {...request} />
                    {!admin && request.status === 'pending' ? (
                      <RequestModalWithForm
                        {...currentRequest}
                        onSubmit={() => onSubmit('update')}
                        onChange={onCreateRequestChange}
                        onClick={() => onUpdateClick(request)}
                        update
                        buttonLoading={buttonLoading}
                        success={editedRequest.success}
                        loading={editedRequest.isLoading}
                        messageTitle={editedRequest.message}
                        errorMessages={editedRequest.errors.errorMessages}
                        open={openModals}
                      />
                    ) : null}

                    {admin ? (
                      <AdminButtons
                        status={request.status}
                        onClick={onSubmit}
                        requestId={request.id}
                      />
                    ) : ''}
                    <Label size="large" basic>
                      <Icon
                        name={getIconType(request.status)}
                        color={getColor(request.status)}
                      />
                      {capitalizeWord(request.status)}
                    </Label>
                  </div>
                </div>
              </Table.Cell>
            </Table.Row>


          ))}
        </Table.Body>


      </Table>
    </Container>

  </div>

);

RequestTable.propTypes = {
  onCreateRequestChange: PropTypes.func.isRequired,
  requests: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentRequest: PropTypes.objectOf(PropTypes.string).isRequired,
  onUpdateClick: PropTypes.func.isRequired,
  onCreateClick: PropTypes.func.isRequired,
  buttonLoading: PropTypes.bool,
  editedRequest: PropTypes.objectOf(PropTypes.any).isRequired,
  openModals: PropTypes.bool.isRequired,
};

RequestTable.defaultProps = {
  buttonLoading: false,
};
export default RequestTable;

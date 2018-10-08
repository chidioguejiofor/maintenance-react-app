import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getColor } from '../../helpers/requestHelper';

const createButton = (content, onClick, requestId) => (
  <Button
    content={content}
    onClick={() => onClick(content.toLowerCase(), requestId)}
    color={getColor(`${content.toLowerCase()}d`)}
    size="small"
  />
);
const getButtonsArr = (status, onClick, requestId) => {
  const arr = [];

  if (status === 'pending' || status === 'disapproved') {
    arr.push(createButton('Approve', onClick, requestId));
  }
  if (status === 'approved') {
    arr.push(createButton('Resolve', onClick, requestId));
  }
  if (status === 'pending' || status === 'approved') {
    arr.push(createButton('Disapprove', onClick, requestId));
  }

  return arr;
};

const AdminButtons = ({ status, onClick, requestId }) => (
  <span>
    {getButtonsArr(status, onClick, requestId)
      .map(elements => elements)}

  </span>
);

AdminButtons.propTypes = {
  status: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  requestId: PropTypes.number.isRequired,
};


export default AdminButtons;

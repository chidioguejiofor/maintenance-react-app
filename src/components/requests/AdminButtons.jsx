import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getColor } from '../../helpers/requestHelper';

const AdminButtons = ({ status, onClick, requestId }) => {
  if (status === 'pending') {
    return (
      <span>
        <Button
          content="Approve"
          onClick={() => onClick('approve', requestId)}
          color={getColor('approved')}
          size="small"
        />
        <Button
          content="Disapprove"
          onClick={() => onClick('disapprove', requestId)}
          color={getColor('disapproved')}
          size="small"
        />
      </span>

    );
  }

  if (status === 'disapproved') {
    return (
      <span>
        <Button
          content="Approve"
          onClick={() => onClick('approve', requestId)}
          color={getColor('approved')}
          size="small"
        />
      </span>

    );
  }
  if (status === 'approved') {
    return (
      <span>
        <Button
          content="Resolve"
          onClick={() => onClick('resolve', requestId)}
          color={getColor('resolved')}
          size="small"
        />
        <Button
          content="Disapprove"
          onClick={() => onClick('disapprove', requestId)}
          color={getColor('disapproved')}
          size="small"
        />
      </span>

    );
  }

  return '';
};

AdminButtons.propTypes = {
  status: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  requestId: PropTypes.number.isRequired,
};


export default AdminButtons;
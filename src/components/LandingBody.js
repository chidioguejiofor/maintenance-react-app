import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const LandingBody = ({
  buttons,

}) => (
  <div className="simple-background-image landing-body">
    <div>
      <h1>Solving your maintenance needs is what we do</h1>

      <ul className="horizontal-list">
        {buttons.map(button => (
          <li key={button.caption}>

            <Link
              className={button.className}
              to={button.link}
              activeClassName={button.className}
            >
              {button.caption}
            </Link>

          </li>
        ))}
      </ul>

    </div>

  </div>
);
export default LandingBody;


LandingBody.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object),
};


LandingBody.defaultProps = {
  buttons: []
};

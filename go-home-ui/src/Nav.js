import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
    render() {    
        return (
            <nav className="Nav">
                <div className="Nav__container">
                    <Link to="/" className="Nav__brand">Home</Link>

                    <div className="Nav__right">
                        <ul className="Nav__item-wrapper">
                            <li className="Nav__item">
                                <Link className="Nav__link" to="/controlPoints">Control Points</Link>
                            </li>
                            <li className="Nav__item">
                                <Link className="Nav__link" to="/nodes">Nodes</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
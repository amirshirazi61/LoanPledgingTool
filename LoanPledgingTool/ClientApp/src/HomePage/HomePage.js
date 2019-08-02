import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './../components/Layout';

class HomePage extends React.Component {
    render() {
        const { user, users } = this.props;
        return (
            <Layout>
                <div className="jumbotron">
                    <div className="container">
                        <div className="col-md-6 col-md-offset-3">
                            <h1>Hi {user.firstName}!</h1>
                            <p>You're logged in!!</p>
                            <p>
                                <Link to="/login">Logout</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const connectedHomePage = connect(mapState)(HomePage);
export { connectedHomePage as HomePage };
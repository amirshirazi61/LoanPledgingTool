import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import FetchData2 from './components/FetchData2';
import { LoginPage } from './components/LoginPage';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/fetch-data2/:startDateIndex?' component={FetchData2} />
        <Route path='/login' component={LoginPage} />
    </Layout>
);

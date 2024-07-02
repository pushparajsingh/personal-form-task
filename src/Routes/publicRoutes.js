import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppForm from '../Components/Form';
import Layout from '../Components/Layout/Layout';

const PublicRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="" element={<AppForm />} />
      </Routes>
    </Layout>
  );
};

export default PublicRoutes;

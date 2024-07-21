import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppForm from '../Components/Form';
import Layout from '../Components/Layout/Layout';
import DataList from '../Pages/DataShow';

const PublicRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AppForm />} />
        <Route path="/appform" element={<DataList />} />
      </Routes>
    </Layout>
  );
};

export default PublicRoutes;

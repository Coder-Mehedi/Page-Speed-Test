import { Button } from 'antd';
import React from 'react';
import ApiKeyForm from '../../src/components/api-key-form';
import Layout from '../../src/components/_layout';

const SettingsPage = () => {
  return (
    <Layout>
      <ApiKeyForm />
    </Layout>
  );
};

export default SettingsPage;

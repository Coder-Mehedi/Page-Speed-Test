import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Login from '../src/components/login';
import Layout from '../src/components/_layout';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  );
};

export default Home;

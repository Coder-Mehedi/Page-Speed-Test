import { Layout as AntLayout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UploadOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

const { Header, Sider, Content } = AntLayout;

const Layout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((prev) => !prev);
  const router = useRouter();

  return (
    <AntLayout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[router.pathname]}
        >
          <Menu.Item
            key={'/login'}
            icon={<UserOutlined />}
            onClick={() => router.push('/login')}
          >
            Login
          </Menu.Item>
          <Menu.Item
            key={'/settings'}
            icon={<ToolOutlined />}
            onClick={() => router.push('/settings')}
          >
            Settings
          </Menu.Item>
          <Menu.Item
            key='/speed'
            icon={<UploadOutlined />}
            onClick={() => router.push('/speed')}
          >
            Speed Test
          </Menu.Item>
        </Menu>
      </Sider>
      <AntLayout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          <span className='trigger' onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 112px)',
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;

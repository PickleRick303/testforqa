import React, { useContext, useEffect, useState } from 'react';
import ukUA from 'antd/lib/locale/uk_UA';
import {
  ConfigProvider,
  theme,
  Space,
  Row,
  Col,
  App,
  message,
  Layout,
  Button,
} from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Table from './components/table';
import { GET_USERS, DELETE_USER } from './api/users';
import Create from './components/create';
import Update from './components/update';
const { Header, Footer, Sider, Content } = Layout;

const AppComponent = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const cache = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const onDeleteReq = useMutation({
    mutationFn: async (login) => {
      return await DELETE_USER(login);
    },
    onError: (error) => {},
    onSuccess: (id) => {
      cache.invalidateQueries({ queryKey: ['users'], exact: true });
    },
  });
  const usersReq = useQuery({
    queryKey: ['users'],
    queryFn: () => GET_USERS(),
    initialData: [],
  });

  console.log(usersReq.data);
  return (
    <ConfigProvider
      locale={ukUA}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          fontSize: 12,
          //  colorErrorTextActive: "#cc0e12",
          borderRadius: 4,
          wireframe: true,
          //  colorLink: "#679de8",
          colorBgBase: '#313131',
          colorPrimaryBg: '#7892a5',
          // colorPrimaryActive: "#1b6ced",
          // colorPrimaryText: "#69a3ff",
          // colorPrimaryTextActive: "#4d81d4",
          colorPrimaryBgHover: '#8c9ca7',
          colorBgSpotlight: '#404040',
          //  colorBgBase: "#f9f9f9",
          colorPrimaryActive: '#1b6ced',
          colorPrimaryText: '#69a7ff',
          colorPrimaryTextActive: '#4d81d4',
          colorPrimaryBorder: 'rgb(99, 144, 210)',
          colorPrimaryBorderHover: 'rgb(116, 149, 194)',
          colorInfo: '#217bf8',
          sizeStep: 3,
          sizeUnit: 3,
        },
        components: {
          Slider: {
            handleActiveColor: 'rgb(189, 199, 212)',
            colorPrimaryBorderHover: 'rgb(116, 149, 194)',
            colorPrimary: 'rgb(99, 144, 210)',
            colorPrimaryBorder: 'rgb(94, 149, 226)',
            controlSize: 1,
            controlHeightLG: 15,
            controlHeight: 15,
            railSize: 2,
            controlHeightSM: 15,
          },
          Tabs: {
            cardPadding: '5px 10px',
            margin: 0,
          },
          Empty: {
            controlHeightLG: 15,
            marginXL: 16,
            margin: 8,
          },
          Button: {
            controlHeight: 28,
          },
          Typography: {
            colorLink: 'rgb(147, 192, 255)',
            colorLinkHover: 'rgb(54, 136, 245)',
          },
          Pagination: {
            itemSize: 28,
          },
          Notification: {
            width: 600,
          },
          Tag: {
            colorPrimaryActive: 'rgb(75, 101, 142)',
          },
          Segmented: {
            controlHeight: 28,
          },
        },
      }}
    >
      <App>
        <Layout>
          <Header style={{ height: 40 }}></Header>
          <Content style={{ height: 'calc(100vh - 88px)', padding: 8 }}>
            {contextHolder}
            <Row gutter={[2, 2]}>
              <Col span={24}>
                <Space>
                  <Button onClick={() => setIsCreate(true)}>Створити</Button>
                </Space>
              </Col>
              <Col span={24}>
                <Table
                  data={usersReq.data}
                  onDelete={onDeleteReq.mutate}
                  onEdit={setIsEdit}
                  loading={usersReq.isFetching || onDeleteReq.isPending}
                />
              </Col>
            </Row>
            {isCreate && <Create onClose={() => setIsCreate(false)} />}
            {isEdit && <Update info={isEdit} onClose={() => setIsEdit(null)} />}
          </Content>
          <Footer style={{ height: 40 }}>Footer</Footer>
        </Layout>
      </App>
    </ConfigProvider>
  );
};

export default AppComponent;

import React from 'react';
import { Popconfirm, Space, Table, Tag } from 'antd';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const App = ({ data, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Логін',
      dataIndex: 'login',
      sorter: (a, b) => a.login.length - b.login.length,
      key: 'login',
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ім'я",
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      key: 'name',
    },
    {
      title: 'Призвіще',
      dataIndex: 'surname',
      sorter: (a, b) => a.surname.length - b.surname.length,
      key: 'surname',
    },
    {
      title: 'Вік',
      dataIndex: 'age',
      sorter: (a, b) => null,
      key: 'age',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          ></Button>
          <Popconfirm
            title="Ви впевнені що хочете видалити користувача?"
            okText="Так"
            cancelText="Ні"
            onConfirm={() => onDelete(record.login)}
          >
            <Button size="small" icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} size="small" />;
};
export default App;

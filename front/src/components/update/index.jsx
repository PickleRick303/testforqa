import React, { useState } from 'react';
import {
  Button,
  Modal,
  Row,
  Col,
  Input,
  Spin,
  Form,
  InputNumber,
  Typography,
} from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UPDATE_USER } from './../../api/users';
import { useFormik } from 'formik';

const App = ({ onClose, info }) => {
  const cache = useQueryClient();
  const onAddReq = useMutation({
    mutationFn: async (values) => {
      return await UPDATE_USER(values);
    },
    onError: (error) => {},
    onSuccess: (id) => {
      cache.invalidateQueries({ queryKey: ['users'], exact: true });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      login: info.login,
      name: info.name,
      surname: info.surname,
      age: null,
    },
    validate: (values) => {
      let errors = {};
      const reqFields = ['login', 'age'];
      for (let key in values) {
        if (
          (reqFields.includes(key) &&
            typeof values[key] == 'string' &&
            !values[key].trim()) ||
          (reqFields.includes(key) && !values[key]) ||
          (reqFields.includes(key) &&
            Array.isArray(values[key]) &&
            values[key].length == 0)
        ) {
          errors[key] = "Обов'язково";
        }
        // if (['password', 'passwordRetry'].includes(key)) {
        //   if (values[key] && values[key].length < 3) {
        //     errors[key] = 'Пароль занадто короткий';
        //   }
        //   const errorMessage = 'Паролі не збігаються';
        //   if (values.password !== values.passwordRetry) {
        //     errors['password'] = errorMessage;
        //     errors['passwordRetry'] = errorMessage;
        //   }
        // }

        //   if (key == "expirationDate") {
        //     var date = moment(values[key], "YYYY-MM-DD HH:mm", true);
        //     if (!date.isValid()) {
        //       errors[key] = "Неприпустимий формат часу";
        //     }
        //   }
        //   if (key == "expirationDate" && moment(values[key]).add(10, "m").valueOf() < moment(new Date(), "YYYY-MM-DD HH:mm").valueOf()) {
        //     errors[key] = "Помилка";
        //   }
      }

      return errors;
      //   if (parseFloat(values.expirationDate) < 0) {
      //     errors.expirationDate = "Повинно бути більше 0";
      //   }
      //   if (!validator.isNumeric(values.expirationDate)) {
      //     errors.expirationDate = "Повинно бути числом";
      //   }
    },
    onSubmit: (values) => {
      onAddReq.mutate({
        ...values,
      });
      // const usersTemplates = window.localStorage.getItem("usersTemplates");
      // const usersTemplatesParse = usersTemplates ? JSON.parse(usersTemplates) : [];
      // values.id = uuidv4();
      // const newUsersTemplates = [...usersTemplatesParse, values];
      // window.localStorage.setItem("usersTemplates", JSON.stringify(newUsersTemplates));
      // message.success("Шаблон успішно створено");
      // onClose();
    },
  });
  const { errors, values, meta, isValid, touched, setValues, setFieldValue } =
    formik;
  console.log('errors', errors);
  return (
    <Modal
      footer={null}
      title={'Редагування користувача ' + info.login}
      open
      onCancel={onClose}
    >
      <Form onFinish={formik.handleSubmit}>
        <Spin spinning={onAddReq.isPending}>
          <Row gutter={[4, 4]}>
            <Col span={24}>
              <label>
                <Typography.Text>
                  {' '}
                  Логін<span style={{ paddingLeft: 5, color: 'red' }}>*</span>
                </Typography.Text>
                <br />
                <Input
                  value={values.login}
                  maxLength={32}
                  onChange={(event) => {
                    setFieldValue('login', event.target.value.trim());
                  }}
                ></Input>
              </label>
              <br />
              {errors.login && (
                <Typography.Text type="danger">{errors.login}</Typography.Text>
              )}
            </Col>
            <Col span={24}>
              <label>
                <Typography.Text>
                  {' '}
                  Ім'я<span style={{ paddingLeft: 5, color: 'red' }}>*</span>
                </Typography.Text>
                <br />
                <Input
                  value={values.name}
                  maxLength={32}
                  onChange={(event) => {
                    setFieldValue('name', event.target.value.trim());
                  }}
                ></Input>
              </label>
              <br />
              {errors.login && (
                <Typography.Text type="danger">{errors.name}</Typography.Text>
              )}
            </Col>
            <Col span={24}>
              <label>
                <Typography.Text>
                  {' '}
                  Призвіще
                  <span style={{ paddingLeft: 5, color: 'red' }}>*</span>
                </Typography.Text>
                <br />
                <Input
                  value={values.surname}
                  maxLength={32}
                  onChange={(event) => {
                    setFieldValue('surname', event.target.value.trim());
                  }}
                ></Input>
              </label>
              <br />
              {errors.login && (
                <Typography.Text type="surname">{errors.name}</Typography.Text>
              )}
            </Col>

            <Col span={24}>
              <label>
                <Typography.Text>
                  {' '}
                  Вік
                  <span style={{ paddingLeft: 5, color: 'red' }}>*</span>
                </Typography.Text>
                <br />
                <InputNumber
                  value={values.age}
                  onChange={(val) => {
                    setFieldValue('age', val);
                  }}
                ></InputNumber>
              </label>

              <br />
              {errors.age && (
                <Typography.Text type="danger">{errors.age}</Typography.Text>
              )}
            </Col>
            <Col span={24}>
              <Button
                block
                type="primary"
                htmlType="submit"
                disabled={!isValid}
              >
                Редагувати
              </Button>
            </Col>
          </Row>
        </Spin>
      </Form>
    </Modal>
  );
};

export default App;

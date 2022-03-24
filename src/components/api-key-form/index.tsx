import { Form, Input, Button, Checkbox } from 'antd';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../../_hooks/useStorage';

const ApiKeyForm = () => {
  const [apiKey, setApiKey] = useLocalStorage('apiKey', null);
  const router = useRouter();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    setApiKey(values.apiKey);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name='api-key-form'
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 9,
        }}
        initialValues={{
          apiKey,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Api Key'
          name='apiKey'
          rules={[
            {
              required: true,
              message: 'Please input your api key!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 12,
          }}
        >
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={() => router.push('/speed')}>Next</Button>
    </>
  );
};

export default ApiKeyForm;

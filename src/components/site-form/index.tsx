import { Form, Input, Button } from 'antd';

interface Props {
  siteUrl: string;
  setSiteUrl: (siteUrl: string) => void;
}

const SiteForm = ({ siteUrl, setSiteUrl }: Props) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    setSiteUrl(values.siteUrl);
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
          siteUrl,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Site Url'
          name='siteUrl'
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SiteForm;

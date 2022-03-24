import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import readXlsxFile from 'read-excel-file';

const { Dragger } = Upload;

const Uploader = (props: any) => {
  return (
    <Dragger {...props}>
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <p className='ant-upload-text'>
        Click or drag file to this area to upload
      </p>
      <p className='ant-upload-hint'>
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
  );
};

export default Uploader;

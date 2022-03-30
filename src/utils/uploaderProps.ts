import { message } from 'antd';
import readXlsxFile from 'read-excel-file';

export const uploaderProps = () => ({
  name: 'file',
  multiple: false,
  onChange(info: any) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: any) {
    console.log('Dropped files', e.dataTransfer.files);
    readXlsxFile(e.dataTransfer.files[0]).then((rows) => {
      return rows.flat();
    });
  },
});

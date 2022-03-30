import React, { useEffect, useState } from 'react';
import { Button, Col, message, Row, Tabs, Input, Select } from 'antd';
import readXlsxFile from 'read-excel-file';
import ResultTable from '../../src/components/result-table';
import SiteForm from '../../src/components/site-form';
import Uploader from '../../src/components/uploader';
import Layout from '../../src/components/_layout';
import formatResultData from '../../src/utils/functions/formatResultData';
import { CSVLink } from 'react-csv';

import { getData } from '../../src/utils/functions/getData';

const { TabPane } = Tabs;
const { Option } = Select;

const PageSpeedPage = () => {
  const [siteUrl, setSiteUrl] = useState('');
  const [mobileData, setMobileData] = useState<any>([]);
  const [desktopData, setDesktopData] = useState<any>([]);
  const [urlList, setUrlList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [selectQuery, setSelectQuery] = useState<string>();

  const [desktopFilterData, setDesktopFilterData] = useState<any>(desktopData);
  const [mobileFilterData, setMobileFilterData] = useState<any>(mobileData);

  const getDataFromList = async () => {
    if (!urlList.length) return;
    for (const url of urlList) {
      getData(url, setDesktopData, setMobileData);
    }
  };

  const uploaderProps = {
    name: 'file',
    multiple: false,
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        readXlsxFile(info.file.originFileObj).then((rows: any) => {
          const urlList = rows.map((row: any) => row[0]);
          setUrlList(urlList);
          getDataFromList();
        });
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
      readXlsxFile(e.dataTransfer.files[0]).then((rows) => {
        setUrlList(rows.flat());
        getDataFromList();
      });
    },
  };

  const callback = (key: any) => {
    // console.log(key);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    console.log('QUERY', query);
  };

  const handleChange = (value: string) => {
    setSelectQuery(value);
  };

  const checkDataToShow = (key: string) => {
    if (key === 'mobile') {
      if (!query && !selectQuery) {
        return mobileData;
      } else {
        return mobileFilterData;
      }
    }

    if (key === 'desktop') {
      if (!query && !selectQuery) {
        return desktopData;
      } else {
        return desktopFilterData;
      }
    }
  };

  useEffect(() => {
    setDesktopFilterData(
      desktopData
        .filter((data: any) =>
          data?.id.toLowerCase().includes(query.toLowerCase())
        )
        .filter((data: any) =>
          selectQuery === 'lower'
            ? data?.lighthouseResult.categories.performance.score * 100 < 90
            : selectQuery === 'greater'
            ? data?.lighthouseResult.categories.performance.score * 100 >= 90
            : data
        )
    );
    setMobileFilterData(
      mobileData
        .filter((data: any) =>
          data?.id.toLowerCase().includes(query.toLowerCase())
        )
        .filter((data: any) =>
          selectQuery === 'lower'
            ? data?.lighthouseResult.categories.performance.score * 100 < 90
            : selectQuery === 'greater'
            ? data?.lighthouseResult.categories.performance.score * 100 >= 90
            : data
        )
    );
  }, [query, selectQuery]);

  const tabs = [
    { tab: 'Desktop', key: 'desktop' },
    { tab: 'Mobile', key: 'mobile' },
  ];

  const handleFormInputUrl = (url: string) => {
    getData(url, setDesktopData, setMobileData);
  };

  return (
    <Layout>
      <Row>
        <Col span={8} offset={4}>
          <Uploader {...uploaderProps} />
        </Col>
      </Row>
      <br />
      <br />
      <SiteForm siteUrl={siteUrl} setSiteUrl={handleFormInputUrl} />
      <br />
      <Tabs defaultActiveKey='desktop' onChange={callback}>
        {tabs.map(({ tab, key }) => (
          <>
            <TabPane tab={tab} key={key}>
              <Row>
                <Col span={4}>
                  <Button type='primary'>
                    <CSVLink
                      filename={'Pagespeed_Info.csv'}
                      data={key === 'mobile' ? mobileData : desktopData}
                      className='btn btn-primary'
                      onClick={() => {
                        message.success('The file is downloading');
                      }}
                    >
                      Export to CSV
                    </CSVLink>
                  </Button>
                </Col>
                <Col span={4}>
                  <Input.Search
                    placeholder='Filter'
                    enterButton={true}
                    onSearch={handleSearch}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Col>
                <Col span={4}>
                  <Select
                    defaultValue='greater'
                    style={{ width: 240 }}
                    onChange={handleChange}
                  >
                    <Option value='lower'>{'<'} 90</Option>
                    <Option value='greater'>{'>'} 90</Option>
                  </Select>
                </Col>
              </Row>
              <br />
              <br />
              <ResultTable
                data={formatResultData(checkDataToShow(key))}
                isLoading={isLoading}
              />
            </TabPane>
          </>
        ))}
      </Tabs>
    </Layout>
  );
};

export default PageSpeedPage;

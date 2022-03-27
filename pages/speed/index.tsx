import { Button, Col, message, Row, Tabs, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import { getWindow } from "ssr-window";
import ResultTable from "../../src/components/result-table";
import SiteForm from "../../src/components/site-form";
import Uploader from "../../src/components/uploader";
import Layout from "../../src/components/_layout";
import formatResultData from "../../src/utils/functions/format-result-data";
import { CSVLink } from "react-csv";

const window = getWindow();

const { TabPane } = Tabs;

const PageSpeedPage = () => {
  const [siteUrl, setSiteUrl] = useState("");
  const [mobileData, setMobileData] = useState<any>([]);
  const [desktopData, setDesktopData] = useState<any>([]);
  const [urlList, setUrlList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  // const [searchResults, setSearchResults] = React.useState([]);

  function pageSpeedApiEndpointUrl(strategy: string, url: string) {
    const apiBaseUrl =
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
    const apiKey = window.localStorage?.getItem("apiKey");
    const websiteHomepageUrl = url;
    const apiEndpointUrl =
      apiBaseUrl +
      "?url=" +
      websiteHomepageUrl +
      "&key=" +
      apiKey +
      "&strategy=" +
      strategy;
    return apiEndpointUrl;
  }

  useEffect(() => {
    urlList.map((url: any) => {
      axios
        .get(pageSpeedApiEndpointUrl("desktop", url))
        .then((response: any) => {
          setDesktopData((desktopData: any) => [...desktopData, response.data]);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
      axios
        .get(pageSpeedApiEndpointUrl("mobile", url))
        .then((response: any) => {
          setMobileData((mobileData: any) => [...mobileData, response.data]);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    });
  }, [urlList]);

  const getDesktopData = async (siteUrl: string) => {
    const { data } = await axios.get(
      pageSpeedApiEndpointUrl("desktop", siteUrl)
    );
    return data;
  };

  const getMobileData = async (siteUrl: string) => {
    const { data } = await axios.get(
      pageSpeedApiEndpointUrl("mobile", siteUrl)
    );
    return data;
  };

  useEffect(() => {
    if (siteUrl) {
      setIsLoading(true);
      getDesktopData(siteUrl).then((data) => {
        setDesktopData([...desktopData, data]);
        setIsLoading(false);
      });
      getMobileData(siteUrl).then((data) => {
        setMobileData([...mobileData, data]);
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteUrl]);

  const uploaderProps = {
    name: "file",
    multiple: false,
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
      readXlsxFile(e.dataTransfer.files[0]).then((rows) => {
        setUrlList(rows.flat());
      });
    },
  };

  const callback = (key: any) => {
    console.log(key);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    const desktopSearch = !query
      ? desktopData
      : desktopData.filter((data: any) =>
          data?.id.toLowerCase().includes(query.toLowerCase())
        );
    const mobileSearch = !query
      ? mobileData
      : mobileData.filter((data: any) =>
          data?.id.toLowerCase().includes(query.toLowerCase())
        );
    setDesktopData(desktopSearch);
    setMobileData(mobileSearch);
  }, [query]);

  return (
    <Layout>
      <Row>
        <Col span={8} offset={4}>
          <Uploader {...uploaderProps} />
        </Col>
      </Row>
      <br />
      <br />
      <SiteForm siteUrl={siteUrl} setSiteUrl={setSiteUrl} />
      <br />
      <Tabs defaultActiveKey="desktop" onChange={callback}>
        <TabPane tab="Desktop" key="desktop">
          <Button type="primary">
            <CSVLink
              filename={"Pagespeed_Info_Desktop.csv"}
              data={desktopData}
              className="btn btn-primary"
              onClick={() => {
                message.success("The file is downloading");
              }}
            >
              Export to CSV
            </CSVLink>
          </Button>
          <br />
          <br />
          <Input.Search
            placeholder="Filter"
            enterButton={true}
            onSearch={handleSearch}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <br />
          <br />
          <ResultTable
            data={formatResultData(desktopData)}
            isLoading={isLoading}
          />
        </TabPane>
        <TabPane tab="Mobile" key="mobile">
          <Button type="primary">
            <CSVLink
              filename={"Pagespeed_Info_Mobile.csv"}
              data={mobileData}
              className="btn btn-primary"
              onClick={() => {
                message.success("The file is downloading");
              }}
            >
              Export to CSV
            </CSVLink>
          </Button>
          <br />
          <br />
          <Input.Search
            placeholder="Filter"
            enterButton={true}
            onSearch={handleSearch}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <br />
          <br />
          <ResultTable
            data={formatResultData(mobileData)}
            isLoading={isLoading}
          />
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default PageSpeedPage;

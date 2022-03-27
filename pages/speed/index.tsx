import { Button, Col, message, Row } from "antd";
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

const PageSpeedPage = () => {
  const [siteUrl, setSiteUrl] = useState("");
  const [resultData, setResultData] = useState<any>([]);
  const [urlList, setUrlList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

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
          setResultData((resultData: any) => [...resultData, response.data]);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    });
  }, [urlList]);

  const getData = async (siteUrl: string) => {
    const { data } = await axios.get(
      pageSpeedApiEndpointUrl("desktop", siteUrl)
    );
    return data;
  };

  useEffect(() => {
    if (siteUrl) {
      setIsLoading(true);
      getData(siteUrl).then((data) => {
        setResultData([...resultData, data]);
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
      <Button type="primary">
        <CSVLink
          filename={"Pagespeed_Info.csv"}
          data={resultData}
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
      <ResultTable data={formatResultData(resultData)} isLoading={isLoading} />
    </Layout>
  );
};

export default PageSpeedPage;

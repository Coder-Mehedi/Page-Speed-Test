import { Table } from "antd";
import React from "react";

const columns = [
  {
    title: "Url",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "First Contentful Paint",
    dataIndex: "firstContentfulPaint",
    key: "firstContentfulPaint",
  },
  {
    title: "First Meaningful Paint",
    dataIndex: "firstMeaningfulPaint",
    key: "firstMeaningfulPaint",
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
  },
  {
    title: "Speed Index",
    dataIndex: "speedIndex",
    key: "speedIndex",
  },
  {
    title: "Time To Interactive",
    dataIndex: "timeToInteractive",
    key: "timeToInteractive",
  },
];

const ResultTable = ({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) => {
  return <Table dataSource={data} columns={columns} loading={isLoading} />;
};

export default ResultTable;

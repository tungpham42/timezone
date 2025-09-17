import React, { useState } from "react";
import { DateTime } from "luxon";
import dayjs, { Dayjs } from "dayjs";
import {
  Select,
  DatePicker,
  Card,
  Typography,
  Divider,
  Space,
  Button,
} from "antd";
import {
  ClockCircleOutlined,
  GlobalOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { TIMEZONES } from "../data/timezones";

const { Option } = Select;
const { Title, Text } = Typography;

const TimezoneConverter: React.FC = () => {
  const timezones = TIMEZONES;
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("Asia/Ho_Chi_Minh");
  const [date, setDate] = useState<DateTime | null>(
    DateTime.now().setZone("UTC")
  );

  // Convert Luxon DateTime -> Dayjs (for DatePicker) while preserving wall time
  const luxonToDayjs = (dt: DateTime | null): Dayjs | null => {
    return dt
      ? dayjs(
          `${dt.year}-${String(dt.month).padStart(2, "0")}-${String(
            dt.day
          ).padStart(2, "0")} ${String(dt.hour).padStart(2, "0")}:${String(
            dt.minute
          ).padStart(2, "0")}:${String(dt.second).padStart(2, "0")}`,
          "YYYY-MM-DD HH:mm:ss"
        )
      : null;
  };

  // Handle changing the "From Timezone"
  const handleFromZoneChange = (newZone: string) => {
    setFromZone(newZone);
    if (date) {
      const newDate = DateTime.fromObject(
        {
          year: date.year,
          month: date.month,
          day: date.day,
          hour: date.hour,
          minute: date.minute,
          second: date.second,
        },
        { zone: newZone }
      );
      setDate(newDate);
    }
  };

  // Compute converted time
  const converted = date ? date.setZone(toZone) : null;

  // Swap From/To zones
  const handleSwap = () => {
    const prevFrom = fromZone;
    const prevTo = toZone;

    setFromZone(prevTo);
    setToZone(prevFrom);

    if (date) {
      setDate(
        DateTime.fromObject(
          {
            year: date.year,
            month: date.month,
            day: date.day,
            hour: date.hour,
            minute: date.minute,
            second: date.second,
          },
          { zone: prevTo }
        )
      );
    }
  };

  return (
    <Card
      className="max-w-2xl mx-auto shadow-lg rounded-xl"
      style={{ background: "#fdfdfd", borderRadius: 16 }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
        <GlobalOutlined /> Timezone Converter
      </Title>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Date & Time Picker */}
        <div>
          <Text strong>Date & Time ({fromZone}):</Text>
          <Space style={{ width: "100%", marginTop: 6 }}>
            <DatePicker
              showTime
              style={{ flex: 1 }}
              value={luxonToDayjs(date)}
              onChange={(value) =>
                setDate(
                  value
                    ? DateTime.fromObject(
                        {
                          year: value.year(),
                          month: value.month() + 1, // dayjs months are 0-based
                          day: value.date(),
                          hour: value.hour(),
                          minute: value.minute(),
                          second: value.second(),
                        },
                        { zone: fromZone }
                      )
                    : null
                )
              }
            />
            <Button
              type="primary"
              onClick={() => setDate(DateTime.now().setZone(fromZone))}
            >
              Now
            </Button>
          </Space>

          {/* Instant preview in To Timezone */}
          {date && (
            <div style={{ marginTop: 8, paddingLeft: 4 }}>
              <Text type="secondary">
                Same instant in <b>{toZone}</b>:{" "}
                {date.setZone(toZone).toFormat("yyyy-MM-dd HH:mm:ss")}
              </Text>
            </div>
          )}
        </div>

        {/* From Timezone */}
        <div>
          <Text strong>From Timezone:</Text>
          <Select
            value={fromZone}
            onChange={handleFromZoneChange}
            style={{ width: "100%", marginTop: 6 }}
            showSearch
            suffixIcon={<ClockCircleOutlined />}
          >
            {timezones.map((tz) => (
              <Option key={tz} value={tz}>
                {tz}
              </Option>
            ))}
          </Select>
        </div>

        {/* Swap & Reset Buttons */}
        <div style={{ textAlign: "center" }}>
          <Space>
            <Button icon={<SwapOutlined />} onClick={handleSwap} type="default">
              Swap
            </Button>
            <Button
              danger
              onClick={() => {
                setFromZone("UTC");
                setToZone("Asia/Ho_Chi_Minh");
                setDate(DateTime.now().setZone("UTC"));
              }}
            >
              Reset
            </Button>
          </Space>
        </div>

        {/* To Timezone */}
        <div>
          <Text strong>To Timezone:</Text>
          <Select
            value={toZone}
            onChange={setToZone}
            style={{ width: "100%", marginTop: 6 }}
            showSearch
            suffixIcon={<ClockCircleOutlined />}
          >
            {timezones.map((tz) => (
              <Option key={tz} value={tz}>
                {tz}
              </Option>
            ))}
          </Select>
        </div>
      </Space>

      {/* Converted Result */}
      {converted && (
        <>
          <Divider />
          <Card
            type="inner"
            style={{
              textAlign: "center",
              background: "#f0f5ff",
              borderRadius: 12,
              marginTop: 12,
            }}
          >
            <Title level={4}>Converted Time</Title>

            {/* From Time */}
            <Text style={{ fontSize: 16, fontWeight: 500, color: "#555" }}>
              {date?.toFormat("yyyy-MM-dd HH:mm:ss")}
            </Text>
            <br />
            <Text type="secondary">{fromZone}</Text>

            <Divider style={{ margin: "12px 0" }}>
              <SwapOutlined style={{ color: "#1890ff" }} />
            </Divider>

            {/* To Time */}
            <Text style={{ fontSize: 18, fontWeight: 600, color: "#333" }}>
              {converted.toFormat("yyyy-MM-dd HH:mm:ss")}
            </Text>
            <br />
            <Text type="secondary">{toZone}</Text>
          </Card>
        </>
      )}
    </Card>
  );
};

export default TimezoneConverter;

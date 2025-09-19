// src/admin/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Layout,
  Table,
  Button,
  Input,
  Select,
  Space,
  Modal,
  Typography,
  Row,
  Col,
  notification,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  DeleteOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { db } from "./firebaseConfig"; // adjust path if needed
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export default function AdminDashboard({ onSignOut }) {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters / search state
  const [attendingFilter, setAttendingFilter] = useState("all");
  const [search, setSearch] = useState("");

  // subscribe to Firestore collection on mount
  useEffect(() => {
    const colRef = collection(db, "rsvps");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRsvps(docs);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to listen to rsvps:", err);
        notification.error({
          message: "Firebase error",
          description: err.message || String(err),
        });
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  // derived filtered data
  const filtered = useMemo(() => {
    return rsvps.filter((r) => {
      if (attendingFilter !== "all" && r.attending !== attendingFilter)
        return false;
      if (!search) return true;
      const q = search.toLowerCase();
      const fieldsToSearch = [
        r.fullName || "",
        r.additionalGuests || "",
        r.kidsNames || "",
        r.allergies || "",
        r.message || "",
      ];
      return fieldsToSearch.some((f) => f.toLowerCase().includes(q));
    });
  }, [rsvps, attendingFilter, search]);

  // export to excel
  const exportExcel = () => {
    if (!filtered || filtered.length === 0) {
      notification.info({
        message: "No rows",
        description: "No RSVPs to export for current filters.",
      });
      return;
    }
    const sheetData = filtered.map((row) => ({
      id: row.id,
      fullName: row.fullName || "",
      attending: row.attending || "",
      additionalGuests: row.additionalGuests || "",
      kidsNames: row.kidsNames || "",
      allergies: row.allergies || "",
      stayingHyatt: row.stayingHyatt ? "Yes" : "No",
      stayingElsewhere: row.stayingElsewhere ? "Yes" : "No",
      drivingNeedTicket: row.drivingNeedTicket ? "Yes" : "No",
      songRequest: row.songRequest || "",
      message: row.message || "",
      createdAt:
        row.createdAt && row.createdAt.toDate
          ? row.createdAt.toDate().toLocaleString()
          : "",
    }));

    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RSVPs");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, `rsvps-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "rsvps", id));
      notification.success({
        message: "Deleted",
        description: "RSVP removed.",
      });
    } catch (err) {
      console.error("delete error", err);
      notification.error({
        message: "Delete failed",
        description: err.message || String(err),
      });
    }
  };

// Replace your columns definition with this
const columns = [
  {
    title: "Name",
    dataIndex: "fullName",
    key: "fullName",
    sorter: (a, b) => (a.fullName || "").localeCompare(b.fullName || ""),
    render: (text) => <Text strong>{text}</Text>,
  },
  {
    title: "Attending",
    dataIndex: "attending",
    key: "attending",
    render: (val) =>
      val === "accept" ? "Accepts" : val === "decline" ? "Declines" : "-",
  },
  {
    title: "Additional Guests",
    dataIndex: "additionalGuests",
    key: "additionalGuests",
    render: (v) => v || "—",
  },
  {
    title: "Kids",
    dataIndex: "kidsNames",
    key: "kidsNames",
    render: (v) => v || "—",
  },
  {
    title: "Allergies / Dietary",
    dataIndex: "allergies",
    key: "allergies",
    render: (v) => v || "—",
  },
  {
    title: "Hotel Stay",
    key: "hotel",
    render: (_, r) =>
      r.stayingHyatt ? "Hyatt" : r.stayingElsewhere ? "Other" : "—",
  },
  {
    title: "Driving / Ticket",
    key: "driving",
    render: (_, r) => (r.drivingNeedTicket ? "Needs Ticket" : "—"),
  },
  {
    title: "Song Request",
    dataIndex: "songRequest",
    key: "songRequest",
    render: (v) => v || "—",
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
    render: (v) => v || "—",
  },
  {
    title: "Submitted",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (ts) =>
      ts && ts.toDate ? ts.toDate().toLocaleString() : "—",
  },
  {
    title: "Actions",
    key: "actions",
    fixed: "right", // keep actions visible while scrolling
    render: (_, record) => (
      <Space>
        <Popconfirm
          title="Delete this RSVP?"
          okText="Delete"
          cancelText="Cancel"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    ),
  },
];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
          padding: "12px 20px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        }}
      >

        <div className="pol">

        <Title level={4} style={{ margin: 0 }}>
          RSVP Admin
        </Title>
        </div>
        <Space>
          <Select
            value={attendingFilter}
            onChange={setAttendingFilter}
            style={{ minWidth: 160 }}
          >
            <Option value="all">All attendees</Option>
            <Option value="accept">Accepts</Option>
            <Option value="decline">Declines</Option>
          </Select>

          <Input
            prefix={<SearchOutlined />}
            placeholder="Search name / guest / message"
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 300 }}
          />

          <Button icon={<DownloadOutlined />} onClick={exportExcel}>
            Export XLSX
          </Button>

          <Button icon={<LogoutOutlined />} onClick={onSignOut}>
            Sign out
          </Button>
        </Space>
      </Header>

      <Content style={{ padding: 20 }}>
        <Row justify="space-between" style={{ marginBottom: 12 }}>
          <Col>
            <Text strong>{filtered.length}</Text>{" "}
            <Text type="secondary"> RSVPs shown</Text>
          </Col>
        </Row>

     <Table
  columns={columns}
  dataSource={filtered}
  rowKey="id"
  loading={loading}
  pagination={{ pageSize: 10, responsive: true }}
  scroll={{ x: "max-content" }} // enables horizontal scroll on mobile
  size="small" // more compact layout
/>

      </Content>
    </Layout>
  );
}

import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Button } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
    return (
        <div style={{margin:"6% 20px"}}>
        <Row gutter={16}>
            <Col span={12}>
            <Card bordered={false}>
                <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
                />
            </Card>
            </Col>
            <Col span={12}>
            <Card bordered={false}>
                <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
                />
            </Card>
            </Col>
        </Row>
        <Row style={{padding: "50px 20px"}} gutter={16}>
            <Col span={12}>
            <Statistic title="Active Users" value={112893} />
            </Col>
            <Col span={12}>
            <Statistic title="Account Balance (AMD)" value={112893} precision={2} />
            <Button style={{ marginTop: 16 }} type="primary">
                Recharge
            </Button>
            </Col>
            <Col span={12}>
            <Statistic title="Active Users" value={112893} loading />
            </Col>
        </Row>
        
        <Row style={{padding: "0px 20px"}} gutter={16}>
        <Col span={12}>
            <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
        </Col>
        <Col span={12}>
            <Statistic title="Unmerged" value={93} suffix="/ 100" />
        </Col>
        </Row>
        </div>
    )
};


export default Dashboard;
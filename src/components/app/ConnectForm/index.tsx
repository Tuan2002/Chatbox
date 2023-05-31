import React, {useState} from "react";
import {Button, Form, Input, message, Space} from "antd";
import styles from './connect-form.module.css';
import PeerService from "../../../services/peer.service.ts";
import {useAppSelector} from "../../../redux/store.ts";

export default function ConnectForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const {peers} = useAppSelector(state => state.app);
  const onFinish = (values: any) => {
    setLoading(true);
    if (peers.find(x => x.username === values.peerId)) {
      setLoading(false);
      return message.error('Bạn đã kết nối với người này');
    }
    PeerService.connect(values.peerId).then(() => {
      setLoading(false);
    }).catch(e => {
      message.error("Kết nối thất bại");
      setLoading(false);
    });
  }
  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
      >
        <div className={styles.connectRow}>
          <Form.Item
            className={styles.inputWrapper}
            name={'peerId'}
          >
            <Input
              disabled={loading}
              placeholder={'Thêm người dùng khác...'}
            />
          </Form.Item>
          <Form.Item>
            <Button block type={'primary'} htmlType={'submit'} loading={loading}>
              Kết nối
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

"use client";

import React from 'react';
import { Modal, Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { Student } from '@/types/Student';

interface ModalFormProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  onFinish: FormProps<Student>['onFinish'];
  student: Student | null;  // Có thể là null nếu đang thêm mới học sinh
}

const ModalForm: React.FC<ModalFormProps> = ({ isModalOpen, handleCancel, onFinish, student }) => {
  return (
    <Modal
      title={student ? "Edit Student" : "Add New Student"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="studentForm"
        layout="vertical"
        initialValues={student ? { name: student.name, age: student.age, address: student.address } : {}}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<Student>
          label="Username"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<Student>
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item<Student>
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
          {student ? "Cập nhật " : "Tạo mới"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;

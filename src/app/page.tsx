"use client";

import React, { useState } from 'react';
import { Button, FormProps, Table } from 'antd';
import { addDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/libs/firebase';
import ModalForm from '@/components/ModalFrom';
import { Student } from '@/types/Student';
import { useCollection } from 'react-firebase-hooks/firestore';
import { extractDataFromSnapshot } from '@/utils/data';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái để mở hoặc đóng Modal
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null); // Trạng thái lưu học sinh cần chỉnh sửa

  const [studentsSnapshot, loading, error] = useCollection(collection(db, 'students'));

  // Lấy dữ liệu từ QuerySnapshot và chuyển đổi thành kiểu Student
  const studentsData = extractDataFromSnapshot(studentsSnapshot);
  console.log(studentsData); // Log để kiểm tra dữ liệu

  const showModal = () => {
    setIsModalOpen(true); // Mở Modal khi nhấn nút "Open Modal"
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Đóng Modal khi hủy
  };

  const onFinish: FormProps<Student>['onFinish'] = async (values) => {
    const studentData = values as Student; // Type assertion để đảm bảo values là kiểu Student
    if (studentToEdit) {
      // Nếu đang chỉnh sửa học sinh, cập nhật thông tin vào Firestore
      const studentRef = doc(db, 'students', studentToEdit.id);
      await updateDoc(studentRef, studentData);
      console.log('Student updated:', studentData); // Log thông tin học sinh đã cập nhật
    } else {
      // Nếu thêm mới học sinh, tạo mới trong Firestore
      await addDoc(collection(db, 'students'), studentData);
      console.log('New student added:', studentData); // Log thông tin học sinh mới
    }
    setIsModalOpen(false); // Đóng Modal sau khi xử lý xong
    setStudentToEdit(null); // Reset studentToEdit về null
  };

  const handleEdit = (student: Student) => {
    console.log(student); // Log để kiểm tra thông tin học sinh khi nhấn "Edit"
    setStudentToEdit(student); // Lưu thông tin học sinh cần chỉnh sửa vào state
    setIsModalOpen(true); // Mở Modal để chỉnh sửa
  };

  const handleDelete = async (studentId: string) => {
    try {
      // Xóa document của học sinh theo studentId
      const studentRef = doc(db, 'students', studentId);
      await deleteDoc(studentRef);
      console.log('Student deleted'); // Log khi học sinh đã được xóa
    } catch (error) {
      console.error('Error deleting student:', error); // Log lỗi nếu có vấn đề trong quá trình xóa
    }
  };

  // Kiểm tra nếu đang tải dữ liệu hoặc có lỗi
  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo nếu đang tải
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Hiển thị thông báo lỗi nếu có
  }

  // Định nghĩa cột cho bảng
  const columns = [
    {
      title: 'Name', // Tiêu đề cột
      dataIndex: 'name', // Trường dữ liệu để hiển thị
      key: 'name',
    },
    {
      title: 'Age', // Tiêu đề cột
      dataIndex: 'age', // Trường dữ liệu để hiển thị
      key: 'age',
    },
    {
      title: 'Address', // Tiêu đề cột
      dataIndex: 'address', // Trường dữ liệu để hiển thị
      key: 'address',
    },{
      title: 'Action', // Tiêu đề cột cho các hành động
      key: 'action',
      render: (_text:string, student: Student) => (
        <div>
          {/* Nút chỉnh sửa và xóa học sinh */}
          <Button onClick={() => handleEdit(student)}>Edit</Button>
          <Button onClick={() => handleDelete(student.id)} danger>Delete</Button>
        </div>
      ),
    }
    
    
  ];

  return (
    <div>
      {/* Nút để mở Modal */}
      <Button type="primary" onClick={showModal}>
         Thêm Học sinh mới 
      </Button>

      {/* Gọi ModalForm và truyền các props vào */}
      <ModalForm
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onFinish={onFinish}
        student={studentToEdit} // Truyền học sinh cần chỉnh sửa vào ModalForm
      />

      {/* Hiển thị danh sách học sinh dưới dạng bảng */}
      <Table
        columns={columns} // Cấu hình các cột của bảng
        dataSource={studentsData} // Dữ liệu học sinh
        rowKey="id" // Chỉ định khóa duy nhất cho mỗi dòng
      />
    </div>
  );
}

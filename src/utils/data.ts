import { QuerySnapshot, DocumentData } from 'firebase/firestore';
import { Student } from '@/types/Student';
// Giả sử bạn đã có hàm `extractDataFromSnapshot`
export const extractDataFromSnapshot = (snapshot: QuerySnapshot<DocumentData> | undefined) => {
  if (!snapshot) {
    return [];
  }
  return snapshot.docs.map(doc => {
    const data = doc.data() as Student;  // Ép kiểu dữ liệu từ DocumentData thành Student
    return { ...data, id: doc.id };  // Thêm id nếu cần
  });
};

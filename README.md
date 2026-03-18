# Trắc Nghiệm - Tạo Đề Thi Tự Động

Ứng dụng Node.js tự động tạo nhiều đề thi trắc nghiệm từ một bộ câu hỏi, xuất ra file Word (.docx).

## Tính năng

- 📝 Tạo nhiều đề thi từ một bộ câu hỏi gốc
- 🔀 Tự động xáo trộn câu hỏi và đáp án
- 📄 Xuất file Word (.docx) chuẩn định dạng
- ⚡ Nhanh chóng và dễ sử dụng

## Yêu cầu

- Node.js v20.14.0 hoặc cao hơn

## Cài đặt

```bash
npm install
```

## Cách sử dụng

### 1. Cấu hình đề thi

Chỉnh sửa file `exam.js` để thêm câu hỏi:

```javascript
export const exam = {
    subject: "TIN HỌC",
    subjectCode: "MH3201202",
    examCode: "MH3201202_DE01",
    duration: 60,
    questions: [
      {
        id: 1,
        level: "NB",
        content: "Nội dung câu hỏi...",
        answers: [
          { content: "Đáp án A", isCorrect: false },
          { content: "Đáp án B", isCorrect: false },
          { content: "Đáp án C", isCorrect: true },
          { content: "Đáp án D", isCorrect: false }
        ]
      }
      // Thêm câu hỏi khác...
    ]
};
```

### 2. Chạy chương trình

```bash
node index.js
```

### 3. Kết quả

Các file đề thi sẽ được tạo với tên: `DeThi_[MaĐề].docx`

## Cấu trúc thư mục

```
tracnghiem/
├── index.js           # File chính
├── exam.js            # Dữ liệu đề thi
├── services.js        # Logic xử lý
├── .template_exam     # Template đề thi
├── package.json       # Dependencies
└── README.md          # Hướng dẫn
```

## Dependencies

- `docx` - Tạo file Word
- `fast-xml-parser` - Parse XML
- `jszip` - Xử lý file nén
- `mammoth` - Đọc file Word

## Tùy chỉnh

Để thay đổi số lượng đề thi được tạo, chỉnh sửa trong `index.js`:

```javascript
const exams = generateMultipleExams(exam, 5); // Thay đổi số 5 thành số đề bạn muốn
```

## License

ISC
# exam-question-for-hotec

import fs from 'fs';
import path from 'path';
import { Packer } from 'docx';
import { createExamDoc, generateMultipleExams } from './services/generate-question.js';
import generateAnswerSheet from './services/generate-answer.js';
import { exam } from './exam.js';

async function run() {
    // Tạo thư mục outputs nếu chưa có
    const outputDir = 'outputs';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const exams = generateMultipleExams(exam, 5); // tạo 5 đề
    for (const ex of exams) {
        const doc = createExamDoc(ex);

        const buffer = await Packer.toBuffer(doc);

        // Lưu file vào thư mục outputs
        const filePath = path.join(outputDir, `DeThi_${ex.examCode}.docx`);
        fs.writeFileSync(filePath, buffer);

        // Tạo phiếu trả lời tương ứng với câu hỏi đã shuffle của từng đề
        generateAnswerSheet(ex.questions, `outputs/answer-sheet_${ex.examCode}.pdf`);
    }
    console.log(`✅ Đã tạo ${exams.length} đề thi trong thư mục ${outputDir}/`);
    console.log(`✅ Đã tạo ${exams.length} phiếu trả lời trong thư mục ${outputDir}/`);
}

run();

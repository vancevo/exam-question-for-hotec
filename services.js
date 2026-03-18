import { Document, Paragraph, TextRun, AlignmentType } from 'docx';

export function shuffleArray(arr) {
    const newArr = [...arr];

    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    return newArr;
}

export function shuffleQuestions(questions) {
    // Xáo trộn thứ tự câu hỏi
    const shuffledQuestions = shuffleArray(questions);
    
    // Cập nhật lại id cho câu hỏi theo thứ tự mới
    return shuffledQuestions.map((q, index) => ({
        ...q,
        id: index + 1
    }));
}

export function generateExamCode(index) {
    return `DE${String(index).padStart(2, '0')}`;
}

export function generateMultipleExams(baseExam, numberOfExams) {
    const exams = [];

    for (let i = 1; i <= numberOfExams; i++) {
        const newExam = {
            ...baseExam,
            examCode: generateExamCode(i),
            questions: shuffleQuestions(baseExam.questions)
        };

        exams.push(newExam);
    }

    return exams;
}

export function createExamDoc(exam) {
    const children = [];

    // ===== HEADER =====
    children.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun({
                    text: 'TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT TP.HCM',
                    bold: true
                })
            ]
        })
    );

    children.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun({
                    text: `Tên môn học: ${exam.subject}   Mã môn: ${exam.subjectCode}`,
                    bold: true
                })
            ]
        })
    );

    children.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun({
                    text: `Mã đề: ${exam.examCode} - Thời gian: ${exam.duration} phút`,
                    bold: true
                })
            ]
        })
    );

    children.push(new Paragraph(' '));

    // ===== QUESTIONS =====
    exam.questions.forEach((q) => {
        // Câu hỏi
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Câu ${q.id} [<${q.level}>]: ${q.content}`,
                        bold: true
                    })
                ]
            })
        );

        // Đáp án
        q.answers.forEach((ans) => {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun('[<$>] '),
                        new TextRun({
                            text: ans.content,
                            color: ans.isCorrect ? 'FF0000' : '000000' // 🔥 màu đỏ
                        })
                    ]
                })
            );
        });

        children.push(new Paragraph(' '));
    });

    // ===== FOOTER =====
    children.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun('---------- HẾT ---------')]
        })
    );

    return new Document({
        sections: [
            {
                children
            }
        ]
    });
}

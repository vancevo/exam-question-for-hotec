import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

function getCorrectIndex(q) {
  return q.answers.findIndex(a => a.isCorrect);
}

function drawBubble(doc, x, y, label, filled = false) {
  const r = 6;

  doc.circle(x, y, r).stroke();

  if (filled) {
    doc.circle(x, y, r - 2).fill("black").fillColor("black");
  }

  doc
    .fontSize(8)
    .fillColor("black")
    .text(label, x - 3, y - 3, { width: 6, align: "center" });
}

function generateAnswerSheet(questions, outputPath = "outputs/answer-sheet.pdf") {
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const doc = new PDFDocument({
    size: "A4",
    margin: 30
  });

  doc.pipe(fs.createWriteStream(outputPath));

  // Set font hỗ trợ tiếng Việt
  doc.font("Helvetica");

  // Title
  doc
    .fontSize(16)
    .text("PHIEU TRA LOI TRAC NGHIEM", {
      align: "center"
    });

  let startY = 120;

  const columns = 5;
  const perCol = 20;

  const colWidth = 100;
  const rowHeight = 25;

  const startX = 40;

  for (let col = 0; col < columns; col++) {
    let x = startX + col * colWidth;

    for (let i = 0; i < perCol; i++) {
      const index = col * perCol + i;
      const q = questions[index];

      const y = startY + i * rowHeight;

      // số câu
      doc
        .fontSize(10)
        .text(String(index + 1).padStart(2, "0"), x, y);

      const correct = q ? getCorrectIndex(q) : -1;

      const optionStartX = x + 25;

      ["A", "B", "C", "D"].forEach((opt, idx) => {
        drawBubble(
          doc,
          optionStartX + idx * 18,
          y + 7,
          opt,
          idx === correct
        );
      });
    }
  }

  doc.end();
}

export default generateAnswerSheet;
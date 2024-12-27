const fs = require('fs');
const path = './documentation.md';

// פונקציה להוספת שינוי
function addChange({ date, fileName, change, reason }) {
    const content = `
### שינוי חדש
- **תאריך**: ${date}
- **קובץ**: ${fileName}
- **שינוי**: ${change}
- **סיבה**: ${reason}
---
`;

    fs.appendFile(path, content, (err) => {
        if (err) {
            console.error('Error updating the documentation:', err);
        } else {
            console.log('Documentation updated successfully!');
        }
    });
}

// דוגמה לשימוש
addChange({
    date: new Date().toLocaleDateString(),
    fileName: 'routes.js',
    change: 'הוספת ניתוב חדש /api/payments',
    reason: 'הרחבת ממשק ה-API בהתאם לתיעוד'
});
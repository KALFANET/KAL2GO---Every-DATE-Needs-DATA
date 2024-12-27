// index.js
// הקובץ הראשי שמפעיל את השרת

// ייבוא האפליקציה הראשית מ-src/app
const app = require('./src/app');

// הגדרת הפורט שעליו השרת יאזין (מוגדר ב-.env או ברירת מחדל ל-3000)
const PORT = process.env.PORT || 3000;

// הפעלת השרת והדפסת הודעה למסוף
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
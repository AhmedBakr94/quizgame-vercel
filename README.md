# QuizGame - تعليمات التشغيل

## متطلبات التشغيل
- حساب Firebase مع تفعيل Realtime Database و Authentication
- حساب AdMob مع إنشاء وحدات إعلانية

## خطوات التنصيب
1. انسخ الملفات إلى استضافة الويب
2. تأكد من صحة بياناتك في `public/js/config.js`
3. اضبط قواعد الأمان في Firebase Console

## هيكل قاعدة البيانات
```json
{
  "users": {
    "$uid": {
      "phone": "01234567890",
      "points": 100,
      "lastWithdrawTarget": 3000
    }
  },
  "questions": {
    "$qid": {
      "text": "ما هي عاصمة فرنسا؟",
      "options": ["لندن", "باريس", "برلين"],
      "correctIndex": 1
    }
  },
  "withdrawRequests": {
    "$wid": {
      "userId": "xxx",
      "phone": "01234567890",
      "amount": 30,
      "status": "pending"
    }
  }
}
```

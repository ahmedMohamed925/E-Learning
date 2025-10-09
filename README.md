# 🎓 منصة البداية - Bidaya Platform

## 📝 وصف مختصر | Short Description

**العربية:**  
منصة تعليمية متخصصة في تدريس مادة الرياضيات للمرحلة الثانوية مع الأستاذ مجدي جمال. توفر المنصة تعليماً عالي الجودة بأسلوب مبتكر وممتع من خلال دروس فيديو، اختبارات تفاعلية، ومهام تعليمية.

**English:**  
An educational platform specialized in teaching mathematics for high school students with Teacher Magdy Gamal. The platform provides high-quality education in an innovative and engaging way through video lessons, interactive quizzes, and educational tasks.

---

## 📖 الوصف الكامل | Full Description

**العربية:**  
منصة البداية هي منصة تعليمية إلكترونية شاملة مصممة خصيصاً لطلاب المرحلة الثانوية الراغبين في تحسين مستواهم في مادة الرياضيات. تقدم المنصة محتوى تعليمي منظم ومتدرج حسب الصفوف الدراسية (الأول الثانوي، الثاني الثانوي علمي، الثالث الثانوي علمي).

تتميز المنصة بواجهة مستخدم عصرية وسهلة الاستخدام مع دعم كامل للغة العربية والوضع الليلي (Dark Mode). يمكن للطلاب الوصول إلى دروس فيديو عالية الجودة، حل اختبارات تفاعلية، تسليم المهام، ومتابعة تقدمهم الدراسي من خلال لوحة تحكم شخصية شاملة.

توفر المنصة أيضاً لوحة تحكم متقدمة للإدارة تسمح بإدارة المحتوى التعليمي، إنشاء الاختبارات والمهام، متابعة أداء الطلاب، وإدارة الجداول الدراسية بسهولة تامة.

**English:**  
Bidaya Platform is a comprehensive e-learning platform specifically designed for high school students who want to improve their mathematics skills. The platform offers organized and graduated educational content according to grade levels (First Secondary, Second Secondary Science, Third Secondary Science).

The platform features a modern and user-friendly interface with full Arabic language support and Dark Mode. Students can access high-quality video lessons, solve interactive quizzes, submit assignments, and track their academic progress through a comprehensive personal dashboard.

The platform also provides an advanced admin dashboard that allows content management, creating quizzes and tasks, monitoring student performance, and managing academic schedules with complete ease.

---

## ✨ المميزات الرئيسية | Key Features

### للطلاب | For Students
- ✅ **دروس فيديو تفاعلية** - Interactive video lessons with multiple quality options
- ✅ **اختبارات ذكية** - Smart quizzes with instant results and detailed analysis
- ✅ **مهام وواجبات** - Assignments and homework with submission tracking
- ✅ **لوحة تحكم شخصية** - Personal dashboard with progress tracking
- ✅ **تقويم دراسي** - Academic calendar with all events and deadlines
- ✅ **نتائج تفصيلية** - Detailed results with performance analytics
- ✅ **مواد تعليمية إضافية** - Additional educational materials by grade
- ✅ **وضع ليلي** - Dark mode support for comfortable viewing
- ✅ **حفظ التقدم** - Auto-save progress in quizzes and lessons

### للإدارة والمعلمين | For Admin & Teachers
- 🎯 **لوحة تحكم متقدمة** - Advanced admin dashboard
- 🎯 **إدارة المحتوى** - Complete content management system
- 🎯 **إنشاء الاختبارات** - Quiz builder with multiple question types
- 🎯 **إدارة المهام** - Task management with deadline tracking
- 🎯 **تحليلات الأداء** - Performance analytics and statistics
- 🎯 **إدارة الجداول** - Schedule management system
- 🎯 **إدارة المواد التعليمية** - Educational materials management
- 🎯 **نظام الصلاحيات** - Role-based access control (Admin, Teacher, Student)

### تقنية | Technical
- 🔒 **نظام مصادقة آمن** - Secure authentication with JWT tokens
- 🔒 **تحديث تلقائي للتوكن** - Automatic token refresh
- 🔒 **حماية المسارات** - Protected routes based on roles
- 📱 **تصميم متجاوب** - Fully responsive design for all devices
- 🌐 **دعم كامل للعربية** - Full RTL Arabic language support
- ⚡ **أداء عالي** - Fast loading with optimized code
- 💾 **حفظ محلي** - LocalStorage for offline progress saving
- لوحة إدارة كاملة مع CRUD
- وضع داكن/فاتح مع حفظ الإعدادات
- تصميم متجاوب mobile-first

## التقنيات المستخدمة

- React 18 (JSX)
- Redux Toolkit للتحكم في الحالة
- React Router للتوجيه
- CSS3 مع متغيرات للثيمات
- Fetch API للتواصل مع الخادم

## الهيكل التنظيمي

### الصفحات الرئيسية
- **الرئيسية**: Hero مع نص متحرك + تعريف المعلم + شبكة الكورسات
- **صفحات الصفوف**: علامات تبويب للدروس والجدول والواجبات والكويزات
- **صفحة الدرس**: مشغل YouTube + تفاصيل الدرس
- **لوحة الإدارة**: CRUD كامل لجميع المحتويات
- **الملف الشخصي**: إدارة بيانات المستخدم
- **الإعدادات**: تعديل الحساب وتبديل المظهر

### الصفوف المتاحة
1. الصف الأول الثانوي
2. الصف الثاني الثانوي علمي
3. الصف الثاني الثانوي ادبي
4. الصف الثالث الثانوي علمي
5. الصف الثالث الثانوي ادبي

## التثبيت والتشغيل

1. تثبيت المتطلبات:
```bash
npm install
```

2. تشغيل الخادم الخلفي على المنفذ 3000:
```bash
# يجب تشغيل الخادم الخلفي على http://localhost:3000
```

3. تشغيل التطبيق:
```bash
npm run dev
```

## API Endpoints

### المصادقة
- `POST /api/users/` - التسجيل
- `POST /api/users/login` - تسجيل الدخول  
- `POST /api/users/verify-otp` - تأكيد OTP
- `POST /api/users/resend-otp` - إعادة إرسال OTP
- `POST /api/users/change-password` - تغيير كلمة المرور

### الكورسات
- `GET /api/courses/` - جلب جميع الكورسات
- `POST /api/courses/` - إنشاء كورس (مدير)
- `GET /api/courses/:id` - جلب كورس محدد
- `PUT /api/courses/:id` - تحديث كورس (مدير)
- `DELETE /api/courses/:id` - حذف كورس (مدير)

### الدروس
- `GET /api/lessons/` - جلب جميع الدروس
- `GET /api/lessons/:id` - جلب درس محدد
- `GET /api/lessons/grade/:grade` - جلب دروس صف معين
- `POST /api/lessons/` - إنشاء درس (مدير)
- `PUT /api/lessons/:id` - تحديث درس (مدير)
- `DELETE /api/lessons/:id` - حذف درس (مدير)

### الجدول الدراسي
- `GET /api/schedule/` - جلب الجدول (محمي)
- `POST /api/schedule/` - إنشاء جدول (مدير)
- `PUT /api/schedule/:id` - تحديث جدول (مدير)
- `DELETE /api/schedule/:id` - حذف جدول (مدير)

### الواجبات
- `GET /api/tasks/` - جلب الواجبات (محمي)
- `GET /api/tasks/grade/:grade` - جلب واجبات صف معين (محمي)
- `POST /api/tasks/` - إنشاء واجب (مدير)
- `PUT /api/tasks/:id` - تحديث واجب (مدير)
- `DELETE /api/tasks/:id` - حذف واجب (مدير)

### الكويزات
- `GET /api/quizzes/` - جلب الكويزات (محمي)
- `GET /api/quizzes/grade/:grade` - جلب كويزات صف معين (محمي)
- `POST /api/quizzes/` - إنشاء كويز (مدير)
- `PUT /api/quizzes/:id` - تحديث كويز (مدير)
- `DELETE /api/quizzes/:id` - حذف كويز (مدير)

## ربط الصفوف

```javascript
const gradeMapping = {
  'الصف الأول الثانوي': 'first-secondary',
  'الصف الثاني الثانوي علمي': 'second-secondary-science',
  'الصف الثاني الثانوي ادبي': 'second-secondary-literature',
  'الصف الثالث الثانوي علمي': 'third-secondary-science',
  'الصف الثالث الثانوي ادبي': 'third-secondary-literature'
};
```

## المصادقة

جميع الطلبات المحمية تتطلب إرسال:
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

## البيانات التجريبية

لاختبار التطبيق، يُنصح بإنشاء بيانات تجريبية تتضمن:
- دروس لكل صف مع روابط YouTube
- جداول دراسية 
- واجبات مع تواريخ استحقاق
- كويزات مع أسئلة
- حساب مدير للوصول للوحة الإدارة

## الأمان

- جميع كلمات المرور محمية
- JWT tokens للمصادقة
- التحقق من الأدوار للوصول للوحة الإدارة
- تشفير جميع البيانات الحساسة

## التطوير المستقبلي

- تتبع تقدم الطلاب
- نظام التقييمات والدرجات
- المحادثات المباشرة
- إشعارات الدروس الجديدة
- تطبيق موبايل

---

© 2025 منصة البداية. جميع الحقوق محفوظة.
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, verifyOtpUser, clearError } from '../redux/slices/authSlice.js';
import { validateEmail, validatePassword } from '../utils/helpers.js';
import { gradeMapping } from '../utils/gradeMapping.js';

const Register = () => {
  const [step, setStep] = useState(1); // 1: Register form, 2: OTP verification
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    grade: '',
    role: 'student'
  });
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, requiresOtp } = useSelector(state => state.auth);

  const grades = Object.keys(gradeMapping);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    } else if (requiresOtp) {
      setStep(2);
    }
  }, [isAuthenticated, requiresOtp, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateRegisterForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمتا المرور غير متطابقتان';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'الموقع مطلوب';
    }

    if (!formData.grade) {
      newErrors.grade = 'الصف الدراسي مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    if (validateRegisterForm()) {
      const { confirmPassword, ...userData } = formData;
      dispatch(signupUser(userData));
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setErrors({ otp: 'كود التأكيد مطلوب' });
      return;
    }

    dispatch(verifyOtpUser({
      email: formData.email,
      otp: otp.trim()
    }));
  };

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">تأكيد البريد الإلكتروني</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">تم إرسال كود التأكيد إلى: {formData.email}</p>
            </div>
            
            {error && (
              <div className="bg-error-50 dark:bg-error-900 border border-error-200 dark:border-error-700 text-error-800 dark:text-error-300 px-4 py-3 rounded-lg mb-4">{error}</div>
            )}

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="form-group">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">كود التأكيد</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-center text-lg tracking-widest ${
                    errors.otp 
                      ? 'border-error-500 focus:ring-error-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                  placeholder="أدخل كود التأكيد"
                  maxLength="6"
                />
                {errors.otp && (
                  <span className="text-error-600 dark:text-error-400 text-sm mt-1 block">{errors.otp}</span>
                )}
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                disabled={loading}
              >
                {loading ? 'جاري التحقق...' : 'تأكيد الحساب'}
              </button>
            </form>

            <div className="text-center mt-6">
              <button 
                onClick={() => setStep(1)} 
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                العودة للتسجيل
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إنشاء حساب جديد</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">انضم إلى منصة البداية</p>
          </div>
          
          {error && (
            <div className="bg-error-50 dark:bg-error-900 border border-error-200 dark:border-error-700 text-error-800 dark:text-error-300 px-4 py-3 rounded-lg mb-4">{error}</div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                  errors.name 
                    ? 'border-error-500 focus:ring-error-500' 
                    : 'border-gray-300 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
                placeholder="أدخل اسمك الكامل"
              />
              {errors.name && (
                <span className="text-error-600 dark:text-error-400 text-sm mt-1 block">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                  errors.email 
                    ? 'border-error-500 focus:ring-error-500' 
                    : 'border-gray-300 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
                placeholder="أدخل بريدك الإلكتروني"
              />
              {errors.email && (
                <span className="text-error-600 dark:text-error-400 text-sm mt-1 block">{errors.email}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">كلمة المرور</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                    errors.password 
                      ? 'border-error-500 focus:ring-error-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                  placeholder="أدخل كلمة المرور"
                />
                {errors.password && (
                  <span className="text-error-600 dark:text-error-400 text-sm mt-1 block">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                    errors.confirmPassword 
                      ? 'border-error-500 focus:ring-error-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                  placeholder="أعد إدخال كلمة المرور"
                />
                {errors.confirmPassword && (
                  <span className="text-error-600 dark:text-error-400 text-sm mt-1 block">{errors.confirmPassword}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الموقع</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                    errors.location 
                      ? 'border-error-500 focus:ring-error-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                  placeholder="المحافظة أو المدينة"
                />
                {errors.location && (
                  <span className="text-error-600 dark:text-error-400 text-sm mt-1 block">{errors.location}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الصف الدراسي</label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                    errors.grade 
                      ? 'border-error-500 focus:ring-error-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                >
                  <option value="">اختر الصف الدراسي</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                {errors.grade && (
                  <span className="text-error-600 dark:text-error-400 text-sm mt-1 block">{errors.grade}</span>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              لديك حساب بالفعل؟ <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">سجل دخولك</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="أدخل كلمة المرور"
              />
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="أعد إدخال كلمة المرور"
              />
              {errors.confirmPassword && (
                <span className="field-error">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="location">الموقع</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? 'error' : ''}
                placeholder="المحافظة أو المدينة"
              />
              {errors.location && (
                <span className="field-error">{errors.location}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="grade">الصف الدراسي</label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className={errors.grade ? 'error' : ''}
              >
                <option value="">اختر الصف الدراسي</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              {errors.grade && (
                <span className="field-error">{errors.grade}</span>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
            </button>
          </form>

          <div className="auth-links">
            <p>لديك حساب بالفعل؟ <Link to="/login">سجل دخولك</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
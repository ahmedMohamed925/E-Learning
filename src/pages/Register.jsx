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
      <div className="auth-page">
        <div className="container">
          <div className="auth-form">
            <h1>تأكيد البريد الإلكتروني</h1>
            <p>تم إرسال كود التأكيد إلى: {formData.email}</p>
            
            {error && (
              <div className="error-message">{error}</div>
            )}

            <form onSubmit={handleOtpSubmit}>
              <div className="form-group">
                <label htmlFor="otp">كود التأكيد</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={errors.otp ? 'error' : ''}
                  placeholder="أدخل كود التأكيد"
                  maxLength="6"
                />
                {errors.otp && (
                  <span className="field-error">{errors.otp}</span>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? 'جاري التحقق...' : 'تأكيد الحساب'}
              </button>
            </form>

            <div className="auth-links">
              <button 
                onClick={() => setStep(1)} 
                className="btn btn-link"
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
    <div className="auth-page">
      <div className="container">
        <div className="auth-form">
          <h1>إنشاء حساب جديد</h1>
          
          {error && (
            <div className="error-message">{error}</div>
          )}

          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="name">الاسم الكامل</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="أدخل اسمك الكامل"
              />
              {errors.name && (
                <span className="field-error">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="أدخل بريدك الإلكتروني"
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">كلمة المرور</label>
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
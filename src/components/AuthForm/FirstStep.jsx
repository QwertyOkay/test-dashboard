import { Formik, Form, Field } from 'formik';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import * as Yup from 'yup';
import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import styles from './AuthForm.module.scss';
import { Dna } from 'react-loader-spinner';

const FirstStep = ({ onNextStep, formData, loading }) => {
  // const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  // const [showConfPassword, setShowConfPassword] = useState(false);

  const validationFirstStepSchema = Yup.object({
    name: Yup.string()
      .min(2, 'auth.nameShort')
      .matches(/^[a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії'\s]+$/, 'auth.nameAlpabets'),
    email: Yup.string()
      .email('auth.invalidEmail')
      .required('auth.requiredValue'),
    password: Yup.string()
      .matches(/^\S*$/, 'auth.notWhitespace')
      .min(7, 'auth.passwordShort')
      .max(32, 'auth.passwordLong')
      .required('auth.requiredValue'),
  });

  const handleFormSubmit = values => {
    onNextStep(values, true);
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationFirstStepSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <label className={styles.formGroup}>
            <Field
              className={styles.input}
              name="name"
              type="text"
              placeholder={1}
            />
            {errors.name && touched.name && (
              <div className={styles.errorMsg}>{2}</div>
            )}
          </label>

          <label className={styles.formGroup}>
            <Field
              className={styles.input}
              name="email"
              type="text"
              placeholder={3}
            />
            {errors.email && touched.email && (
              <div className={styles.errorMsg}>{4}</div>
            )}
          </label>

          <label className={styles.formGroup}>
            <Field
              className={styles.input}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={5}
            />
            <span
              className={styles.icon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword && (
                <IconContext.Provider
                  value={{ style: { verticalAlign: 'middle' } }}
                >
                  <FiEye />
                </IconContext.Provider>
              )}
              {!showPassword && (
                <IconContext.Provider
                  value={{ style: { verticalAlign: 'middle' } }}
                >
                  <FiEyeOff />
                </IconContext.Provider>
              )}
            </span>
            {errors.password && touched.password && (
              <div className={styles.errorMsg}>{6}</div>
            )}
          </label>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? (
              <Dna
                visible={true}
                height="40"
                width="80"
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
                wrapperStyle={{ verticalAlign: 'middle' }}
              />
            ) : (
              'Create account'
            )}
          </button>

          {/* <button className={styles.button} type={'submit'}>
            {t('auth.next')}
          </button> */}
        </Form>
      )}
    </Formik>
  );
};

FirstStep.propTypes = {
  onNextStep: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};

export default FirstStep;

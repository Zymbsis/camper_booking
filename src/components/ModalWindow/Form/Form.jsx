import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { bookingFormValidationSchema } from 'helpers';
import { Button } from 'shared';
import Calendar from '../Calendar/Calendar';
import InputField from '../InputField/InputField';
import clsx from 'clsx';
import css from './Form.module.css';

const Form = ({ id }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingFormValidationSchema),
    defaultValues: { name: '', email: '', bookingDate: '', comment: '' },
  });

  const onSubmit = (data) => {
    localStorage.setItem('booking', JSON.stringify({ ...data, id }));
    location.reload();
  };

  return (
    <div className={css.formContainer}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={' '}
          register={register}
          errors={errors}
          fieldName='name'
        />
        <InputField
          label={' '}
          register={register}
          errors={errors}
          fieldName='email'
        />
        <Calendar
          errors={errors}
          register={register}
          setValue={setValue}
        />
        <label
          className={clsx(css.textareaWrapper, {
            [css.error]: errors.comment,
          })}>
          <textarea
            className={css.textarea}
            placeholder='Comment'
            {...register('comment')}></textarea>
          {errors.comment && <span>{errors.comment.message}</span>}
        </label>
        <Button
          className={css.submitBtn}
          type='submit'>
          Send
        </Button>
      </form>
    </div>
  );
};

export default Form;

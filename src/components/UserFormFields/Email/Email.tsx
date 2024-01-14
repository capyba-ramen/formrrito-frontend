import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';

export interface EmailProps {}

const Email = (props: EmailProps) => {
  return (
    <Controller
      name="email"
      rules={{
        required: 'Required',
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          required
          margin="normal"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={value}
          ref={ref}
          error={!!error?.type}
          helperText={error?.message}
          {...props}
        />
      )}
    />
  );
};

Email.displayName = 'Email';

export default Email;

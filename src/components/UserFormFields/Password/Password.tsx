import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';

export interface PasswordProps {}

const Password = (props: PasswordProps) => {
  return (
    <Controller
      name="password"
      rules={{
        required: 'Required',
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          required
          margin="normal"
          label="Password"
          type="password"
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

Password.displayName = 'Password';

export default Password;

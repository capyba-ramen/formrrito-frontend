import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';

export interface UsernameProps {}

const Username = (props: UsernameProps) => {
  return (
    <Controller
      name="username"
      rules={{
        required: 'Required',
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          autoFocus
          required
          margin="normal"
          label="Username"
          type="text"
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

Username.displayName = 'Username';

export default Username;

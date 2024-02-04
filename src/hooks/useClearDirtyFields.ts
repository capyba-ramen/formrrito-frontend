import * as React from 'react';
import { useFormContext } from 'react-hook-form';

export default function useClearDirtyFields() {
  const { reset } = useFormContext();

  const clearDirtyFields = React.useCallback(() => {
    reset((formValues) => formValues);
  }, [reset]);

  return { clearDirtyFields };
}

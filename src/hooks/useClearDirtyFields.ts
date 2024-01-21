import * as React from 'react';
import { useFormContext } from 'react-hook-form';

export default function useClearDirtyFields() {
  const { reset, getValues } = useFormContext();

  const clearDirtyFields = React.useCallback(() => {
    const formValues = getValues();
    reset(formValues);
  }, [reset, getValues]);

  return { clearDirtyFields };
}

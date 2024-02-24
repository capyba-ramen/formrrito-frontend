import * as React from 'react';

import useDebounceDeepCompare from '@/hooks/useDebounceDeepCompare';
import { FieldValues, UseFormReturn, useWatch } from 'react-hook-form';

export default function useAutoSave<T extends FieldValues>(
  useFormReturn: UseFormReturn<T>,
  debounceTime: number = 2000,
  callback: () => void | Promise<void> | boolean
) {
  const {
    formState: { isDirty },
  } = useFormReturn;

  const debouncedValue = useDebounceDeepCompare(useWatch(), debounceTime);
  const DebouncedValueStringified = JSON.stringify(debouncedValue);

  React.useEffect(() => {
    const debouncedSave = async () => {
      if (!isDirty) {
        return;
      }

      await callback();
    };

    debouncedSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DebouncedValueStringified]);

  return debouncedValue;
}

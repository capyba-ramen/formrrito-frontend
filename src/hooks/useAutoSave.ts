import * as React from 'react';

import useDebounceDeepCompare from '@/hooks/useDebounceDeepCompare';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export default function useAutoSave<T extends FieldValues>(
  useFormReturn: UseFormReturn<T>,
  debounceTime: number = 2000,
  callback: () => void | Promise<void>
) {
  const {
    watch,
    formState: { isDirty },
  } = useFormReturn;

  const debouncedValue = useDebounceDeepCompare(watch(), debounceTime);
  const DebouncedValueStringified = JSON.stringify(debouncedValue);

  React.useEffect(() => {
    console.log('save is triggered, checking if isDirty is true');

    const debouncedSave = async () => {
      if (!isDirty) {
        console.log('autosave not triggered because form is not dirty');
        return;
      }
      console.log('isDirty is true, saving form data');
      await callback();
    };

    debouncedSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DebouncedValueStringified]);

  return debouncedValue;
}

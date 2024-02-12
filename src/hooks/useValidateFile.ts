import * as React from 'react';

interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

type FileValidator = (file: File) => FileValidationResult;

interface UseValidateFileOptions {
  allowedTypes?: HTMLInputElement['accept'][];
  maxSizeInBytes?: number;
}

const defaultOptions: UseValidateFileOptions = {
  allowedTypes: [],
  maxSizeInBytes: 1024 * 1024, // Default: 1MB
};

const useValidateFile = (options: UseValidateFileOptions = defaultOptions) => {
  const { allowedTypes, maxSizeInBytes } = { ...defaultOptions, ...options };
  const [error, setError] = React.useState<string | undefined>(undefined);

  const validateFile: FileValidator = React.useCallback(
    (file) => {
      if (!allowedTypes?.includes(file.type)) {
        return {
          isValid: false,
          error: 'Invalid file type.',
        };
      }

      if (maxSizeInBytes && file.size > maxSizeInBytes) {
        return {
          isValid: false,
          error: 'File size exceeds the maximum allowed size.',
        };
      }

      return {
        isValid: true,
      };
    },
    [allowedTypes, maxSizeInBytes]
  );

  const handleFileChange = (file: File) => {
    const validationResult = validateFile(file);
    if (!validationResult.isValid) {
      setError(validationResult.error);
    } else {
      setError(undefined);
    }
  };

  return {
    error,
    validateFile,
    handleFileChange,
  };
};

export default useValidateFile;

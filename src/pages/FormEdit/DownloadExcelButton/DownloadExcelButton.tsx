import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import useDownloadResponses from '@/api/reply/useDownloadResponses';
import useApiErrorHandlers from '@/api/useApiErrorsHandler';

const DownloadExcelButton = () => {
  const { formId } = useParams();
  const { trigger: downloadResponses } = useDownloadResponses();
  const { errorsHandler } = useApiErrorHandlers();

  const handleDownloadResponses = () => {
    downloadResponses({ form_id: formId })
      .then((res) => {
        if (!res.data) return;

        const link = document.createElement('a');
        link.href = res.data;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(errorsHandler);
  };

  return (
    <Button variant="outlined" size="large" startIcon={<DownloadIcon />} onClick={handleDownloadResponses}>
      Download Excel
    </Button>
  );
};

DownloadExcelButton.displayName = 'DownloadExcelButton';

export default DownloadExcelButton;

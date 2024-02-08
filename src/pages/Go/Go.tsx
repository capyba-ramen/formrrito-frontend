import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useFormUrlRequest from '@/api/tool/useFormUrlRequest';

const Go = () => {
  const { shortenedUrl } = useParams();
  const navigate = useNavigate();
  const { data: url } = useFormUrlRequest(shortenedUrl);

  React.useEffect(() => {
    if (!url) return;

    navigate(url, { replace: true });
  }, [url]);

  return null;
};

Go.displayName = 'Go';

export default Go;

import { useEffect, useState } from 'react';

export default function BlogPost({ description }) {
  const [sanitized, setSanitized] = useState('');

  useEffect(() => {
    const sanitizedText = (txt) => {
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(txt, 'text/html');
      return parsedHtml.body.innerHTML || '';
    };

    if (description) {
      setSanitized(sanitizedText(description));
    }
  }, [description]);

  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}

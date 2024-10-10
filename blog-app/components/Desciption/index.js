import React from 'react';

export default function Description(props) {
  const { hostReact, description } = props;
  const [sanitized, setSanitized] = hostReact.useState('');

  hostReact.useEffect(() => {
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

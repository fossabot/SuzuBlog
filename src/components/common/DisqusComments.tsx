'use client';
// src/components/DisqusComments.tsx
import { useEffect } from 'react';

export default function DisqusComments({
  disqusShortname,
}: {
  disqusShortname: string;
}) {
  useEffect(() => {
    const disqusScript = document.createElement('script');
    disqusScript.src = `https://${disqusShortname}.disqus.com/embed.js`;
    disqusScript.dataset.timestamp = `${Date.now()}`;
    (document.head || document.body).append(disqusScript);

    return () => {
      // Clean up the script if the component is unmounted
      if (disqusScript.parentNode) {
        disqusScript.remove();
      }
    };
  }, [disqusShortname]);

  return (
    <div
      id='disqus_thread'
      className='mx-auto mt-10 w-full max-w-3xl'
    ></div>
  );
}

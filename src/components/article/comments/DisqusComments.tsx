'use client';

import { useEffect, useState, useRef } from 'react';

interface DisqusCommentsProperties {
  disqusShortname: string;
}

const DisqusComments = ({ disqusShortname }: DisqusCommentsProperties) => {
  const [loadDisqus, setLoadDisqus] = useState(false);
  const disqusReference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadDisqus(true); // Observer is triggered
          observer.disconnect(); // Disconnect observer
        }
      },
      { threshold: 0.1 }
    );

    if (disqusReference.current) {
      observer.observe(disqusReference.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (loadDisqus) {
      const disqusScript = document.createElement('script');
      disqusScript.src = `https://${disqusShortname}.disqus.com/embed.js`;
      disqusScript.dataset.timestamp = `${Date.now()}`;
      (document.head || document.body).append(disqusScript);

      return () => {
        if (disqusScript.parentNode) {
          disqusScript.remove();
        }
      };
    }
  }, [loadDisqus, disqusShortname]);

  return (
    <div
      id='disqus_thread'
      ref={disqusReference}
      className='mx-auto w-full font-sans'
    ></div>
  );
};

export default DisqusComments;

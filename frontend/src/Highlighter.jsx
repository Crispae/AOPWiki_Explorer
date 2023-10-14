import React, { useEffect, useRef } from 'react';
import './dracula.css';
import cypher from './cypher';
import hljs from 'highlight.js';
hljs.registerLanguage('cypher', cypher);

function Highlighter({children}) {
    const nodeRef = useRef(null);

    useEffect(() => { hljs.highlightAll(); }, []);

    return (
        <pre ref={nodeRef}>
          <code className="cypher">
            {children}
          </code>
        </pre>
      );
}

export default Highlighter



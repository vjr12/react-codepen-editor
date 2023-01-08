import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [htmlJSX, setHtmlJSX] = useLocalStorage('html', '')
  const [cssJSX, setCssJSX] = useLocalStorage('css', '')
  const [jsJSX, setJsJSX] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${htmlJSX}</body>
          <style>${cssJSX}</style>
          <script>${jsJSX}</script>
        </html>
      `)
    }, 250);

    return () => clearTimeout(timeout)
  }, [htmlJSX, cssJSX, jsJSX]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={htmlJSX}
          onChange={setHtmlJSX}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={cssJSX}
          onChange={setCssJSX}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={jsJSX}
          onChange={setJsJSX}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
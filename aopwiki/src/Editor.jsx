import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import {StreamLanguage} from "@codemirror/language"
import { cypher } from "@codemirror/legacy-modes/mode/cypher"
import { dracula } from '@uiw/codemirror-theme-dracula';




function Editor({value,changeFunction,save})  {
 
    

    return <CodeMirror
                value={value}
                height="200px" 
                extensions={[StreamLanguage.define(cypher)]}
                onChange={changeFunction}
                theme={dracula}
              
                />;
  }

export default Editor





import './render.scss'
import React from 'react'

import Math from './custom-render/Math'
import LinkBlock from './custom-render/LinkBlock'
import Paragraph from './custom-render/Paragraph'
import CodeLine from './custom-render/CodeLine'
import InlineKeyword from './custom-render/InlineKeyword'
import InlineMath from './custom-render/InlineMath'
import InlineCode from './custom-render/InlineCode'

import {
  PARAGRAPH,
  CODE,
  MATH,
  TITLE,
  CODE_LINE,
  ORDERED_LIST,
  UNORDERED_LIST,
  LIST_ITEM,
  LINK_BLOCK,
  INLINE_KEYWORD,
  INLINE_MATH,
  INLINE_CODE
} from './types'

export default {
  [TITLE]: (props) => <p class='editor-header' {...props.attributes}>{props.children}</p>,
  [PARAGRAPH]: (props) => <Paragraph {...props} />,
  [ORDERED_LIST]: (props) => 
    <ol {...props.attributes} class='editor-ol'>{props.children}</ol>,
  [UNORDERED_LIST]: (props) => 
    <ul {...props.attributes} class='editor-ul'>{props.children}</ul>,
  [LIST_ITEM]: (props) => 
    <li {...props.attributes} class='editor-li'>{props.children}</li>,
  [MATH]: (props) => <Math {...props} />,
  [LINK_BLOCK]: (props) => <LinkBlock {...props} />,
  [CODE]: (props) => {
    const { attributes, children } = props
    return (
      <pre class='editor-code' {...attributes}>
        <code>{children}</code>
      </pre>
    )
  },
  [CODE_LINE]: (props) => <CodeLine {...props} />,
  [INLINE_KEYWORD]: (props) => <InlineKeyword {...props} />,
  [INLINE_MATH]: (props) => <InlineMath {...props} />,
  [INLINE_CODE]: (props) => <InlineCode {...props} />
}

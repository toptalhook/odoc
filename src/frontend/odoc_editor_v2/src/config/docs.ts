// import type { MainNavItem, SidebarNavItem } from '@/types/nav';

import { customizerComponents } from '@/config/customizer-components';

// export interface DocsConfig {
//   componentsNav: SidebarNavItem[];
//   mainNav: MainNavItem[];
//   sidebarNav: SidebarNavItem[];
// }

export const docsConfig = {
  componentsNav: [
    {
      items: [
        {
          href: '/docs/components',
          title: 'Introduction',
        },
        {
          href: '/docs/components/installation',
          title: 'Installation',
        },
        {
          href: '/docs/components/components-json',
          title: 'components.json',
        },
        {
          href: '/docs/components/theming',
          title: 'Theming',
        },
        {
          href: '/docs/components/dark-mode',
          title: 'Dark mode',
        },
        {
          href: '/docs/components/cli',
          title: 'CLI',
        },
        {
          href: '/docs/components/changelog',
          title: 'Changelog',
        },
      ],
      title: 'Plate UI',
    },
    {
      items: [
        customizerComponents.editor,
        customizerComponents.alignDropdownMenu,
        customizerComponents.avatar,
        customizerComponents.blockquoteElement,
        customizerComponents.button,
        customizerComponents.caption,
        customizerComponents.checkbox,
        customizerComponents.cloud,
        customizerComponents.codeBlockElement,
        customizerComponents.codeLeaf,
        customizerComponents.codeLineElement,
        customizerComponents.codeSyntaxLeaf,
        customizerComponents.colorDropdownMenu,
        customizerComponents.combobox,
        customizerComponents.command,
        customizerComponents.commentLeaf,
        customizerComponents.commentToolbarButton,
        customizerComponents.commentsPopover,
        customizerComponents.cursorOverlay,
        customizerComponents.columnGroupElement,
        customizerComponents.columnElement,
        customizerComponents.dialog,
        customizerComponents.draggable,
        customizerComponents.dropdownMenu,
        customizerComponents.emojiDropdownMenu,
        customizerComponents.emojiInputElement,
        customizerComponents.emojiToolbarDropdown,
        customizerComponents.excalidrawElement,
        customizerComponents.fixedToolbar,
        customizerComponents.fixedToolbarButtons,
        customizerComponents.floatingToolbar,
        customizerComponents.floatingToolbarButtons,
        customizerComponents.headingElement,
        customizerComponents.highlightLeaf,
        customizerComponents.hrElement,
        customizerComponents.imageElement,
        customizerComponents.indentListToolbarButton,
        customizerComponents.indentToolbarButton,
        customizerComponents.inlineCombobox,
        customizerComponents.input,
        customizerComponents.insertDropdownMenu,
        customizerComponents.kbdLeaf,
        customizerComponents.lineHeightDropdownMenu,
        customizerComponents.linkElement,
        customizerComponents.linkFloatingToolbar,
        customizerComponents.linkToolbarButton,
        customizerComponents.listElement,
        customizerComponents.listToolbarButton,
        customizerComponents.markToolbarButton,
        customizerComponents.mediaEmbedElement,
        customizerComponents.mediaPopover,
        customizerComponents.mediaToolbarButton,
        customizerComponents.mentionElement,
        customizerComponents.mentionInputElement,
        customizerComponents.modeDropdownMenu,
        customizerComponents.moreDropdownMenu,
        customizerComponents.outdentToolbarButton,
        customizerComponents.paragraphElement,
        customizerComponents.placeholder,
        customizerComponents.popover,
        customizerComponents.resizable,
        customizerComponents.searchHighlightLeaf,
        customizerComponents.separator,
        customizerComponents.tableCellElement,
        customizerComponents.tableDropdownMenu,
        customizerComponents.tableElement,
        customizerComponents.tableRowElement,
        customizerComponents.todoListElement,
        customizerComponents.toggleElement,
        customizerComponents.toggleToolbarButton,
        customizerComponents.toolbar,
        customizerComponents.tooltip,
        customizerComponents.turnIntoDropdownMenu,
      ],
      title: 'Components',
    },
  ],
  mainNav: [
    {
      href: '/docs',
      title: 'Documentation',
    },
    {
      href: '/docs/components',
      title: 'Components',
    },
    {
      external: true,
      href: 'https://github.com/udecode/plate',
      title: 'GitHub',
    },
    {
      external: true,
      href: 'https://discord.gg/mAZRuBzGM3',
      title: 'Discord',
    },
  ],
  sidebarNav: [
    {
      items: [
        {
          href: '/docs',
          title: 'Introduction',
        },
        {
          href: '/docs/getting-started',
          title: 'Getting Started',
        },
        {
          href: '/',
          title: 'Playground',
        },
      ],
      title: 'Overview',
    },
    {
      items: [
        {
          href: '/docs/plugin',
          title: 'Custom Plugins',
        },
        {
          href: '/docs/plugin-components',
          title: 'Plugin Components',
        },
        {
          href: '/docs/accessing-editor',
          title: 'Accessing the Editor',
        },
        {
          href: '/docs/typescript',
          title: 'Typescript',
        },
        {
          disabled: true,
          href: '/docs/cli',
          label: 'Soon',
          title: 'CLI',
        },
      ],
      title: 'Guides',
    },
    {
      items: [
        {
          href: '/docs/alignment',
          title: 'Alignment',
        },
        {
          href: '/docs/autoformat',
          title: 'Autoformat',
        },
        {
          href: '/docs/basic-elements',
          label: 'Element',
          title: 'Basic Elements',
        },
        {
          href: '/docs/basic-marks',
          label: 'Leaf',
          title: 'Basic Marks',
        },
        {
          href: '/docs/block-selection',
          title: 'Block Selection',
        },
        {
          href: '/docs/caption',
          title: 'Caption',
        },
        {
          href: '/docs/cloud',
          label: 'Element',
          title: 'Cloud',
        },
        {
          href: '/docs/collaboration',
          title: 'Collaboration',
        },
        {
          href: '/docs/combobox',
          title: 'Combobox',
        },
        {
          href: '/docs/comments',
          label: 'Leaf',
          title: 'Comments',
        },
        {
          href: '/docs/column',
          label: 'Element',
          title: 'Column',
        },
        {
          href: '/docs/dnd',
          title: 'Drag & Drop',
        },
        {
          href: '/docs/emoji',
          title: 'Emoji',
        },
        {
          href: '/docs/excalidraw',
          label: 'Element',
          title: 'Excalidraw',
        },
        {
          href: '/docs/exit-break',
          title: 'Exit Break',
        },
        // {
        //   title: 'Find',
        //   href: '/docs/find-replace',
        // },
        {
          href: '/docs/font',
          title: 'Font',
        },
        {
          href: '/docs/forced-layout',
          title: 'Forced Layout',
        },
        {
          href: '/docs/highlight',
          label: 'Leaf',
          title: 'Highlight',
        },
        {
          href: '/docs/horizontal-rule',
          label: 'Element',
          title: 'Horizontal Rule',
        },
        {
          href: '/docs/indent',
          title: 'Indent',
        },
        {
          href: '/docs/indent-list',
          title: 'Indent List',
        },
        {
          href: '/docs/line-height',
          title: 'Line Height',
        },
        {
          href: '/docs/link',
          label: 'Element',
          title: 'Link',
        },
        {
          href: '/docs/list',
          label: 'Element',
          title: 'List',
        },
        {
          href: '/docs/media',
          label: 'Element',
          title: 'Media',
        },
        {
          href: '/docs/mention',
          label: 'Element',
          title: 'Mention',
        },
        {
          href: '/docs/reset-node',
          title: 'Reset Node',
        },
        {
          href: '/docs/serializing-csv',
          title: 'Serializing CSV',
        },
        {
          href: '/docs/serializing-docx',
          title: 'Serializing DOCX',
        },
        {
          href: '/docs/serializing-html',
          title: 'Serializing HTML',
        },
        {
          href: '/docs/serializing-md',
          title: 'Serializing MD',
        },
        {
          href: '/docs/single-line',
          title: 'Single Line',
        },
        {
          href: '/docs/soft-break',
          title: 'Soft Break',
        },
        {
          href: '/docs/tabbable',
          title: 'Tabbable',
        },
        {
          href: '/docs/table',
          label: 'Element',
          title: 'Table',
        },
        {
          href: '/docs/toggle',
          label: 'Element',
          title: 'Toggle',
        },
      ],
      title: 'Plugins',
    },
    {
      items: [
        {
          href: '/docs/examples/editable-voids',
          title: 'Editable Voids',
        },
        {
          href: '/docs/examples/hundreds-blocks',
          title: 'Hundreds Blocks',
        },
        {
          href: '/docs/examples/hundreds-editors',
          title: 'Hundreds Editors',
        },
        {
          href: '/docs/examples/iframe',
          title: 'IFrame',
        },
        {
          href: '/docs/examples/preview-markdown',
          title: 'Preview Markdown',
        },
        {
          href: '/docs/examples/version-history',
          title: 'Version History',
        },
      ],
      title: 'Examples',
    },
    {
      items: [
        {
          headings: [],
          href: '/docs/api/common',
          title: 'Plate Common',
        },
        {
          headings: [
            'createAtomStore',
            'createDeserializeAstPlugin',
            'createDeserializeHtmlPlugin',
            'createEditorProtocolPlugin',
            'createEventEditorPlugin',
            'createHistoryPlugin',
            'createInlineVoidPlugin',
            'createInsertDataPlugin',
            'createNodeFactoryPlugin',
            'createPlateEditor',
            'createPluginFactory',
            'createPlugins',
            'createPrevSelectionPlugin',
            'createReactPlugin',
            'getPlugin',
            'getPluginInjectProps',
            'getPluginOptions',
            'getPluginType',
            'Hotkeys',
            'toggleNodeType',
            'useEditorRef',
            'useEditorState',
            'useElement',
            'useEditorReadOnly',
            'useEditorSelection',
            'useEditorVersion',
            'useSelectionVersion',
            'withPlate',
            'withTReact',
          ],
          href: '/docs/api/core',
          items: [
            {
              headings: [
                'PlateProps',
                'PlateContent',
                'id',
                'children',
                'decorate',
                'disableCorePlugins',
                'editableProps',
                'editableRef',
                'editor',
                'firstChildren',
                'initialValue',
                'normalizeInitialValue',
                'onChange',
                'plugins',
                'renderEditable',
                'renderElement',
                'renderLeaf',
                'value',
              ],
              href: '/docs/api/core/plate',
              title: 'Plate',
            },
            {
              headings: [
                'platecontroller-store',
                'state',
                'activeId',
                'primaryEditorIds',
                'editorStores',
                'usage-patterns',
                'specific-editor-by-id',
                'active-editor',
                'dealing-with-fallback-editors',
              ],
              href: '/docs/api/core/plate-controller',
              title: 'PlateController',
            },
            {
              headings: [
                'blockFactory',
                'childrenFactory',
                'currentKeyboardEvent',
                'key',
                'plugins',
                'pluginsByKey',
                'prevSelection',
                'redecorate',
                'reset',
              ],
              href: '/docs/api/core/plate-editor',
              title: 'PlateEditor',
            },
            {
              headings: [
                'key',
                'component',
                'decorate',
                'deserializeHtml',
                'attributeNames',
                'getNode',
                'query',
                'rules',
                'validAttribute',
                'validClassName',
                'validNodeName',
                'validStyle',
                'withoutChildren',
                'editor',
                'insertData',
                'format',
                'getFragment',
                'preInsert',
                'transformData',
                'transformFragment',
                'handlers',
                'onKeyDown',
                'onDrop',
                'onDragStart',
                'inject',
                'aboveComponent',
                'belowComponent',
                'pluginsByKey',
                'className',
                'defaultNodeValue',
                'nodeKey',
                'styleKey',
                'transformClassName',
                'transformNodeValue',
                'transformStyle',
                'validNodeValues',
                'validTypes',
                'isInline',
                'isElement',
                'isLeaf',
                'isVoid',
                'normalizeInitialValue',
                'options',
                'overrideByKey',
                'plugins',
                'props',
                'renderAboveEditable',
                'renderAboveSlate',
                'renderAfterEditable',
                'renderBeforeEditable',
                'serializeHtml',
                'then',
                'type',
                'useHooks',
                'withOverrides',
              ],
              href: '/docs/api/core/plate-plugin',
              title: 'PlatePlugin',
            },
            {
              headings: ['useEventEditorSelectors', 'useEventPlateId'],
              href: '/docs/api/core/store',
              title: 'Store',
            },
          ],
          title: 'Plate Core',
        },
        {
          headings: [
            'PlateElement',
            'PlateLeaf',
            'useMarkToolbarButtonState',
            'useMarkToolbarButton',
            'usePlaceholderState',
            'useRemoveNodeButton',
            'isType',
            'resetEditorChildren',
            'selectEditor',
            'defaultsDeepToNodes',
            'onKeyDownToggleElement',
            'onKeyDownToggleMark',
          ],
          href: '/docs/api/utils',
          title: 'Plate Utils',
        },
        {
          headings: [
            'addMark',
            'createPathRef',
            'createPointRef',
            'createRangeRef',
            'deleteBackward',
            'deleteForward',
            'deleteFragment',
            'deleteMerge',
            'getAboveNode',
            'getEdgePoints',
            'getEditorString',
            'getEndPoint',
            'getFirstNode',
            'getFragment',
            'getLastNode',
            'getLeafNode',
            'getLevels',
            'getMarks',
            'getNextNode',
            'getNodeEntries',
            'getNodeEntry',
            'getParentNode',
            'getPath',
            'getPathRefs',
            'getPoint',
            'getPointAfter',
            'getPointBefore',
            'getPointRefs',
            'getPositions',
            'getPreviousNode',
            'getRange',
            'getRangeRefs',
            'getStartPoint',
            'getVoidNode',
            'hasBlocks',
            'hasInlines',
            'hasTexts',
            'insertBreak',
            'insertNode',
            'isBlock',
            'isEdgePoint',
            'isEditor',
            'isEditorNormalizing',
            'isElementEmpty',
            'isEndPoint',
            'isInline',
            'isStartPoint',
            'isVoid',
            'normalizeEditor',
            'removeEditorMark',
            'TEditor',
            'unhangRange',
            'withoutNormalizing',
            'elementMatches',
            'isElement',
            'isElementList',
            'TElement',
            'isHistoryEditor',
            'isHistoryMerging',
            'isHistorySaving',
            'THistoryEditor',
            'withoutMergingHistory',
            'withoutSavingHistory',
            'TDescendant',
            'getNodeDescendants',
            'getNodeLastNode',
            'getNodeString',
            'getNodeFirstNode',
            'hasNode',
            'isNode',
            'getNodeFragment',
            'getNodeLeaf',
            'getNodeLevels',
            'isNodeList',
            'getNodeProps',
            'TAncestor',
            'getNode',
            'getNodeTexts',
            'getNodes',
            'getNodeChildren',
            'getNodeAncestor',
            'TNodeEntry',
            'TNode',
            'nodeMatches',
            'getNodeChild',
            'getNodeElements',
            'getNodeAncestors',
            'getNodeDescendant',
            'getCommonNode',
            'isAncestor',
            'hasSingleChild',
            'getNodeParent',
            'isCollapsed',
            'isExpanded',
            'isText',
            'isTextList',
            'textEquals',
            'textMatches',
            'TText',
            'moveNodes',
            'moveSelection',
            'removeNodes',
            'select',
            'insertText',
            'insertNodes',
            'deleteText',
            'setPoint',
            'setNodes',
            'unwrapNodes',
            'deselect',
            'mergeNodes',
            'collapseSelection',
            'unsetNodes',
            'setSelection',
            'splitNodes',
            'insertFragment',
            'wrapNodes',
            'liftNodes',
          ],
          href: '/docs/api/slate',
          title: 'Slate',
        },
        {
          headings: [
            'blurEditor',
            'hasEditorSelectableTarget',
            'insertData',
            'hasEditorDOMNode',
            'focusEditor',
            'findNodeKey',
            'getEditorWindow',
            'toDOMRange',
            'toDOMNode',
            'findEditorDocumentOrShadowRoot',
            'setFragmentData',
            'toSlateNode',
            'findEventRange',
            'isEditorFocused',
            'isComposing',
            'hasEditorTarget',
            'isEditorReadOnly',
            'isTargetInsideNonReadonlyVoidEditor',
            'deselectEditor',
            'hasEditorEditableTarget',
            'toSlatePoint',
            'findNodePath',
            'SlateProps',
            'toSlateRange',
            'toDOMPoint',
            'TReactEditor',
          ],
          href: '/docs/api/slate-react',
          title: 'Slate React',
        },
        {
          headings: [
            'findDescendant',
            'getBlockAbove',
            'getChildren',
            'getEdgeBlocksAbove',
            'getLastChild',
            'getLastNodeByLevel',
            'getMark',
            'getNextNodeStartPoint',
            'getNextSiblingNodes',
            'getOperations',
            'getPointBeforeLocation',
            'getPointFromLocation',
            'getPointNextToVoid',
            'getPreviousBlockById',
            'getPreviousNodeEndPoint',
            'getPreviousPath',
            'getPreviousSiblingNode',
            'getRangeBefore',
            'getRangeFromBlockStart',
            'getSelectionText',
            'isAncestorEmpty',
            'isBlockAboveEmpty',
            'isBlockTextEmptyAfterSelection',
            'isDocumentEnd',
            'isFirstChild',
            'isMarkActive',
            'isPointAtWordEnd',
            'isRangeAcrossBlocks',
            'isRangeInSameBlock',
            'isRangeInSingleText',
            'isSelectionAtBlockEnd',
            'isSelectionAtBlockStart',
            'isSelectionExpanded',
            'isTextByPath',
            'isWordAfterTrigger',
            'queryEditor',
            'insertElements',
            'insertEmptyElement',
            'moveChildren',
            'removeMark',
            'removeNodeChildren',
            'removeSelectionMark',
            'replaceNodeChildren',
            'selectEndOfBlockAboveSelection',
            'setMarks',
            'toggleMark',
            'toggleWrapNodes',
            'wrapNodeChildren',
            'createDocumentNode',
            'createNode',
          ],
          href: '/docs/api/slate-utils',
          title: 'Slate Utils',
        },
        {
          headings: [
            'PortalBody',
            'Text',
            'Box',
            'createPrimitiveComponent',
            'createSlotComponent',
            'withProviders',
          ],
          href: '/docs/api/react-utils',
          title: 'React Utils',
        },
        {
          headings: ['cn', 'withCn', 'withProps', 'withVariants'],
          href: '/docs/api/cn',
          title: 'cn',
        },
      ],
      title: 'API',
    },
  ],
};

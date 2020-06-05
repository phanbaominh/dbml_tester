import ace from 'brace';
/* eslint-disable */

ace.define('ace/theme/holistics', ['require', 'exports', 'module', 'ace/lib/dom'], (acequire, exports, module) => {
  exports.isDark = true;
  exports.cssClass = 'ace-holistics';
  exports.cssText = '.ace-holistics .ace_gutter {\
background: #333333;\
color: #DEDEDE\
}\
.ace-holistics .ace_print-margin {\
width: 1px;\
background: #1a1a1a\
}\
.ace-holistics {\
background: #282828;\
color: #dcdcdc\
}\
.ace-holistics .ace_cursor {\
color: #9F9F9F\
}\
.ace-holistics .ace_marker-layer .ace_selection {\
background: #424242\
}\
.ace-holistics.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #000000;\
}\
.ace-holistics .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-holistics .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #888888\
}\
.ace-holistics .ace_marker-layer .ace_highlight {\
border: 1px solid rgb(110, 119, 0);\
border-bottom: 0;\
box-shadow: inset 0 -1px rgb(110, 119, 0);\
margin: -1px 0 0 -1px;\
background: rgba(255, 235, 0, 0.1)\
}\
.ace-holistics .ace_marker-layer .ace_active-line {\
background: #2A2A2A;\
border-top: 1px solid rgba(255,255,255,0.08);\
border-bottom: 1px solid rgba(255,255,255,0.08);\
}\
.ace-holistics .ace_gutter-active-line {\
background-color: #2A2A2A\
}\
.ace-holistics .ace_stack {\
background-color: rgb(66, 90, 44)\
}\
.ace-holistics .ace_marker-layer .ace_selected-word {\
border: 1px solid #888888\
}\
.ace-holistics .ace_invisible {\
color: #343434\
}\
.ace-holistics .ace_keyword,\
.ace-holistics .ace_meta,\
.ace-holistics .ace_storage,\
.ace-holistics .ace_storage.ace_type,\
.ace-holistics .ace_support.ace_type {\
color: #64acdd\
}\
.ace-holistics .ace_keyword.ace_operator {\
color: #70C0B1\
}\
.ace-holistics .ace_constant.ace_character,\
.ace-holistics .ace_constant.ace_language,\
.ace-holistics .ace_constant.ace_numeric,\
.ace-holistics .ace_keyword.ace_other.ace_unit,\
.ace-holistics .ace_support.ace_constant,\
.ace-holistics .ace_variable.ace_parameter {\
color: #E78C45\
}\
.ace-holistics .ace_constant.ace_other {\
color: #EEEEEE\
}\
.ace-holistics .ace_invalid {\
color: #CED2CF;\
background-color: #DF5F5F\
}\
.ace-holistics .ace_invalid.ace_deprecated {\
color: #CED2CF;\
background-color: #B798BF\
}\
.ace-holistics .ace_fold {\
background-color: #7AA6DA;\
border-color: #DEDEDE\
}\
.ace-holistics .ace_entity.ace_name.ace_function,\
.ace-holistics .ace_support.ace_function,\
.ace-holistics .ace_variable {\
color: #daa48c\
}\
.ace-holistics .ace_support.ace_class,\
.ace-holistics .ace_support.ace_type {\
color: #E7C547\
}\
.ace-holistics .ace_heading,\
.ace-holistics .ace_markup.ace_heading,\
.ace-holistics .ace_string {\
color: #B9CA4A\
}\
.ace-holistics .ace_entity.ace_name.ace_tag,\
.ace-holistics .ace_entity.ace_other.ace_attribute-name,\
.ace-holistics .ace_meta.ace_tag,\
.ace-holistics .ace_string.ace_regexp,\
.ace-holistics .ace_variable {\
color: #D54E53\
}\
.ace-holistics .ace_comment {\
color: #969896\
}\
.ace-holistics .ace_c9searchresults.ace_keyword {\
color: #C2C280\
}\
.ace-holistics .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYFBXV/8PAAJoAXX4kT2EAAAAAElFTkSuQmCC) right repeat-y\
}';

  const dom = acequire('ace/lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});

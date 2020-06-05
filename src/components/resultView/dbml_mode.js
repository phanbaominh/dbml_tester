import ace from 'brace';

ace.define('ace/mode/dsl_highlight_rules', ['require', 'exports', 'ace/lib/oop', 'ace/mode/text_highlight_rules'], (acequire, exports) => {
  const oop = acequire('ace/lib/oop');
  const { TextHighlightRules } = acequire('ace/mode/text_highlight_rules');

  const DSLHighlightRules = function () {
    const keywordMapper = this.createKeywordMapper({
      keyword: 'table|ref|enum|indexes|tablegroup|note|project',
      'support.function': 'by|bool|boolean|bit|blob|decimal|double|float|long|longblob|longtext|medium|mediumblob|mediumint|mediumtext|timestamp|tinyblob|tinyint|tinytext|text|bigint|int|int1|int2|int3|int4|int8|integer|float|float4|float8|double|char|varbinary|varchar|varcharacter|precision|date|datetime|year|unsigned|signed|numeric|ucase|lcase|mid|len|round|rank|now|format|coalesce|ifnull|isnull|nvl',

    }, 'identifier', true);

    this.$rules = {
      start: [
        {
          token: 'comment',
          regex: '\\/\\/.*$',
        },
        {
          token: keywordMapper,
          regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b',
        },
        {
          token: 'keyword.operator',
          regex: '<|>|\\-',
        }, {
          token: 'paren.lparen',
          regex: '[\\{]',
        }, {
          token: 'paren.rparen',
          regex: '[\\}]',
        }, { // highlight the second word (data type)
          token: ['text', 'support.function'],
          regex: /(^\s*[a-zA-Z0-9_-]+[ ]+)(\w+)/,
        }],
    };
  };

  oop.inherits(DSLHighlightRules, TextHighlightRules);
  /* eslint-disable no-param-reassign */
  exports.DSLHighlightRules = DSLHighlightRules;
});

ace.define('ace/mode/dbml', ['require', 'exports', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/custom_highlight_rules'], (acequire, exports) => {
  const oop = acequire('ace/lib/oop');
  const TextMode = acequire('ace/mode/text').Mode;
  const { DSLHighlightRules } = acequire('./dsl_highlight_rules');
  const Mode = function () {
    this.HighlightRules = DSLHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
  };

  oop.inherits(Mode, TextMode); // ACE's way of doing inheritance

  (function () {
    this.lineCommentStart = '//';
    this.$id = 'ace/mode/dbml';
  }).call(Mode.prototype);

  exports.Mode = Mode; // eslint-disable-line no-param-reassign
});

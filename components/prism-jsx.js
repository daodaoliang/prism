(function(Prism) {

var javascript = Prism.util.clone(Prism.languages.javascript);

Prism.languages.jsx = Prism.languages.extend('markup', javascript);
Prism.languages.jsx.tag.pattern= /<\/?[\w\.:-]+(?:\s+(?:[\w\.:-]+(?:=(?:("|')(\\?[\s\S])*?\1|[^\s'">=]+|(\{[\s\S]*?\})))?|\{\.{3}\w+\}))*\s*\/?>/i;

Prism.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:('|")[\s\S]*?(\1)|[^\s>]+)/i;

Prism.languages.insertBefore('inside', 'attr-name', {
	'spread': {
		pattern: /\{\.{3}\w+\}/,
		inside: {
			'punctuation': /\{|\}|\./,
			'attr-value': /\w+/
		}
	}
}, Prism.languages.jsx.tag);

var jsxExpression = Prism.util.clone(Prism.languages.jsx);

delete jsxExpression.punctuation

jsxExpression = Prism.languages.insertBefore('jsx', 'operator', {
  'punctuation': /=(?={)|[{}[\];(),.:]/
}, { jsx: jsxExpression });

Prism.languages.insertBefore('inside', 'attr-value',{
	'script': {
		// Allow for one level of nesting
		pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
		inside: jsxExpression,
		'alias': 'language-javascript'
	}
}, Prism.languages.jsx.tag);

}(Prism));

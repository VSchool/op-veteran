(self.webpackJsonp=self.webpackJsonp||[]).push([["LoginNotifications"],{"./app/foundation/Frame/components/LoginNotifications/LoginNotifications.tsx":function(e,i,n){"use strict";n.r(i);var t=n("./node_modules/react/index.js"),o=n.n(t),a=n("./node_modules/@shopify/react-graphql/build/esnext/hooks/mutation.esnext"),s=n("./app/utilities/toasts/use-toast.tsx"),d=JSON.parse('{"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginNotificationsRead"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginNotificationsRead"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readLoginNotifications"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"__typename"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":109,"source":{"body":"mutation LoginNotificationsRead{loginNotificationsRead{readLoginNotifications{message __typename}__typename}}","name":"GraphQL request","locationOffset":{"line":1,"column":1}}},"id":"484d1f0cb7f347e4e8166b3970b4e21382df511f5dcfec2665118e45da3796b6"}');function c(){const e=Object(a.a)(d),[i,n]=Object(s.a)();return Object(t.useEffect)((()=>{!async function(){var i,t;const o=await e();if(null==(null==o||null===(i=o.data)||void 0===i||null===(t=i.loginNotificationsRead)||void 0===t?void 0:t.readLoginNotifications))return;const{loginNotificationsRead:{readLoginNotifications:a}}=o.data;for(const{message:e}of a)n({content:e})}()}),[e,n]),o.a.createElement(i,null)}i.default=o.a.memo(c)}}]);
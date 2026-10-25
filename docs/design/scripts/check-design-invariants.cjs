// Read-only source contract audit; uses the Babel parser already installed by CRA.
const fs = require('fs');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const parser = require('@babel/parser');
const baseline = process.argv[2] || 'd75854a2609666e8965a6a04b9bd781f23785060';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const before = file => git('show', `${baseline}:${file}`);
const current = file => fs.readFileSync(file, 'utf8');
const omitted = new Set(['start', 'end', 'loc', 'extra', 'comments', 'leadingComments', 'trailingComments', 'innerComments', 'tokens']);
const clean = value => Array.isArray(value) ? value.map(clean) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).filter(([key]) => !omitted.has(key)).map(([key, child]) => [key, clean(child)])) : value;
const parse = source => parser.parse(source, { sourceType: 'module', plugins: ['jsx'], attachComment: false }).program;
const signature = node => JSON.stringify(clean(node));
const equal = (a, b) => signature(a) === signature(b);
const walk = (node, visit) => { if (!node || typeof node !== 'object') return; if (Array.isArray(node)) return node.forEach(child => walk(child, visit)); visit(node); Object.values(node).forEach(child => walk(child, visit)); };
const routes = source => {
  const results = [];
  walk(parse(source), node => {
    if (node.type !== 'JSXElement' || node.openingElement.name.name !== 'Route') return;
    const path = node.openingElement.attributes.find(attr => attr.name?.name === 'path');
    const guards = [];
    walk(node, child => {
      if (child.type === 'JSXOpeningElement' && ['PublicRoute', 'PrivateRoute', 'PaymentRoute', 'VerifyRoute'].includes(child.name.name)) {
        guards.push({ name: child.name.name, props: clean(child.attributes) });
      }
    });
    results.push({ path: path?.value?.value ?? null, guards });
  });
  return results;
};
const paths = ['src/stores', 'package.json', 'package-lock.json', 'src/routes/PrivateRoute.js', 'src/routes/PublicRoute.js'];
const unchanged = Object.fromEntries(paths.map(file => [file, git('diff', '--name-only', baseline, 'HEAD', '--', file) === '']));
const auth = 'src/services/auth.service.js';
const user = 'src/services/user.service.js';
const payment = 'src/routes/PaymentRoute.js';
const userBefore = parse(before(user));
userBefore.body = userBefore.body.filter(node => !(node.type === 'VariableDeclaration' && node.declarations.length === 1 && node.declarations[0].id.name === 'USER_EMAIL_ENDPOINT'));
const paymentBefore = parse(before(payment));
paymentBefore.body = paymentBefore.body.filter(node => !(node.type === 'ImportDeclaration' && node.source.value === 'react'));
const routeBefore = routes(before('src/App.js'));
const routeAfter = routes(current('src/App.js'));
const changedServices = git('diff', '--name-only', baseline, 'HEAD', '--', 'src/services').split('\n').filter(Boolean);
const proof = {
  baseline,
  sourceCommit: git('rev-parse', 'HEAD'),
  checkedAt: new Date().toISOString(),
  unchanged,
  appRouteAndGuardContracts: { count: routeAfter.length, identical: equal(routeBefore, routeAfter), paths: routeAfter.map(row => row.path), signatureSha256: crypto.createHash('sha256').update(signature(routeAfter)).digest('hex') },
  services: { changedFiles: changedServices, onlyDocumentedLintFilesChanged: changedServices.every(file => [auth, user].includes(file)), authCodeAstIdentical: equal(parse(before(auth)), parse(current(auth))), userCodeAstIdenticalExceptUnusedConstant: equal(userBefore, parse(current(user))) },
  paymentRouteCodeAstIdenticalExceptUnusedReactImport: equal(paymentBefore, parse(current(payment))),
};
const passes = Object.values(unchanged).every(Boolean) && proof.appRouteAndGuardContracts.identical && proof.services.onlyDocumentedLintFilesChanged && proof.services.authCodeAstIdentical && proof.services.userCodeAstIdenticalExceptUnusedConstant && proof.paymentRouteCodeAstIdenticalExceptUnusedReactImport;
proof.passes = passes;
fs.mkdirSync('docs/design/final', { recursive: true });
fs.writeFileSync('docs/design/final/invariants.json', JSON.stringify(proof, null, 2) + '\n');
console.log(JSON.stringify({ passes, routeContracts: routeAfter.length, unchanged, services: proof.services }, null, 2));
if (!passes) process.exitCode = 1;

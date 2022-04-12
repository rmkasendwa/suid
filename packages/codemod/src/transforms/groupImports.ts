import { ImportDeclaration, SourceFile } from "ts-morph";

export default function groupImports(source: SourceFile) {
  const allImports = source.getImportDeclarations();
  const imports: Record<string, ImportDeclaration> = {};
  for (const node of allImports) {
    const name = node.getModuleSpecifier().getLiteralText();
    if (!imports[name]) {
      imports[name] = node;
    } else {
      const namedImports = imports[name]
        .getNamedImports()
        .map((v) => v.getText());
      for (const named of node.getNamedImports()) {
        const namedText = named.getText();
        if (!namedImports.includes(namedText))
          imports[name].addNamedImport(namedText);
      }
      node.remove();
    }
  }
}

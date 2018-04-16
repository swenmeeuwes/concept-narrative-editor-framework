import Node from './Node';

interface ExportGeneratingVisitor<T> {
    visit(node: Node);
    getResult(): T;
    getJSON(): string;
}

export default ExportGeneratingVisitor;
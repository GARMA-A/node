class Heap {
	constructor(private items: number[]) {
	}
	public getHeapArray() {
		return this.items;
	}

	private swap(firstIndex: number, secondIndex: number) {
		[this.items[firstIndex], this.items[secondIndex]] =
			[this.items[secondIndex], this.items[firstIndex]]
	}

	private getParentIndex(index: number) {
		return Math.floor((index - 1) / 2);
	}
	private getLeftChildIndex(index: number) {
		return index * 2 + 1;
	}
	private getRightChildIndex(index: number) {
		return index * 2 + 2;
	}
	private hasParent(index: number) {
		return this.getParentIndex(index) >= 0;
	}
	private hasLeftChild(index: number) {
		return this.getLeftChildIndex(index) < this.items.length
	}

	private hasRightChild(index: number) {
		return this.getRightChildIndex(index) < this.items.length
	}
}


class minHeap extends Heap {
	compare(firstValue: number, secondValue: number): boolean {
		return firstValue < secondValue;
	}
	getMinValue() {
		return this.peekTop();
	}
	peekTop() {

	}

}

class maxHeap extends Heap {

	compare(firstValue: number, secondValue: number): boolean {
		return firstValue > secondValue;
	}
	getMaxValue() {
		return this.peekTop();
	}
	peekTop() {

	}

}


const tokenType = {
	Illegal: 'Illegal',
	EOF: 'EOF',
	Identifier: 'Identifier',
	Int: 'Int',
	Assign: '=',
	Plus: '+',
	Comma: ',',
	Semicolon: ';',
	LParen: '(',
	RParen: ')',
	LBrace: '{',
	RBrace: '}',
	Function: 'Function',
	Let: 'Let',
}

type tokenItem = keyof typeof tokenType;


export { }

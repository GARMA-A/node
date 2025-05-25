class ListNode {
	constructor(val = 0, next = null) {
		this.val = val;
		this.next = next;
	}
}

function reorderList(head) {
	if (!head || !head.next) return;

	// Step 1: Find the middle of the linked list
	let slow = head, fast = head;
	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;
	}

	// Step 2: Reverse the second half of the list
	let prev = null, curr = slow, temp;
	while (curr) {
		temp = curr.next;
		curr.next = prev;
		prev = curr;
		curr = temp;
	}

	// Step 3: Merge the two halves
	let first = head, second = prev;
	while (second.next) {
		temp = first.next;
		first.next = second;
		first = temp;

		temp = second.next;
		second.next = first;
		second = temp;
	}
}




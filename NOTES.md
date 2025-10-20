### Linear Search - Go one by one, by index to check the list/array to find the desired value
### Binary Search - Needs list/array to be sorted, split list in the middle, find if desired value equals, is lesser than or is greater than midpoint, cuts off half values if not equal, repeats until value found
---
### bogoSort - randomizes values until list is sorted
I hate bogoSort. I understand this is an exercise, but its ridiculous.
---
### selectionSort - systematically selects the next smallest element and places it in order, one step at a time
selectionSort is better, takes place in microseconds vs milliseconds (depending on volume of data)
---
### recursion - repeatedly divides the list into smaller sublists, sorts each sublist (by calling the same function), then combines the sorted sublists to produce a fully sorted list
recursive sorts need a base case to prevent stack overflow error (indefinite function calls)
---
### quickSort - a divide and conquer algorithm that selects a pivot element and partitions the array so that all elements less than the pivot come before it and all greater elements come after. It then recursively sorts the subarrays. QuickSort is efficient on average (O(n log n)) but can degrade to O(n^2) in the worst case if poor pivots are chosen
---
### mergeSort - a stable, recursive divide-and-conquer algorithm that splits an array into halves until each subarray has one element, then merges them back together in sorted order. Its time complexity is consistently O(n log n), making it predictable and efficient, though it requires additional memory for merging